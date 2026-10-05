import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { consumeContactLimit, emailIdempotencyKey } from './contact-protection';

const data = { source: 'contact' as const, name: 'Test', email: 'test@example.com', phone: '4085550101', address: '123 Main St', message: 'Test inquiry', contactConsent: true, recaptchaToken: 'first' };
describe('shared contact protection', () => {
  const originalEnv = { ...process.env };
  beforeEach(() => {
    process.env.SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SECRET_KEY = 'sb_secret_test';
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  });
  afterEach(() => { process.env = { ...originalEnv }; vi.restoreAllMocks(); });
  it('keeps the email retry key stable when captcha tokens change', () => {
    const now = new Date('2026-10-05T12:00:00Z');
    expect(emailIdempotencyKey(data, now)).toBe(emailIdempotencyKey({ ...data, recaptchaToken: 'second' }, now));
    expect(emailIdempotencyKey(data, now)).not.toBe(emailIdempotencyKey({ ...data, message: 'A different inquiry' }, now));
  });
  it('hashes identifiers and sends credentials only to the server RPC', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ success: true, remaining: 2, retryAfterSeconds: 60 })));
    expect((await consumeContactLimit('ip', '192.0.2.1', 3, 60)).success).toBe(true);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://example.supabase.co/rest/v1/rpc/consume_website_contact_limit');
    expect(init?.body).not.toContain('192.0.2.1');
    expect(JSON.parse(String(init?.body))).toMatchObject({ p_limit: 3, p_window_seconds: 60 });
    expect(init?.headers).not.toHaveProperty('Authorization');
  });
  it('supports legacy service-role bearer authentication', async () => {
    delete process.env.SUPABASE_SECRET_KEY;
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'eyJtest';
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ success: true, remaining: 0, retryAfterSeconds: 60 })));
    await consumeContactLimit('confirmation', 'test@example.com', 1, 3600);
    expect(fetchMock.mock.calls[0][1]?.headers).toHaveProperty('Authorization', 'Bearer eyJtest');
  });
  it('fails closed on database errors', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 503 }));
    await expect(consumeContactLimit('ip', '192.0.2.1', 3, 60)).rejects.toThrow('unavailable');
  });
  it('rejects malformed protection responses', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'));
    await expect(consumeContactLimit('ip', '192.0.2.1', 3, 60)).rejects.toThrow('Invalid');
  });
});

