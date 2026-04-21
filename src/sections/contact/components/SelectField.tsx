'use client';

import React, { forwardRef } from 'react';

type BaseSelectFieldProps = {
  id: string;
  name: string;
  label: string;
  options: { label: string; value: string }[];
  error?: string;
  required?: boolean;
  className?: string;
};

export type SelectFieldProps =
  | (BaseSelectFieldProps & {
      registration: React.ComponentPropsWithoutRef<'select'>;
      value?: never;
      onChange?: never;
    })
  | (BaseSelectFieldProps & {
      value: string;
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
      registration?: never;
    });

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (props, forwardedRef) => {
    const {
      id,
      name,
      label,
      options,
      error,
      required = false,
      className = '',
    } = props;

    const baseInputClasses =
      'border-accent/50 bg-light/10 text-light placeholder-accent/70 focus:border-accent focus:ring-accent/50 w-full rounded-lg border p-4 focus:ring-2 appearance-none';
    const errorClasses = error ? 'border-red-500/50' : '';
    const inputClasses = `${baseInputClasses} ${errorClasses} ${className}`;

    const registered =
      'registration' in props && props.registration !== undefined;

    const selectProps = registered
      ? { ...props.registration, name, id }
      : {
          name,
          id,
          ref: forwardedRef,
          value: props.value,
          onChange: props.onChange,
        };

    return (
      <div className='relative'>
        <label htmlFor={id} className='text-h6 text-light mb-2 block font-medium'>
          {label}
        </label>
        <div className='relative'>
          <select required={required} className={inputClasses} {...selectProps}>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className='bg-dark text-light font-poppins text-base rounded-none border-none hover:bg-accenthover:ring-accent/50'>
                {option.label}
              </option>
            ))}
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-accent'>
            <svg
              className='h-4 w-4 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'>
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
        {error && <p className='mt-1 text-sm text-red-400'>{error}</p>}
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';

export default SelectField;
