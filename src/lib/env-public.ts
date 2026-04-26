export const publicEnv = {
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? '',
} as const;
