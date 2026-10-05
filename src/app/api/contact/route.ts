import { NextRequest, NextResponse } from 'next/server';
import { contactSubmissionUnionSchema } from '@/schemas/contact';
import { Resend } from 'resend';
import ContactEmail from '@/components/emails/ContactEmail';
import ContactConfirmationEmail from '@/components/emails/ContactConfirmationEmail';
import { validatedEnv } from '@/lib/env';
import { addToGoogleSheets } from '@/lib/google-sheets';
import { checkRateLimit } from '@/lib/rate-limit';
import { createAssessment } from '@/lib/recaptcha';
import { saveWebsiteContactLead } from '@/lib/supabase-leads';
import { checkSharedContactLimit, consumeContactLimit, emailIdempotencyKey } from '@/lib/contact-protection';

function recaptchaRejectedResponse() {
  return NextResponse.json(
    {
      error: 'reCAPTCHA verification failed',
      details: [
        {
          field: 'recaptchaToken',
          message: 'Please complete reCAPTCHA verification',
        },
      ],
    },
    { status: 422 }
  );
}

export async function POST(request: NextRequest) {
  const rateLimitResult = checkRateLimit(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimitResult.retryAfterSeconds ?? 60),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  // Bound untrusted input before parsing or contacting external services.
  if (Number(request.headers.get('content-length') || 0) > 16384) {
    return NextResponse.json({ error: 'Request too large' }, { status: 413 });
  }
  let body;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text, 'utf8') > 16384) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const result = contactSubmissionUnionSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: result.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      },
      { status: 422 }
    );
  }

  try {
    const websiteContactEmails = validatedEnv.contactEmails;
    const forwardedFor = request.headers.get('x-forwarded-for') ?? '';
    const userIpAddress = forwardedFor.split(',')[0]?.trim() ?? '';
    const userAgent = request.headers.get('user-agent') ?? '';

    let sharedLimit;
    try {
      sharedLimit = await checkSharedContactLimit(request);
    } catch {
      return NextResponse.json({ error: 'Unable to process your inquiry. Please try again shortly.' }, { status: 503 });
    }
    if (!sharedLimit.success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, {
        status: 429, headers: { 'Retry-After': String(sharedLimit.retryAfterSeconds) },
      });
    }

    let verifiedHuman = false;
    try {
      const assessment = await createAssessment({
        recaptchaAction: 'contact', siteKey: validatedEnv.recaptchaSiteKey,
        token: result.data.recaptchaToken, userIpAddress, userAgent,
      });
      if (!assessment || assessment.score < validatedEnv.recaptchaMinScore || assessment.action !== 'contact') {
        return recaptchaRejectedResponse();
      }
      verifiedHuman = true;
    } catch {
      // An unavailable verifier must not lose a customer inquiry or send to an unverified recipient.
      console.warn('[Contact API] Human verification unavailable; confirmation email suppressed');
    }

    // Persist before email and Sheets so an email outage cannot lose the lead.
    // Duplicate database inserts are ignored, but notification retries still run.
    if (result.data.source === 'contact') {
      try {
        const leadSaveResult = await saveWebsiteContactLead(result.data);
        console.log('[Contact API] Leads Tracker save:', leadSaveResult);
      } catch (error) {
        console.error('[Contact API] Leads Tracker save failed:', error);
        return NextResponse.json(
          { error: 'Unable to save your inquiry. Please try again shortly.' },
          { status: 503 }
        );
      }
    }

    const notificationKey = emailIdempotencyKey(result.data);
    const resend = new Resend(validatedEnv.resendApiKey);
    const {
      name,
      email,
      phone,
      address,
      message,
      serviceType,
      referralSource,
      source,
      contactConsent,
    } = result.data;

    const websiteFromEmail =
      'Fast Struct Website <website@mail.faststruct.com>';

    const emailResult = await resend.emails.send({
      from: websiteFromEmail,
      to: websiteContactEmails,
      subject: `New Contact Form Submission from ${name}`,
      react: ContactEmail({
        name,
        email,
        phone,
        address,
        message,
        serviceType,
        referralSource,
        source,
      }),
      replyTo: email,
    }, { idempotencyKey: notificationKey });

    if (emailResult.error) {
      console.error('[Contact API] Resend error:', emailResult.error);

      return NextResponse.json(
        {
          error: 'Failed to send email',
          resendError: emailResult.error,
        },
        { status: 500 }
      );
    }

    console.log(
      '[Contact API] Email sent successfully to business owner:',
      emailResult.data
    );

    // Add to Google Sheets (non-blocking - don't fail if this fails)
    try {
      await addToGoogleSheets({
        name,
        email,
        phone,
        address,
        message,
        serviceType,
        referralSource,
        source,
        status: 'Pending',
        contactConsent,
      });
      console.log('[Contact API] Successfully added to Google Sheets');
    } catch (sheetsError) {
      console.error(
        '[Contact API] Error adding to Google Sheets:',
        sheetsError
      );
      // Don't fail the request - the email was sent successfully
    }

    // Send confirmation email to user only if it's not the same inbox
    // as the business recipient (prevents perceived duplicate delivery).
    const shouldSendConfirmation = verifiedHuman && !websiteContactEmails.some(
      (websiteContactEmail) =>
        websiteContactEmail.trim().toLowerCase() === email.trim().toLowerCase()
    );
    if (shouldSendConfirmation) {
      try {
        const confirmationLimit = await consumeContactLimit('confirmation', email.trim().toLowerCase(), 1, 3600);
        if (!confirmationLimit.success) {
          return NextResponse.json({ success: true, message: 'Message sent successfully!' });
        }
        const globalConfirmationLimit = await consumeContactLimit('confirmation-global', 'website', 50, 3600);
        if (!globalConfirmationLimit.success) {
          return NextResponse.json({ success: true, message: 'Message sent successfully!' });
        }
        const confirmationResult = await resend.emails.send({
          from: websiteFromEmail,
          to: [email],
          subject: 'We received your Fast Struct inquiry',
          react: ContactConfirmationEmail({
            name,
          }),
          replyTo: 'info@faststruct.com',
        }, { idempotencyKey: notificationKey + ':confirmation' });

        if (confirmationResult.error) {
          console.error(
            '[Contact API] Confirmation email error:',
            confirmationResult.error
          );
          // Don't fail the request - the main email was sent successfully
        } else {
          console.log(
            '[Contact API] Confirmation email sent successfully:',
            confirmationResult.data
          );
        }
      } catch (confirmationError) {
        console.error(
          '[Contact API] Error sending confirmation email:',
          confirmationError
        );
        // Don't fail the request - the main email was sent successfully
      }
    } else {
      console.log(
        '[Contact API] Skipping confirmation email because recipient matches business inbox'
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
