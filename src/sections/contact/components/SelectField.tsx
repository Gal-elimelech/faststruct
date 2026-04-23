'use client';

import React from 'react';
import { Select } from '@/components/form';

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

const SelectField = (props: SelectFieldProps) => {
  const {
    id,
    name,
    label,
    options,
    error,
    required = false,
    className = '',
  } = props;

  const registered =
    'registration' in props && props.registration !== undefined;

  if (registered) {
    return (
      <Select
        id={id}
        name={name}
        label={label}
        options={options}
        error={error}
        required={required}
        className={className}
        registration={props.registration}
      />
    );
  }

  return (
    <Select
      id={id}
      name={name}
      label={label}
      options={options}
      error={error}
      required={required}
      className={className}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default SelectField;
