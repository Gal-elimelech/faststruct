'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/Button';
import FormField from './FormField';
import FormMessage from './FormMessage';
import { IContactForm } from '@/types/contact';

interface ContactFormProps {
  form: IContactForm;
  formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
  };
  fieldErrors: Record<string, string>;
  isSubmitting: boolean;
  submitMessage: {
    type: 'success' | 'error' | null;
    text: string;
  };
  isInView: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ContactForm = ({
  form,
  formData,
  fieldErrors,
  isSubmitting,
  submitMessage,
  isInView,
  onChange,
  onSubmit,
}: ContactFormProps) => {
  return (
    <div className='sticky top-0 h-min w-full'>
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4'>
          <FormField
            id='name'
            name='name'
            label={form.fields.name.label}
            type='text'
            value={formData.name}
            onChange={onChange}
            placeholder={form.fields.name.placeholder}
            error={fieldErrors.name}
            required
            autoComplete='name'
          />

          <FormField
            id='email'
            name='email'
            label={form.fields.email.label}
            type='email'
            value={formData.email}
            onChange={onChange}
            placeholder={form.fields.email.placeholder}
            error={fieldErrors.email}
            required
            autoComplete='email'
          />

          <FormField
            id='phone'
            name='phone'
            label={form.fields.phone.label}
            type='tel'
            value={formData.phone}
            onChange={onChange}
            placeholder={form.fields.phone.placeholder}
            error={fieldErrors.phone}
            required
            autoComplete='tel'
          />

          <FormField
            id='address'
            name='address'
            label={form.fields.address.label}
            type='text'
            value={formData.address}
            onChange={onChange}
            placeholder={form.fields.address.placeholder}
            error={fieldErrors.address}
            required
            autoComplete='street-address'
          />

          <FormField
            id='message'
            name='message'
            label={form.fields.message.label}
            type='textarea'
            value={formData.message}
            onChange={onChange}
            placeholder={form.fields.message.placeholder}
            error={fieldErrors.message}
            required
            rows={6}
          />
        </div>

        <Button
          type='submit'
          variant='primary'
          size='lg'
          hoverTransition='lift'
          disabled={isSubmitting}
          className='w-full md:w-auto'>
          {isSubmitting ? form.submittingButton : form.submitButton}
        </Button>

        {submitMessage.type && (
          <FormMessage type={submitMessage.type} text={submitMessage.text} />
        )}
      </motion.form>
    </div>
  );
};

export default ContactForm;
