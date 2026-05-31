import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { validateContactEnv } from './env';

const REQUIRED_TEST_ENV = {
  RESEND_API_KEY: 're_test',
  CONTACT_EMAIL: 'test@example.com',
  NEXT_PUBLIC_SITE_URL: 'https://example.com',
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: 'test-site-key',
  GOOGLE_CLOUD_PROJECT_ID: 'test-project',
  GOOGLE_CLOUD_PROJECT_NUMBER: '123456789',
  GOOGLE_CLOUD_API_KEY: 'test-api-key',
} as const;

describe('validateContactEnv', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    for (const [key, value] of Object.entries(REQUIRED_TEST_ENV)) {
      process.env[key] = value;
    }
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('throws when RESEND_API_KEY is missing', () => {
    process.env.RESEND_API_KEY = '';
    expect(() => validateContactEnv()).toThrow(
      'Missing required environment variables'
    );
    expect(() => validateContactEnv()).toThrow('RESEND_API_KEY');
  });

  it('throws when CONTACT_EMAIL is missing', () => {
    process.env.CONTACT_EMAIL = '';
    expect(() => validateContactEnv()).toThrow(
      'Missing required environment variables'
    );
    expect(() => validateContactEnv()).toThrow('CONTACT_EMAIL');
  });

  it('throws when NEXT_PUBLIC_SITE_URL is missing', () => {
    process.env.NEXT_PUBLIC_SITE_URL = '';
    expect(() => validateContactEnv()).toThrow(
      'Missing required environment variables'
    );
    expect(() => validateContactEnv()).toThrow('NEXT_PUBLIC_SITE_URL');
  });

  it('does not throw when all required vars are present', () => {
    expect(() => validateContactEnv()).not.toThrow();
  });

  it('throws when multiple vars are missing', () => {
    process.env.RESEND_API_KEY = '';
    process.env.CONTACT_EMAIL = '';
    expect(() => validateContactEnv()).toThrow('RESEND_API_KEY');
    expect(() => validateContactEnv()).toThrow('CONTACT_EMAIL');
  });
});
