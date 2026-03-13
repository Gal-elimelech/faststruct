import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  email: z.email('Invalid email address').trim(),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .trim()
    .refine(
      (val) => {
        // Remove all non-digit characters for validation
        const digitsOnly = val.replace(/\D/g, '');
        // Check if it has 7-15 digits (international phone number range)
        return digitsOnly.length >= 7 && digitsOnly.length <= 15;
      },
      {
        message:
          'Invalid phone format. Please enter a valid phone number (7-15 digits)',
      }
    ),
  address: z.string().min(5, 'Address must be at least 5 characters').trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
