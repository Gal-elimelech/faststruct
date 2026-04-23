'use client';

import { motion } from 'motion/react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Button } from '@/components/Button';
import { Input, Textarea } from '@/components/form';
import FormMessage from './FormMessage';
import { IContactForm } from '@/types/contact';
import type { ContactFormInput } from '@/schemas/contact';

interface ContactFormProps {
  form: IContactForm;
  register: UseFormRegister<ContactFormInput>;
  errors: FieldErrors<ContactFormInput>;
  isSubmitting: boolean;
  submitMessage: {
    type: 'success' | 'error' | null;
    text: string;
  };
  isInView: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const ContactForm = ({
  form,
  register,
  errors,
  isSubmitting,
  submitMessage,
  isInView,
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
        <input type='hidden' {...register('source')} />
        <div className='flex flex-col gap-4'>
          <Input
            id='name'
            name='name'
            label={form.fields.name.label}
            type='text'
            registration={register('name')}
            placeholder={form.fields.name.placeholder}
            error={errors.name?.message}
            required
            autoComplete='name'
          />

          <Input
            id='email'
            name='email'
            label={form.fields.email.label}
            type='email'
            registration={register('email')}
            placeholder={form.fields.email.placeholder}
            error={errors.email?.message}
            required
            autoComplete='email'
          />

          <Input
            id='phone'
            name='phone'
            label={form.fields.phone.label}
            type='tel'
            registration={register('phone')}
            placeholder={form.fields.phone.placeholder}
            error={errors.phone?.message}
            required
            autoComplete='tel'
          />

          <Input
            id='address'
            name='address'
            label={form.fields.address.label}
            type='text'
            registration={register('address')}
            placeholder={form.fields.address.placeholder}
            error={errors.address?.message}
            required
            autoComplete='street-address'
          />

          <Textarea
            id='message'
            name='message'
            label={form.fields.message.label}
            registration={register('message')}
            placeholder={form.fields.message.placeholder}
            error={errors.message?.message}
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
