import { createHash } from 'node:crypto';
import type { ContactFormData } from '@/schemas/contact';

type WebsiteContactSubmission = Extract<ContactFormData, { source: 'contact' }>;

export type WebsiteLeadSaveResult = 'created' | 'duplicate';

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/$/, '');
  const secretKey =
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !secretKey) {
    throw new Error(
      'Missing SUPABASE_URL and/or SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY)'
    );
  }

  return { url, secretKey };
}

export function createWebsiteSubmissionId(
  data: WebsiteContactSubmission,
  now = new Date()
): string {
  const day = now.toISOString().slice(0, 10);
  const canonicalSubmission = JSON.stringify({
    day,
    name: data.name.trim().toLowerCase(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.replace(/\D/g, ''),
    address: data.address.trim().toLowerCase(),
    message: data.message.trim(),
    referralSource: data.referralSource ?? '',
    contactConsent: data.contactConsent,
  });
  const digest = createHash('sha256')
    .update(canonicalSubmission)
    .digest('hex');

  return `website-contact:${day}:${digest}`;
}

export async function saveWebsiteContactLead(
  data: WebsiteContactSubmission,
  now = new Date()
): Promise<WebsiteLeadSaveResult> {
  const { url, secretKey } = getSupabaseConfig();
  const submittedAt = now.toISOString();
  const websiteSubmissionId = createWebsiteSubmissionId(data, now);

  const headers: Record<string, string> = {
    apikey: secretKey,
    'Content-Type': 'application/json',
    Prefer: 'resolution=ignore-duplicates,return=representation',
  };

  // Legacy service_role keys are JWTs and can also be used as Bearer tokens.
  // Modern sb_secret_* keys should remain API-key headers only.
  if (secretKey.startsWith('eyJ')) {
    headers.Authorization = `Bearer ${secretKey}`;
  }

  const response = await fetch(
    `${url}/rest/v1/leads?on_conflict=website_submission_id`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        website_submission_id: websiteSubmissionId,
        contact_name: data.name,
        contact_email: data.email,
        contact_phone: data.phone,
        lead_source: 'Website Contact Us',
        lead_medium: 'website',
        lead_type: 'contact_form',
        lead_status: 'new',
        pipeline_status: 'new',
        date_created: submittedAt,
        ai_address: data.address,
        internal_notes: data.message,
        raw: {
          provider: 'website',
          source: 'Website Contact Us',
          formSource: data.source,
          address: data.address,
          message: data.message,
          referralSource: data.referralSource ?? '',
          contactConsent: data.contactConsent,
          submittedAt,
        },
      }),
    }
  );

  if (!response.ok) {
    const responseBody = await response.text();
    throw new Error(
      `Supabase lead insert failed (${response.status}): ${responseBody.slice(0, 500)}`
    );
  }

  const rows = (await response.json()) as unknown[];
  return rows.length === 0 ? 'duplicate' : 'created';
}
