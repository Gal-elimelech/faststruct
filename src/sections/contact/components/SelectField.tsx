'use client';

import React from 'react';

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  error?: string;
  required?: boolean;
  className?: string;
}

const SelectField = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  className = '',
}: SelectFieldProps) => {
  const baseInputClasses =
    'border-accent/50 bg-light/10 text-light placeholder-accent/70 focus:border-accent focus:ring-accent/50 w-full rounded-lg border p-4 focus:ring-2 appearance-none';
  const errorClasses = error ? 'border-red-500/50' : '';
  const inputClasses = `${baseInputClasses} ${errorClasses} ${className}`;

  return (
    <div className='relative'>
      <label htmlFor={id} className='text-h6 text-light mb-2 block font-medium'>
        {label}
      </label>
      <div className='relative'>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClasses}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className='bg-dark text-light font-poppins text-base rounded-none border-none hover:bg-accenthover:ring-accent/50'>
              {option.label}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-accent'>
          <svg className='h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </div>
      </div>
      {error && <p className='mt-1 text-sm text-red-400'>{error}</p>}
    </div>
  );
};

export default SelectField;
