import { ContactFormData } from '@/schemas/contact';
import { validatedEnv } from './env';

export interface GoogleSheetsData
  extends Omit<ContactFormData, 'recaptchaToken'> {
  status: string;
}

export async function addToGoogleSheets(
  data: GoogleSheetsData
): Promise<boolean> {
  if (!validatedEnv.googleSheetsUrl) {
    console.warn('[Google Sheets] Webhook URL not configured, skipping');
    return false;
  }

  try {
    const response = await fetch(validatedEnv.googleSheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('[Google Sheets] Error adding row:', error);
    return false;
  }
}
