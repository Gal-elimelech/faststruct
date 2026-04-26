import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';
import { checkRateLimit } from '@/lib/rate-limit';
import { createAssessment } from '@/lib/recaptcha';

const validPayload = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  address: '123 Main St, City',
  message: 'This is a test message with enough characters.',
  recaptchaToken: 'recaptcha-token',
  source: 'contact' as const,
};

const validLeadPayload = {
  name: 'Jane Lead',
  email: 'jane@example.com',
  phone: '1234567890',
  address: '',
  message: 'This is a test message with enough characters.',
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

const { testEnv } = vi.hoisted(() => ({
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
      send: vi.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null }),
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

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

  it('returns 200 for valid payload', async () => {
    const request = createRequest(validPayload);
    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.message).toContain('successfully');
  });

  it('returns 200 for valid landing lead payload (serviceType, empty address)', async () => {
    const request = createRequest(validLeadPayload);
    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
  });

  it('returns 422 when source is landing but serviceType is missing', async () => {
    const request = createRequest({
      name: 'Jane Lead',
      email: 'jane@example.com',
      phone: '1234567890',
      address: '',
      message: 'This is a test message with enough characters.',
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

  it('returns 500 when an unexpected error occurs during processing', async () => {
    vi.mocked(createAssessment).mockRejectedValueOnce(
      new Error('Temporary reCAPTCHA service error')
    );

    const request = createRequest(validPayload);
    const response = await POST(request);
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe('Failed to process request');
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
