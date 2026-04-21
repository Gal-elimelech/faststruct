'use client';

import { useRef, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useInView } from 'motion/react';
import { Section } from '@/components/Section';
import ContactInfoSection from './components/ContactInfoSection';
import ContactForm from './components/ContactForm';
import { IContactForm, IContactInfo } from '@/types/contact';
import {
  contactFormSchema,
  type ContactFormData,
  type ContactFormInput,
} from '@/schemas/contact';

interface ContactFormSectionProps {
  form: IContactForm;
  info: IContactInfo;
}

const defaultValues: ContactFormInput = {
  name: '',
  email: '',
  phone: '',
  address: '',
  message: '',
  serviceType: undefined,
  source: 'contact',
};

const ContactFormSection = ({ form, info }: ContactFormSectionProps) => {
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string;
  }>({ type: null, text: '' });
  const sectionRef = useRef<HTMLFormElement>(null);
  const isFormInView = useInView(sectionRef, { once: true });

  const { register, handleSubmit, reset, setError, formState } = useForm<
    ContactFormInput,
    undefined,
    ContactFormData
  >({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const { errors, isSubmitting } = formState;

  const onValid: SubmitHandler<ContactFormData> = async (payload) => {
    setSubmitMessage({ type: null, text: '' });

    try {
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
            const key = detail.field as keyof ContactFormInput;
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
        text: 'Network error. Please try again.',
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
