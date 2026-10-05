const REQUIRED_CONTACT_ENV = [
  'RESEND_API_KEY',
  'CONTACT_EMAIL',
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

function parseRecaptchaMinScore(rawValue: string | undefined): number {
  const parsed = rawValue ? Number.parseFloat(rawValue) : 0.5;
  if (Number.isNaN(parsed) || parsed < 0 || parsed > 1) {
    return 0.5;
  }
  return parsed;
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
  recaptchaMinScore: parseRecaptchaMinScore(process.env.RECAPTCHA_MIN_SCORE),
  googleCloudProjectId: process.env.GOOGLE_CLOUD_PROJECT_ID ?? '',
  googleCloudProjectNumber: process.env.GOOGLE_CLOUD_PROJECT_NUMBER ?? '',
  googleCloudApiKey: process.env.GOOGLE_CLOUD_API_KEY ?? '',
} as const;

/**
 * Validates only the variables required by the currently active contact flow.
 * reCAPTCHA / Google Cloud settings remain optional while that validation is
 * intentionally disabled in the contact route.
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

export function getValidatedContactEnv(): Env {
  validateContactEnv();
  return {
    ...env,
    contactEmails: parseContactEmails(env.contactEmail),
  };
}

export const validatedEnv = getValidatedContactEnv();
