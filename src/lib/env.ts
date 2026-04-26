const REQUIRED_CONTACT_ENV = [
  'RESEND_API_KEY',
  'CONTACT_EMAIL',
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
  'GOOGLE_CLOUD_PROJECT_ID',
  'GOOGLE_CLOUD_PROJECT_NUMBER',
  'GOOGLE_CLOUD_API_KEY',
] as const;

export type Env = typeof env & {
  contactEmails: string[];
};

const SIMPLE_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseContactEmails(rawValue: string): string[] {
  const contactEmails = rawValue
    .split(',')
    .map((emailAddress) => emailAddress.trim())
    .filter(Boolean);

  if (contactEmails.length === 0) {
    throw new Error(
      'CONTACT_EMAIL must contain at least one valid recipient email, separated by commas'
    );
  }

  const invalidEmails = contactEmails.filter(
    (emailAddress) => !SIMPLE_EMAIL_REGEX.test(emailAddress)
  );
  if (invalidEmails.length > 0) {
    throw new Error(
      `CONTACT_EMAIL contains invalid email(s): ${invalidEmails.join(', ')}`
    );
  }

  return contactEmails;
}

const env = {
  resendApiKey: process.env.RESEND_API_KEY ?? '',
  fromEmail: process.env.FROM_EMAIL ?? 'onboarding@resend.dev',
  contactEmail: process.env.CONTACT_EMAIL ?? '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  enableComingSoon: process.env.ENABLE_COMING_SOON === 'true',
  googleSheetsUrl: process.env.GOOGLE_SHEETS_URL ?? '',
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY ?? '',
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '',
  googleCloudProjectId: process.env.GOOGLE_CLOUD_PROJECT_ID ?? '',
  googleCloudProjectNumber: process.env.GOOGLE_CLOUD_PROJECT_NUMBER ?? '',
  googleCloudApiKey: process.env.GOOGLE_CLOUD_API_KEY ?? '',
} as const;

/**
 * Validates that required env vars for the contact API are set.
 * Call at runtime when handling contact form submissions.
 * @throws Error with missing var names if any required var is empty
 */
export function validateContactEnv(): void {
  const missing = REQUIRED_CONTACT_ENV.filter(
    (key) => !process.env[key]?.trim()
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

/**
 * Returns env object after validating required contact vars.
 * Use in contact API route before sending emails.
 */
export function getValidatedContactEnv(): Env {
  validateContactEnv();
  return {
    ...env,
    contactEmails: parseContactEmails(env.contactEmail),
  };
}

export const validatedEnv = getValidatedContactEnv();
