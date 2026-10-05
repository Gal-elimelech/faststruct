# Contact form notifications

Business notification recipients are configured in the Vercel project's CONTACT_EMAIL environment variable as a comma-separated list. The current recipients are gal@faststruct.com and eyal@faststruct.com.

After changing recipients, redeploy the website so the server functions receive the updated environment. Keep production, preview, and development recipient settings consistent.

Contact Us submissions also persist to the Leads Tracker in Supabase and use the existing Google Sheets webhook. The submitter receives a confirmation email unless their address is already a business recipient.
