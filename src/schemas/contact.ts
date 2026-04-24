import { z } from 'zod';

/** Where the submission originated. */
export const CONTACT_FORM_SOURCES = ['contact', 'landing'] as const;
export type ContactFormSource = (typeof CONTACT_FORM_SOURCES)[number];
export type LandingFormSource = Exclude<ContactFormSource, 'contact'>;

const nameField = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .trim();
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
const recaptchaTokenField = z
  .string()
  .min(1, 'Please verify you are human')
  .trim();
const requiredAddressField = z
  .string()
  .trim()
  .min(5, 'Address must be at least 5 characters');
const optionalAddressField = z.string().trim().optional().default('');

export const LEAD_SERVICE_TYPES = [
  'ADU Construction',
  'Modular Homes',
  'New Home Construction',
  'Panelized Construction',
] as const;

const contactCommonFieldsSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  message: messageField,
  recaptchaToken: recaptchaTokenField,
});

/** Contact page form schema (frontend fields only). */
export const contactPageFormSchema = contactCommonFieldsSchema.extend({
  address: requiredAddressField,
});

/** Landing lead form schema (frontend fields only). */
export const leadCaptureFormSchema = contactCommonFieldsSchema.extend({
  serviceType: z.enum(LEAD_SERVICE_TYPES),
});

export type ContactPageFormInput = z.output<typeof contactPageFormSchema>;
export type LeadCaptureFormInput = z.output<typeof leadCaptureFormSchema>;

const contactSubmissionSchema = contactCommonFieldsSchema.extend({
  source: z.literal('contact'),
  address: requiredAddressField,
  serviceType: z.undefined().optional(),
});

const landingSubmissionSchema = contactCommonFieldsSchema.extend({
  source: z.literal('landing'),
  address: optionalAddressField,
  serviceType: z.enum(LEAD_SERVICE_TYPES),
});

/** API payload schema for POST /api/contact. */
export const contactSubmissionUnionSchema = z.discriminatedUnion('source', [
  contactSubmissionSchema,
  landingSubmissionSchema,
]);

/** Parsed POST body / sheets row (output after defaults). */
export type ContactFormData = z.output<typeof contactSubmissionUnionSchema>;

export function toContactSubmission(
  values: ContactPageFormInput
): z.input<typeof contactSubmissionUnionSchema> {
  return {
    ...values,
    source: 'contact',
  };
}

export function toLandingSubmission(
  values: LeadCaptureFormInput,
  source: LandingFormSource = 'landing'
): z.input<typeof contactSubmissionUnionSchema> {
  return {
    ...values,
    source,
  };
}

/**
 * Keys allowed on `leadCapture.fields[].fieldKey` in CMS JSON — the visible
 * inputs only (matches `leadCaptureFormSchema` minus `recaptchaToken`).
 */
export const LEAD_CAPTURE_FORM_FIELD_KEYS = [
  'name',
  'phone',
  'email',
  'serviceType',
  'message',
] as const satisfies readonly Exclude<
  keyof LeadCaptureFormInput,
  'recaptchaToken'
>[];

export type LeadCaptureFormFieldKey =
  (typeof LEAD_CAPTURE_FORM_FIELD_KEYS)[number];
