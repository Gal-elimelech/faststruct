interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  rows?: number;
  className?: string;
}

const FormField = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  autoComplete,
  rows = 6,
  className = '',
}: FormFieldProps) => {
  const baseInputClasses =
    'border-accent/50 bg-light/10 text-light placeholder-accent/70 focus:border-accent focus:ring-accent/50 w-full rounded-lg border p-4 focus:ring-2';
  const errorClasses = error ? 'border-red-500/50' : '';
  const inputClasses = `${baseInputClasses} ${errorClasses} ${className}`;

  return (
    <div className={type === 'textarea' ? '' : 'relative'}>
      <label htmlFor={id} className='text-h6 text-light mb-2 block font-medium'>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          autoComplete={autoComplete}
          className={`${inputClasses} resize-none`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          className={inputClasses}
          placeholder={placeholder}
        />
      )}
      {error && <p className='mt-1 text-sm text-red-400'>{error}</p>}
    </div>
  );
};

export default FormField;
