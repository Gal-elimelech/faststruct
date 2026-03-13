import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/schemas/contact';
import { Resend } from 'resend';
import ContactEmail from '@/components/emails/ContactEmail';
import ContactConfirmationEmail from '@/components/emails/ContactConfirmationEmail';
import { env } from '@/lib/env';
import { addToGoogleSheets } from '@/lib/google-sheets';

const resend = new Resend(env.resendApiKey);

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const result = contactFormSchema.safeParse(body);
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
    const { name, email, phone, address, message } = result.data;

    const emailResult = await resend.emails.send({
      from: env.fromEmail,
      to: [env.contactEmail],
      subject: `New Contact Form Submission from ${name}`,
      react: ContactEmail({
        name,
        email,
        phone,
        address,
        message,
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

    // Send confirmation email to user
    try {
      const confirmationResult = await resend.emails.send({
        from: env.fromEmail,
        to: [email],
        subject: 'Thank you for contacting Fast Struct',
        react: ContactConfirmationEmail({
          name,
        }),
        replyTo: env.fromEmail,
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

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello, world!' }, { status: 200 });
}
