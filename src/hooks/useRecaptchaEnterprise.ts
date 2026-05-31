'use client';

import { useCallback } from 'react';
import { executeRecaptcha } from '@/lib/recaptcha-enterprise';
import { publicEnv } from '@/lib/env-public';

export function useRecaptchaEnterprise() {
  const getRecaptchaToken = useCallback(async (action: string) => {
    return executeRecaptcha(publicEnv.recaptchaSiteKey, action);
  }, []);

  return { getRecaptchaToken };
}
