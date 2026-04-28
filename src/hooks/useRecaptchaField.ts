'use client';

import { useCallback, useRef } from 'react';
import type {
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';
import type ReCAPTCHA from 'react-google-recaptcha';

interface UseRecaptchaFieldOptions<TFormValues extends FieldValues> {
  fieldName: Path<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  setError: UseFormSetError<TFormValues>;
  clearErrors: UseFormClearErrors<TFormValues>;
}

export function useRecaptchaField<TFormValues extends FieldValues>({
  fieldName,
  setValue,
  setError,
  clearErrors,
}: UseRecaptchaFieldOptions<TFormValues>) {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const onTokenChange = useCallback(
    (token: string | null) => {
      const value = token ?? '';
      setValue(fieldName, value as TFormValues[Path<TFormValues>], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });

      if (value) {
        clearErrors(fieldName);
      } else {
        setError(fieldName, {
          type: 'required',
          message: 'Please verify you are human',
        });
      }
    },
    [clearErrors, fieldName, setError, setValue]
  );

  const resetRecaptcha = useCallback(() => {
    recaptchaRef.current?.reset();
    setValue(fieldName, '' as TFormValues[Path<TFormValues>], {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    clearErrors(fieldName);
  }, [clearErrors, fieldName, setValue]);

  return {
    recaptchaRef,
    onTokenChange,
    resetRecaptcha,
  };
}
