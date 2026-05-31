declare global {
  interface Window {
    grecaptcha?: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (
          siteKey: string,
          options: { action: string }
        ) => Promise<string>;
      };
    };
  }
}

let scriptLoadPromise: Promise<void> | null = null;

function loadRecaptchaEnterpriseScript(siteKey: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('reCAPTCHA can only run in the browser'));
  }

  if (window.grecaptcha?.enterprise) {
    return Promise.resolve();
  }

  if (!scriptLoadPromise) {
    scriptLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`;
      script.async = true;
      script.onload = () => {
        window.grecaptcha?.enterprise.ready(() => resolve());
      };
      script.onerror = () => {
        scriptLoadPromise = null;
        reject(new Error('Failed to load reCAPTCHA Enterprise'));
      };
      document.head.appendChild(script);
    });
  }

  return scriptLoadPromise;
}

export async function executeRecaptcha(
  siteKey: string,
  action: string
): Promise<string> {
  if (!siteKey) {
    throw new Error('Missing reCAPTCHA site key');
  }

  await loadRecaptchaEnterpriseScript(siteKey);

  if (!window.grecaptcha?.enterprise) {
    throw new Error('reCAPTCHA Enterprise is not available');
  }

  return window.grecaptcha.enterprise.execute(siteKey, { action });
}
