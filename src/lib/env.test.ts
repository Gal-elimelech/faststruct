import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { validateContactEnv } from './env';

describe('validateContactEnv', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.RESEND_API_KEY = 're_test';
    process.env.CONTACT_EMAIL = 'test@example.com';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
  });

  afterEach(() => {
    process.env.RESEND_API_KEY = originalEnv.RESEND_API_KEY;
    process.env.CONTACT_EMAIL = originalEnv.CONTACT_EMAIL;
    process.env.NEXT_PUBLIC_SITE_URL = originalEnv.NEXT_PUBLIC_SITE_URL;
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
