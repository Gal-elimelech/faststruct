'use client';

import { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Section } from '@/components/Section';
import { IFormConfig } from '@/types/landing';
import { Button } from '@/components/Button';
import FormField from '@/sections/contact/components/FormField';
import SelectField from '@/sections/contact/components/SelectField';
import FormMessage from '@/sections/contact/components/FormMessage';
import {
  LEAD_SERVICE_TYPES,
  leadCaptureFormSchema,
  type LeadCaptureFormInput,
} from '@/schemas/contact';

const defaultValues: LeadCaptureFormInput = {
  name: '',
  phone: '',
  email: '',
  address: '',
  serviceType: 'ADU Construction',
  message: '',
  source: 'landing',
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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadCaptureFormInput>({
    resolver: zodResolver(leadCaptureFormSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitMessage({ type: null, text: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
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
    } catch {
      setSubmitMessage({
        type: 'error',
        text: 'Network error. Please try again.',
      });
    }
  });

  return (
    <Section
      id='lead-capture'
      ref={sectionRef}
      bgColor='dark'
      textColor='light'
      className='py-32 relative overflow-hidden'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[150px] pointer-events-none' />

      <div className='max-w-5xl mx-auto relative z-10'>
        <div className='text-center mb-20 max-w-3xl mx-auto'>
          <h2 className='text-h2 md:text-[4.5rem] font-bebas text-light uppercase leading-[0.85] mb-8'>
            {title}
          </h2>
          <p className='text-lg md:text-xl text-cream/70 font-poppins leading-relaxed'>
            {subtitle}
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 bg-white/[0.03] p-8 md:p-20 border border-white/5 rounded-sm backdrop-blur-xl relative overflow-hidden'>
          <input type='hidden' {...register('source')} />
          <input type='hidden' {...register('address')} />
          <div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent' />

          {fields.map((field) => {
            const key = field.fieldKey;

            if (key === 'serviceType') {
              return (
                <Controller
                  key={key}
                  name='serviceType'
                  control={control}
                  render={({ field: controllerField }) => (
                    <SelectField
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
              );
            }

            return (
              <div
                key={key}
                className={key === 'message' ? 'md:col-span-2' : ''}>
                <FormField
                  id={key}
                  name={key}
                  label={field.label}
                  type={field.type as 'text' | 'email' | 'tel' | 'textarea'}
                  registration={register(key)}
                  placeholder={field.placeholder}
                  error={errors[key]?.message}
                  required
                  rows={key === 'message' ? 4 : undefined}
                />
              </div>
            );
          })}

          <div className='md:col-span-2 flex flex-col items-center gap-6 mt-8'>
            <Button
              type='submit'
              variant='primary'
              size='lg'
              disabled={isSubmitting}
              hoverTransition='lift'
              className='w-full md:w-80'>
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
