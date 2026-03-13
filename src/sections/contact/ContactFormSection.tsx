'use client';

import { useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { Section } from '@/components/Section';
import ContactInfoSection from './components/ContactInfoSection';
import ContactForm from './components/ContactForm';
import { IContactForm, IContactInfo } from '@/types/contact';

interface ContactFormSectionProps {
  form: IContactForm;
  info: IContactInfo;
}

const ContactFormSection = ({ form, info }: ContactFormSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string;
  }>({ type: null, text: '' });
  const sectionRef = useRef<HTMLFormElement>(null);
  const isFormInView = useInView(sectionRef, { once: true });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });

    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: null, text: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details && Array.isArray(data.details)) {
          const errors: Record<string, string> = {};
          data.details.forEach((detail: { field: string; message: string }) => {
            errors[detail.field] = detail.message;
          });
          setFieldErrors(errors);
        }

        setSubmitMessage({
          type: 'error',
          text: data.error || 'Failed to send message',
        });
        return;
      }

      setSubmitMessage({
        type: 'success',
        text: data.message || 'Message sent successfully!',
      });

      setFormData({ name: '', email: '', phone: '', address: '', message: '' });
      setFieldErrors({});
    } catch {
      setSubmitMessage({
        type: 'error',
        text: 'Network error. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      ref={sectionRef}
      bgColor='dark'
      textColor='light'
      className='-my-10'>
      <div className='container mx-auto'>
        <div className='grid gap-12 md:grid-cols-2 md:gap-16'>
          <ContactInfoSection form={form} info={info} isInView={isFormInView} />
          <ContactForm
            form={form}
            formData={formData}
            fieldErrors={fieldErrors}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
            isInView={isFormInView}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </Section>
  );
};

export default ContactFormSection;
