import { createHash, createHmac } from 'node:crypto';
import { ipAddress } from '@vercel/functions';
import type { ContactFormData } from '@/schemas/contact';

function config() {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/$/, '');
  const key = process.env.SUPABASE_SECRET_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) throw new Error('Contact protection is not configured');
  return { url, key };
}

export function emailIdempotencyKey(data: ContactFormData, now = new Date()) {
  const { recaptchaToken: _token, ...fields } = data;
  const canonical = { ...fields, email: data.email.trim().toLowerCase() };
  return 'contact-notification:' + createHash('sha256').update(
    JSON.stringify([now.toISOString().slice(0, 10), canonical])
  ).digest('hex');
}

export async function consumeContactLimit(scope: string, identifier: string, limit: number, seconds: number) {
  const { url, key } = config();
  // Do not store IP addresses or recipient email addresses in the rate-limit table.
  const bucket = scope + ':' + createHmac('sha256', key).update(identifier).digest('hex');
  const headers: Record<string, string> = { apikey: key, 'Content-Type': 'application/json' };
  if (key.startsWith('eyJ')) headers.Authorization = 'Bearer ' + key;
  const response = await fetch(url + '/rest/v1/rpc/consume_website_contact_limit', {
    method: 'POST', headers, signal: AbortSignal.timeout(5000),
    body: JSON.stringify({ p_key: bucket, p_limit: limit, p_window_seconds: seconds }),
  });
  if (!response.ok) throw new Error('Contact protection service unavailable');
  const result = await response.json() as { success: boolean; remaining: number; retryAfterSeconds: number };
  if (typeof result.success !== 'boolean' || !Number.isFinite(result.retryAfterSeconds)) {
    throw new Error('Invalid contact protection response');
  }
  return result;
}

export async function checkSharedContactLimit(request: Request) {
  // Vercel's trusted request IP takes precedence over user-supplied headers.
  const ip = ipAddress(request) || 'unknown';
  return consumeContactLimit('ip', ip, 3, 60);
}

