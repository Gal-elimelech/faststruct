'use client';

import { useRef, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useInView } from 'motion/react';
import { Section } from '@/components/Section';
import ContactInfoSection from './components/ContactInfoSection';
import ContactForm from './components/ContactForm';
import { IContactForm, IContactInfo } from '@/types/contact';
import type { IConsentContent } from '@/types/consent';
import {
  contactPageFormSchema,
  type ContactPageFormInput,
  toContactSubmission,
} from '@/schemas/contact';
import { useRecaptchaEnterprise } from '@/hooks/useRecaptchaEnterprise';

interface ContactFormSectionProps {
  form: IContactForm;
  consent: IConsentContent;
  info: IContactInfo;
}

const defaultValues: ContactPageFormInput = {
  name: '',
  email: '',
  phone: '',
  address: '',
  message: '',
  contactConsent: false,
};

const ContactFormSection = ({ form, consent, info }: ContactFormSectionProps) => {
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string;
  }>({ type: null, text: '' });
  const sectionRef = useRef<HTMLFormElement>(null);
  const isFormInView = useInView(sectionRef, { once: true });

  const { register, handleSubmit, reset, setError, formState } = useForm<
    ContactPageFormInput,
    undefined,
    ContactPageFormInput
  >({
    resolver: zodResolver(contactPageFormSchema),
    defaultValues,
  });

  const { errors, isSubmitting } = formState;
  const { getRecaptchaToken } = useRecaptchaEnterprise();

  const onValid: SubmitHandler<ContactPageFormInput> = async (values) => {
    setSubmitMessage({ type: null, text: '' });

    try {
      const recaptchaToken = await getRecaptchaToken('contact');
      const payload = {
        ...toContactSubmission(values),
        recaptchaToken,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details && Array.isArray(result.details)) {
          for (const detail of result.details as {
            field: string;
            message: string;
          }[]) {
            const key = detail.field as keyof ContactPageFormInput;
            if (key in defaultValues) {
              setError(key, { message: detail.message });
            }
          }
        }

        setSubmitMessage({
          type: 'error',
          text: result.error || 'Failed to send message',
        });
        return;
      }

      setSubmitMessage({
        type: 'success',
        text: result.message || 'Message sent successfully!',
      });

      reset(defaultValues);
    } catch {
      setSubmitMessage({
        type: 'error',
        text: 'Unable to verify submission. Please try again.',
      });
    }
  };

  return (
    <Section ref={sectionRef} bgColor='dark' textColor='light' className='-my-10'>
      <div className='container mx-auto'>
        <div className='grid gap-12 md:grid-cols-2 md:gap-16'>
          <ContactInfoSection form={form} info={info} isInView={isFormInView} />
          <ContactForm
            form={form}
            consent={consent}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
            isInView={isFormInView}
            onSubmit={handleSubmit(onValid)}
          />
        </div>
      </div>
    </Section>
  );
};

export default ContactFormSection;
