import { fieldControlClasses, FieldShell } from '@/components/form/Field';

type BaseTextareaProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  autoComplete?: string;
  rows?: number;
  className?: string;
  containerClassName?: string;
};

type RegisteredTextareaProps = BaseTextareaProps & {
  registration: Omit<React.ComponentPropsWithoutRef<'textarea'>, 'id'>;
  value?: never;
  onChange?: never;
};

type ControlledTextareaProps = BaseTextareaProps & {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  registration?: never;
};

export type TextareaProps = RegisteredTextareaProps | ControlledTextareaProps;

export function Textarea(props: TextareaProps) {
  const {
    id,
    name,
    label,
    placeholder,
    error,
    hint,
    required = false,
    autoComplete,
    rows = 4,
    className,
    containerClassName,
  } = props;

  const textareaProps =
    'registration' in props
      ? { ...props.registration, id, name }
      : { id, name, value: props.value, onChange: props.onChange };

  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={containerClassName}
    >
      <textarea
        required={required}
        autoComplete={autoComplete}
        rows={rows}
        placeholder={placeholder}
        className={fieldControlClasses({ error, className, extraClasses: 'resize-none' })}
        {...textareaProps}
      />
    </FieldShell>
  );
}
