import type { UseFormRegisterReturn } from 'react-hook-form';
import { Input, Textarea } from '@/components/form';

type BaseFormFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  rows?: number;
  className?: string;
};

export type FormFieldProps =
  | (BaseFormFieldProps & {
      registration: UseFormRegisterReturn;
      value?: never;
      onChange?: never;
    })
  | (BaseFormFieldProps & {
      value: string;
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => void;
      registration?: never;
    });

const FormField = (props: FormFieldProps) => {
  const {
    id,
    name,
    label,
    type = 'text',
    placeholder,
    error,
    required = false,
    autoComplete,
    rows = 6,
    className,
  } = props;

  if (type === 'textarea') {
    if ('registration' in props && props.registration !== undefined) {
      return (
        <Textarea
          id={id}
          name={name}
          label={label}
          placeholder={placeholder}
          error={error}
          required={required}
          autoComplete={autoComplete}
          rows={rows}
          className={className}
          registration={props.registration}
        />
      );
    }

    return (
      <Textarea
        id={id}
        name={name}
        label={label}
        placeholder={placeholder}
        error={error}
        required={required}
        autoComplete={autoComplete}
        rows={rows}
        className={className}
        value={props.value}
        onChange={props.onChange}
      />
    );
  }

  if ('registration' in props && props.registration !== undefined) {
    return (
      <Input
        id={id}
        name={name}
        label={label}
        type={type}
        placeholder={placeholder}
        error={error}
        required={required}
        autoComplete={autoComplete}
        className={className}
        registration={props.registration}
      />
    );
  }

  return (
    <Input
      id={id}
      name={name}
      label={label}
      type={type}
      placeholder={placeholder}
      error={error}
      required={required}
      autoComplete={autoComplete}
      className={className}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default FormField;
