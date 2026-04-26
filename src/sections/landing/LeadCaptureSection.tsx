'use client';

import { useRef, useState } from 'react';
import {
  useForm,
  Controller,
  type SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Section } from '@/components/Section';
import { IFormConfig } from '@/types/landing';
import { Button } from '@/components/Button';
import { Input, Select, Textarea } from '@/components/form';
import FormMessage from '@/sections/contact/components/FormMessage';
import {
  LEAD_SERVICE_TYPES,
  leadCaptureFormSchema,
  type LeadCaptureFormInput,
  toLandingSubmission,
} from '@/schemas/contact';
import Recaptcha from 'react-google-recaptcha';
import { publicEnv } from '@/lib/env-public';
import { useRecaptchaField } from '@/hooks/useRecaptchaField';

const defaultValues: LeadCaptureFormInput = {
  name: '',
  phone: '',
  email: '',
  serviceType: 'ADU Construction',
  message: '',
  recaptchaToken: '',
};

const serviceOptions = LEAD_SERVICE_TYPES.map((value) => ({
  label: value,
  value,
}));

const LeadCaptureSection = ({
  title,
  subtitle,
  fields,
  buttonText,
}: IFormConfig) => {
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string;
  }>({ type: null, text: '' });

  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadCaptureFormInput>({
    resolver: zodResolver(leadCaptureFormSchema),
    defaultValues,
  });

  const { recaptchaRef, onTokenChange, resetRecaptcha } = useRecaptchaField({
    fieldName: 'recaptchaToken',
    setValue,
    setError,
    clearErrors,
  });

  const onValid: SubmitHandler<LeadCaptureFormInput> = async (values) => {
    setSubmitMessage({ type: null, text: '' });
    const payload = toLandingSubmission(values);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details && Array.isArray(data.details)) {
          for (const detail of data.details as {
            field: string;
            message: string;
          }[]) {
            const key = detail.field as keyof LeadCaptureFormInput;
            if (key in defaultValues) {
              setError(key, { message: detail.message });
            }
          }
        }

        setSubmitMessage({
          type: 'error',
          text: data.error || 'Failed to send message',
        });
        return;
      }

      setSubmitMessage({
        type: 'success',
        text: 'Estimate request sent successfully!',
      });

      reset(defaultValues);
      resetRecaptcha();
    } catch {
      setSubmitMessage({
        type: 'error',
        text: 'Network error. Please try again.',
      });
    }
  };

  return (
    <Section
      id='lead-capture'
      ref={sectionRef}
      bgColor='dark'
      textColor='light'
      className='relative overflow-hidden'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[150px] pointer-events-none' />

      <div className='max-w-5xl mx-auto relative z-10'>
        <div className='text-center mb-16 max-w-3xl mx-auto'>
          <h2 className='text-h2 font-bebas text-light uppercase'>
            {title}
          </h2>
          <p className='text-light/80 font-poppins'>
            {subtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onValid)}
          className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-8 bg-white/3 p-8 md:p-16 lg:p-20 border border-white/5 rounded-sm backdrop-blur-xl relative overflow-hidden'>
          <div className='absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent' />

          {fields.map((field) => {
            const key = field.fieldKey;

            return (
              <div
                key={key}
                className={key === 'message' ? 'md:col-span-2' : ''}>
                {key === 'serviceType' ? (
                  <Controller
                    name='serviceType'
                    control={control}
                    render={({ field: controllerField }) => (
                      <Select
                        id={key}
                        name={key}
                        label={field.label}
                        registration={controllerField}
                        options={serviceOptions}
                        error={errors.serviceType?.message}
                        required
                      />
                    )}
                  />
                ) : key === 'message' ? (
                  <Textarea
                    id={key}
                    name={key}
                    label={field.label}
                    registration={register(key)}
                    placeholder={field.placeholder}
                    error={errors[key]?.message}
                    required
                    rows={4}
                  />
                ) : (
                  <Input
                    id={key}
                    name={key}
                    label={field.label}
                    type={field.type as 'text' | 'email' | 'tel'}
                    registration={register(key)}
                    placeholder={field.placeholder}
                    error={errors[key]?.message}
                    required
                  />
                )}
              </div>
            );
          })}
          <div className='md:col-span-2 flex flex-col items-center gap-2'>
            <Recaptcha
              ref={recaptchaRef}
              sitekey={publicEnv.recaptchaSiteKey}
              onChange={onTokenChange}
              onExpired={() => onTokenChange(null)}
            />
            {errors.recaptchaToken?.message && (
              <p className='text-sm text-red-300'>{errors.recaptchaToken.message}</p>
            )}
          </div>
          <div className='md:col-span-2 flex flex-col items-center gap-6 mt-2 md:mt-4'>
            <Button
              type='submit'
              variant='primary'
              size='lg'
              disabled={isSubmitting}
              hoverTransition='lift'
              className='w-full max-w-md mx-auto sm:max-w-lg'>
              {isSubmitting ? 'Sending...' : buttonText}
            </Button>

            {submitMessage.type && (
              <FormMessage type={submitMessage.type} text={submitMessage.text} />
            )}
          </div>
        </form>
      </div>
    </Section>
  );
};

export default LeadCaptureSection;
