export const env = {
  resendApiKey: process.env.RESEND_API_KEY ?? '',
  fromEmail: process.env.FROM_EMAIL ?? 'onboarding@resend.dev',
  contactEmail: process.env.CONTACT_EMAIL ?? '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  enableComingSoon: process.env.ENABLE_COMING_SOON === 'true',
  googleSheetsUrl: process.env.GOOGLE_SHEETS_URL ?? '',
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
} as const;

export type Env = typeof env;
