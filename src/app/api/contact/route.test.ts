import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';
import { checkRateLimit } from '@/lib/rate-limit';
import { createAssessment } from '@/lib/recaptcha';
import { saveWebsiteContactLead } from '@/lib/supabase-leads';
import { checkSharedContactLimit, consumeContactLimit } from '@/lib/contact-protection';
import { addToGoogleSheets } from '@/lib/google-sheets';

const validPayload = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  address: '123 Main St, City',
  message: 'This is a test message with enough characters.',
  contactConsent: true,
  recaptchaToken: 'recaptcha-token',
  source: 'contact' as const,
};

const validLeadPayload = {
  name: 'Jane Lead',
  email: 'jane@example.com',
  phone: '1234567890',
  address: '',
  message: 'This is a test message with enough characters.',
  contactConsent: true,
  recaptchaToken: 'recaptcha-token',
  serviceType: 'ADU Construction' as const,
  source: 'landing' as const,
};

function createRequest(
  body: unknown,
  headers?: Record<string, string>
): NextRequest {
  return new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': '1.2.3.4',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

const { testEnv, sendEmail } = vi.hoisted(() => ({
  sendEmail: vi.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null }),
  testEnv: {
    siteUrl: 'https://example.com',
    resendApiKey: 're_test',
    fromEmail: 'test@resend.dev',
    contactEmail: 'contact@example.com',
    enableComingSoon: false,
    googleSheetsUrl: '',
    googleMapsApiKey: '',
    recaptchaSecretKey: '',
    recaptchaSiteKey: 'test-site-key',
    recaptchaMinScore: 0.5,
    googleCloudProjectId: 'test-project',
    googleCloudProjectNumber: '123456789',
    googleCloudApiKey: 'test-api-key',
    contactEmails: ['contact@example.com'],
  },
}));

vi.mock('@/lib/env', () => ({
  validatedEnv: testEnv,
  getValidatedContactEnv: vi.fn(() => testEnv),
  validateContactEnv: vi.fn(),
}));

vi.mock('resend', () => ({
  Resend: class MockResend {
    emails = {
      send: sendEmail,
    };
  },
}));

vi.mock('@/lib/google-sheets', () => ({
  addToGoogleSheets: vi.fn().mockResolvedValue(true),
}));

vi.mock('@/lib/rate-limit', () => ({
  checkRateLimit: vi.fn().mockReturnValue({
    success: true,
    remaining: 4,
    resetAt: Date.now() + 60000,
  }),
}));

vi.mock('@/lib/recaptcha', () => ({
  createAssessment: vi.fn().mockResolvedValue({
    score: 0.9,
    reasons: [],
    action: 'contact',
  }),
}));

vi.mock('@/lib/supabase-leads', () => ({
  saveWebsiteContactLead: vi.fn().mockResolvedValue('created'),
}));

vi.mock('@/lib/contact-protection', () => ({
  checkSharedContactLimit: vi.fn().mockResolvedValue({ success: true, remaining: 2, retryAfterSeconds: 60 }),
  consumeContactLimit: vi.fn().mockResolvedValue({ success: true, remaining: 0, retryAfterSeconds: 3600 }),
  emailIdempotencyKey: vi.fn().mockReturnValue('test-idempotency'),
}));

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(checkSharedContactLimit).mockResolvedValue({ success: true, remaining: 2, retryAfterSeconds: 60 });
    vi.mocked(consumeContactLimit).mockResolvedValue({ success: true, remaining: 0, retryAfterSeconds: 3600 });
    vi.mocked(checkRateLimit).mockReturnValue({
      success: true,
      remaining: 4,
      resetAt: Date.now() + 60000,
    });
    vi.mocked(createAssessment).mockResolvedValue({
      score: 0.9,
      reasons: [],
      action: 'contact',
    });
    vi.mocked(saveWebsiteContactLead).mockResolvedValue('created');
  });

  it('returns 422 for invalid payload', async () => {
    const request = createRequest({
      name: 'A',
      email: 'invalid',
      phone: '12',
      address: 'x',
      message: 'short',
      recaptchaToken: '',
      source: 'contact',
    });
    const response = await POST(request);
    expect(response.status).toBe(422);
    const data = await response.json();
    expect(data.error).toBe('Validation failed');
    expect(data.details).toBeDefined();
    expect(Array.isArray(data.details)).toBe(true);
  });

  it('returns 200 for valid payload and saves it to the Leads Tracker', async () => {
    const request = createRequest(validPayload);
    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.message).toContain('successfully');
    expect(saveWebsiteContactLead).toHaveBeenCalledTimes(1);
    expect(saveWebsiteContactLead).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com',
        source: 'contact',
      })
    );
  });

  it('saves landing-page submissions with their origin and still sends email and Sheets', async () => {
    const request = createRequest({ ...validLeadPayload, sourceUrl: 'https://faststruct.com/landing/adu' });
    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(saveWebsiteContactLead).toHaveBeenCalledWith(expect.objectContaining({
      source: 'landing', sourceUrl: 'https://faststruct.com/landing/adu', serviceType: 'ADU Construction',
    }));
    expect(sendEmail).toHaveBeenCalled();
    expect(addToGoogleSheets).toHaveBeenCalledTimes(1);
  });

  it('continues notifications for a duplicate so failed deliveries can be retried', async () => {
    vi.mocked(saveWebsiteContactLead).mockResolvedValueOnce('duplicate');

    const request = createRequest(validPayload);
    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(addToGoogleSheets).toHaveBeenCalledTimes(1);
  });

  it.each([validPayload, validLeadPayload])('returns 503 when the Leads Tracker cannot save the inquiry (%o)', async (payload) => {
    vi.mocked(saveWebsiteContactLead).mockRejectedValueOnce(new Error('Database unavailable'));
    const response = await POST(createRequest(payload));
    expect(response.status).toBe(503);
    expect(addToGoogleSheets).not.toHaveBeenCalled();
  });

  it('returns 422 when source is landing but serviceType is missing', async () => {
    const request = createRequest({
      name: 'Jane Lead',
      email: 'jane@example.com',
      phone: '1234567890',
      address: '',
      message: 'This is a test message with enough characters.',
      contactConsent: true,
      recaptchaToken: 'recaptcha-token',
      source: 'landing',
    });
    const response = await POST(request);
    expect(response.status).toBe(422);
  });

  it('returns 422 when source is contact but address is too short', async () => {
    const request = createRequest({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '1234',
      message: 'This is a test message with enough characters.',
      contactConsent: true,
      recaptchaToken: 'recaptcha-token',
      source: 'contact',
    });
    const response = await POST(request);
    expect(response.status).toBe(422);
  });

  it('returns 422 when source is contact but consent is not granted', async () => {
    const request = createRequest({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St, City',
      message: 'This is a test message with enough characters.',
      contactConsent: false,
      recaptchaToken: 'recaptcha-token',
      source: 'contact',
    });
    const response = await POST(request);
    expect(response.status).toBe(422);
  });

  it('returns 422 when source is missing', async () => {
    const request = createRequest({
      ...validPayload,
      source: undefined,
    });
    const response = await POST(request);
    expect(response.status).toBe(422);
  });

  it('returns 429 when rate limited', async () => {
    vi.mocked(checkRateLimit).mockReturnValue({
      success: false,
      remaining: 0,
      resetAt: Date.now() + 30000,
      retryAfterSeconds: 30,
    });

    const request = createRequest(validPayload);
    const response = await POST(request);
    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('30');
    const data = await response.json();
    expect(data.error).toContain('Too many requests');
  });

  it('returns 422 when recaptcha verification fails', async () => {
    vi.mocked(createAssessment).mockResolvedValue(null);

    const request = createRequest(validPayload);
    const response = await POST(request);
    expect(response.status).toBe(422);
    const data = await response.json();
    expect(data.error).toBe('reCAPTCHA verification failed');
  });

  it('returns 422 when recaptcha score is below threshold', async () => {
    vi.mocked(createAssessment).mockResolvedValue({
      score: 0.2,
      reasons: [],
      action: 'contact',
    });

    const request = createRequest(validPayload);
    const response = await POST(request);
    expect(response.status).toBe(422);
    const data = await response.json();
    expect(data.error).toBe('reCAPTCHA verification failed');
  });

  it('returns 422 when recaptcha action does not match', async () => {
    vi.mocked(createAssessment).mockResolvedValue({
      score: 0.9,
      reasons: [],
      action: 'login',
    });

    const request = createRequest(validPayload);
    const response = await POST(request);
    expect(response.status).toBe(422);
    const data = await response.json();
    expect(data.error).toBe('reCAPTCHA verification failed');
  });

  it('rejects inquiries without side effects when verification is unavailable', async () => {
    vi.mocked(createAssessment).mockRejectedValueOnce(
      new Error('Temporary reCAPTCHA service error')
    );

    const request = createRequest(validPayload);
    const response = await POST(request);
    expect(response.status).toBe(503);
    expect(response.headers.get('Retry-After')).toBe('30');
    expect(saveWebsiteContactLead).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
    expect(addToGoogleSheets).not.toHaveBeenCalled();
    expect(consumeContactLimit).not.toHaveBeenCalled();
  });

  it('rejects shared rate-limit exhaustion before saving or sending', async () => {
    vi.mocked(checkSharedContactLimit).mockResolvedValueOnce({ success: false, remaining: 0, retryAfterSeconds: 42 });
    const response = await POST(createRequest(validPayload));
    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('42');
    expect(sendEmail).not.toHaveBeenCalled();
    expect(saveWebsiteContactLead).not.toHaveBeenCalled();
  });

  it('fails safely if shared protection is unavailable', async () => {
    vi.mocked(checkSharedContactLimit).mockRejectedValueOnce(new Error('unavailable'));
    expect((await POST(createRequest(validPayload))).status).toBe(503);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('suppresses repeated recipient confirmations while preserving the lead and business notification', async () => {
    vi.mocked(consumeContactLimit).mockResolvedValueOnce({ success: false, remaining: 0, retryAfterSeconds: 3600 });
    expect((await POST(createRequest(validPayload))).status).toBe(200);
    expect(saveWebsiteContactLead).toHaveBeenCalledTimes(1);
    expect(addToGoogleSheets).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail.mock.calls[0][1]).toEqual({ idempotencyKey: 'test-idempotency' });
  });

  it('rejects oversized bodies before side effects', async () => {
    expect((await POST(createRequest({ ...validPayload, message: 'a'.repeat(17000) }))).status).toBe(413);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('returns 400 for invalid JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '1.2.3.4' },
      body: 'not valid json',
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid JSON');
  });
});
