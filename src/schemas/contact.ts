import { z } from 'zod';

/** Where the submission originated; drives address vs serviceType rules. */
export const CONTACT_FORM_SOURCES = ['contact', 'landing'] as const;
export type ContactFormSource = (typeof CONTACT_FORM_SOURCES)[number];

/** Landing requests may omit `address`; contact page sends a real address. */
const addressField = z.string().trim().default('');

const nameField = z.string().min(2, 'Name must be at least 2 characters').trim();
const emailField = z.email('Invalid email address').trim();
const phoneField = z
  .string()
  .min(1, 'Phone number is required')
  .trim()
  .refine(
    (val) => {
      const digitsOnly = val.replace(/\D/g, '');
      return digitsOnly.length >= 7 && digitsOnly.length <= 15;
    },
    {
      message:
        'Invalid phone format. Please enter a valid phone number (7-15 digits)',
    }
  );
const messageField = z
  .string()
  .min(10, 'Message must be at least 10 characters')
  .trim();

export const LEAD_SERVICE_TYPES = [
  'ADU Construction',
  'Modular Homes',
  'New Home Construction',
  'Panelized Construction',
] as const;

/** Shared fields for POST /api/contact (before source-specific refinement). */
const contactBodyBaseSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  address: addressField,
  message: messageField,
  serviceType: z.enum(LEAD_SERVICE_TYPES).optional(),
  source: z.enum(CONTACT_FORM_SOURCES),
});

/**
 * `source: 'contact'` → require `address` (min 5 chars).
 * `source: 'landing'` → require `serviceType`; `address` may be empty.
 */
export const contactFormSchema = contactBodyBaseSchema.superRefine(
  (data, ctx) => {
    if (data.source === 'contact') {
      if (data.address.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Address must be at least 5 characters',
          path: ['address'],
        });
      }
      return;
    }
    if (data.serviceType === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select a service type',
        path: ['serviceType'],
      });
    }
  }
);

/** Parsed POST body / sheets row (output after defaults + refine). */
export type ContactFormData = z.output<typeof contactFormSchema>;
/** React Hook Form values (input side of the schema). */
export type ContactFormInput = z.input<typeof contactFormSchema>;

/** Landing lead form: same POST body as API, including `source: 'landing'`. */
export const leadCaptureFormSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  message: messageField,
  address: z.literal(''),
  serviceType: z.enum(LEAD_SERVICE_TYPES),
  source: z.literal('landing'),
});

export type LeadCaptureFormInput = z.output<typeof leadCaptureFormSchema>;

/**
 * Keys allowed on `leadCapture.fields[].fieldKey` in CMS JSON — the visible
 * inputs only (matches `leadCaptureFormSchema` minus `address` and `source`).
 */
export const LEAD_CAPTURE_FORM_FIELD_KEYS = [
  'name',
  'phone',
  'email',
  'serviceType',
  'message',
] as const satisfies readonly Exclude<
  keyof LeadCaptureFormInput,
  'address' | 'source'
>[];

export type LeadCaptureFormFieldKey =
  (typeof LEAD_CAPTURE_FORM_FIELD_KEYS)[number];
