import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';
import { checkRateLimit } from '@/lib/rate-limit';
import { getValidatedContactEnv } from '@/lib/env';

const validPayload = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  address: '123 Main St, City',
  message: 'This is a test message with enough characters.',
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

vi.mock('@/lib/env', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/env')>();
  const testEnv = {
    ...actual.env,
    siteUrl: 'https://example.com',
    resendApiKey: 're_test',
    contactEmail: 'contact@example.com',
    fromEmail: 'test@resend.dev',
  };
  return {
    ...actual,
    env: testEnv,
    getValidatedContactEnv: vi.fn(() => testEnv),
  };
});

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

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(checkRateLimit).mockReturnValue({
      success: true,
      remaining: 4,
      resetAt: Date.now() + 60000,
    });
  });

  it('returns 422 for invalid payload', async () => {
    const request = createRequest({
      name: 'A',
      email: 'invalid',
      phone: '12',
      address: 'x',
      message: 'short',
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

  it('returns 500 when env validation fails', async () => {
    vi.mocked(getValidatedContactEnv).mockImplementation(() => {
      throw new Error('Missing required environment variables: RESEND_API_KEY');
    });

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
