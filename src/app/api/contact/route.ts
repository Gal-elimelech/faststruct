import { NextRequest, NextResponse } from 'next/server';
import { contactSubmissionUnionSchema } from '@/schemas/contact';
import { Resend } from 'resend';
import ContactEmail from '@/components/emails/ContactEmail';
import ContactConfirmationEmail from '@/components/emails/ContactConfirmationEmail';
import { validatedEnv } from '@/lib/env';
import { addToGoogleSheets } from '@/lib/google-sheets';
import { checkRateLimit } from '@/lib/rate-limit';
import { createAssessment } from '@/lib/recaptcha';

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

  let body;
  try {
    body = await request.json();
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

    const recaptchaAssessment = await createAssessment({
      recaptchaAction: 'contact',
      siteKey: validatedEnv.recaptchaSiteKey,
      token: result.data.recaptchaToken,
      userAgent,
      userIpAddress,
    });

    if (!recaptchaAssessment) {
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

    const resend = new Resend(validatedEnv.resendApiKey);
    const { name, email, phone, address, message, serviceType, source } =
      result.data;

    const emailResult = await resend.emails.send({
      from: validatedEnv.fromEmail,
      to: websiteContactEmails,
      subject: `New Contact Form Submission from ${name}`,
      react: ContactEmail({
        name,
        email,
        phone,
        address,
        message,
        serviceType,
        source,
      }),
      replyTo: email,
    });

    if (emailResult.error) {
      console.error('[Contact API] Resend error:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
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
        source,
        status: 'Pending',
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
    const shouldSendConfirmation = !websiteContactEmails.some(
      (websiteContactEmail) =>
        websiteContactEmail.trim().toLowerCase() === email.trim().toLowerCase()
    );
    if (shouldSendConfirmation) {
      try {
        const confirmationResult = await resend.emails.send({
          from: validatedEnv.fromEmail,
          to: [email],
          subject: 'Thank you for contacting Fast Struct',
          react: ContactConfirmationEmail({
            name,
          }),
          replyTo: validatedEnv.fromEmail,
        });

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
