'use client';

import { useState, useRef } from 'react';
import { Section } from '@/components/Section';
import { IFormConfig } from '@/types/landing';
import { Button } from '@/components/Button';
import FormField from '@/sections/contact/components/FormField';
import SelectField from '@/sections/contact/components/SelectField';
import FormMessage from '@/sections/contact/components/FormMessage';

const LeadCaptureSection = ({ title, subtitle, fields, buttonText }: IFormConfig) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'ADU Construction',
    message: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string;
  }>({ type: null, text: '' });

  const sectionRef = useRef<HTMLElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        body: JSON.stringify({
          ...formData,
          address: `Service Type: ${formData.serviceType}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
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

      setFormData({ name: '', email: '', phone: '', serviceType: 'ADU Construction', message: '' });
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

  const serviceOptions = [
    { label: 'ADU Construction', value: 'ADU Construction' },
    { label: 'Modular Homes', value: 'Modular Homes' },
    { label: 'New Home Construction', value: 'New Home Construction' },
    { label: 'Panelized Construction', value: 'Panelized Construction' },
  ];

  // Map field config to state keys
  const fieldKeys = ['name', 'phone', 'email', 'serviceType', 'message'];

  return (
    <Section
      id="lead-capture"
      ref={sectionRef}
      bgColor='dark'
      textColor='light'
      className='py-32 relative overflow-hidden'
    >
      {/* Background Accent */}
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

        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 bg-white/[0.03] p-8 md:p-20 border border-white/5 rounded-sm backdrop-blur-xl relative overflow-hidden'>
          {/* Subtle Industrial Lines */}
          <div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent' />

          {fields.map((field, idx) => {
            const key = fieldKeys[idx] as keyof typeof formData;

            if (key === 'serviceType') {
              return (
                <SelectField
                  key={key}
                  id={key}
                  name={key}
                  label={field.label}
                  value={formData[key]}
                  onChange={handleChange}
                  options={serviceOptions}
                />
              );
            }

            return (
              <div key={key} className={key === 'message' ? 'md:col-span-2' : ''}>
                <FormField
                  id={key}
                  name={key}
                  label={field.label}
                  type={field.type as any}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  error={fieldErrors[key]}
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
              className='w-full md:w-80'
            >
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
