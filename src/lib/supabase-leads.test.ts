import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createWebsiteSubmissionId,
  saveWebsiteContactLead,
} from './supabase-leads';

const submission = {
  name: 'Test Person',
  email: 'Test@Example.com',
  phone: '(408) 555-0101',
  address: '123 Main St, San Jose, CA',
  message: 'I am interested in an ADU project.',
  referralSource: 'Google / Search Engine' as const,
  contactConsent: true,
  recaptchaToken: 'test-token',
  source: 'contact' as const,
  serviceType: undefined,
};

describe('Supabase website lead persistence', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SECRET_KEY = 'sb_secret_test';
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    vi.restoreAllMocks();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('creates a stable same-day submission id', () => {
    const first = createWebsiteSubmissionId(
      submission,
      new Date('2026-09-25T08:00:00Z')
    );
    const second = createWebsiteSubmissionId(
      { ...submission, email: 'test@example.com' },
      new Date('2026-09-25T22:00:00Z')
    );

    expect(first).toBe(second);
    expect(first).toMatch(/^website-contact:2026-09-25:/);
  });

  it('writes the Contact Us fields to the leads table', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify([{ id: 'lead-1' }]), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const result = await saveWebsiteContactLead(
      submission,
      new Date('2026-09-25T12:00:00Z')
    );

    expect(result).toBe('created');
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toContain('/rest/v1/leads?on_conflict=website_submission_id');

    const payload = JSON.parse(String(init?.body));
    expect(payload.contact_name).toBe('Test Person');
    expect(payload.contact_email).toBe('Test@Example.com');
    expect(payload.contact_phone).toBe('(408) 555-0101');
    expect(payload.ai_address).toBe('123 Main St, San Jose, CA');
    expect(payload.internal_notes).toBe('I am interested in an ADU project.');
    expect(payload.lead_source).toBe('Website Contact Us');
    expect(payload.raw.contactConsent).toBe(true);
    expect(payload.raw.message).toBe('I am interested in an ADU project.');
  });

  it('reports a duplicate when Supabase ignores the conflicting insert', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify([]), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    await expect(saveWebsiteContactLead(submission)).resolves.toBe('duplicate');
  });

  it('fails closed when server-side Supabase credentials are missing', async () => {
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SECRET_KEY;

    await expect(saveWebsiteContactLead(submission)).rejects.toThrow(
      'Missing SUPABASE_URL'
    );
  });
});
