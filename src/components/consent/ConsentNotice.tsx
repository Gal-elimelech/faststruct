'use client';

import Link from 'next/link';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import type { IConsentContent } from '@/types/consent';

interface ConsentNoticeProps {
  consent: IConsentContent;
  checkboxRegistration: UseFormRegisterReturn;
  error?: FieldError;
  checkboxId: string;
  errorClassName?: string;
  className?: string;
}

export default function ConsentNotice({
  consent,
  checkboxRegistration,
  error,
  checkboxId,
  errorClassName = 'text-red-500',
  className = '',
}: ConsentNoticeProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`.trim()}>
      <label
        htmlFor={checkboxId}
        className='flex items-start gap-3 text-sm text-light/90'>
        <input
          id={checkboxId}
          type='checkbox'
          className='mt-1 size-4 shrink-0 rounded border-white/40 bg-transparent accent-accent'
          {...checkboxRegistration}
        />
        <span>
          {consent.label}{' '}
          <Link
            target='_blank'
            href={consent.privacyPolicyHref}
            className='underline underline-offset-4 hover:text-accent transition-colors'>
            {consent.privacyPolicyLabel}
          </Link>
          .
        </span>
      </label>
      {error?.message && (
        <p className={`text-sm ${errorClassName}`.trim()}>{error.message}</p>
      )}
      <p className='text-xs text-light/70'>{consent.disclaimer}</p>
      <details className='text-xs text-light/70'>
        <summary className='cursor-pointer select-none text-light/80 hover:text-accent transition-colors'>
          {consent.readMoreLabel}
        </summary>
        <div className='mt-2 space-y-2'>
          <p>{consent.readMoreIntro}</p>
          <ul className='list-disc pl-5 space-y-1'>
            {consent.readMoreItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{consent.readMoreFrequency}</p>
          <p>{consent.readMoreRates}</p>
          <p>{consent.readMoreOptOut}</p>
          <p>{consent.readMoreHelp}</p>
          <p>
            {consent.readMorePrivacyText}{' '}
            <Link
              href={consent.privacyPolicyHref}
              className='underline underline-offset-4 hover:text-accent transition-colors'>
              {consent.privacyPolicyLabel}
            </Link>
            .
          </p>
        </div>
      </details>
    </div>
  );
}
