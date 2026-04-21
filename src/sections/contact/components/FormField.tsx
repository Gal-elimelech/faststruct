import type { UseFormRegisterReturn } from 'react-hook-form';

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
    className = '',
  } = props;

  const baseInputClasses =
    'border-accent/50 bg-light/10 text-light placeholder-accent/70 focus:border-accent focus:ring-accent/50 w-full rounded-lg border p-4 focus:ring-2';
  const errorClasses = error ? 'border-red-500/50' : '';
  const inputClasses = `${baseInputClasses} ${errorClasses} ${className}`;

  const registered =
    'registration' in props && props.registration !== undefined;

  const inputRegistration = registered
    ? { ...props.registration, name }
    : null;

  return (
    <div className={type === 'textarea' ? '' : 'relative'}>
      <label htmlFor={id} className='text-h6 text-light mb-2 block font-medium'>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          required={required}
          rows={rows}
          autoComplete={autoComplete}
          className={`${inputClasses} resize-none`}
          placeholder={placeholder}
          {...(registered && inputRegistration
            ? inputRegistration
            : {
                name,
                value: props.value,
                onChange: props.onChange,
              })}
        />
      ) : (
        <input
          type={type}
          id={id}
          required={required}
          autoComplete={autoComplete}
          className={inputClasses}
          placeholder={placeholder}
          {...(registered && inputRegistration
            ? inputRegistration
            : {
                name,
                value: props.value,
                onChange: props.onChange,
              })}
        />
      )}
      {error && <p className='mt-1 text-sm text-red-400'>{error}</p>}
    </div>
  );
};

export default FormField;
