import { fieldControlClasses, FieldShell } from '@/components/form/Field';

type BaseInputProps = {
  id: string;
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
  containerClassName?: string;
};

type RegisteredInputProps = BaseInputProps & {
  registration: Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'id'>;
  value?: never;
  onChange?: never;
};

type ControlledInputProps = BaseInputProps & {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  registration?: never;
};

export type InputProps = RegisteredInputProps | ControlledInputProps;

export function Input(props: InputProps) {
  const {
    id,
    name,
    label,
    type = 'text',
    placeholder,
    error,
    hint,
    required = false,
    autoComplete,
    className,
    containerClassName,
  } = props;

  const inputProps =
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
      <input
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={fieldControlClasses({ error, className })}
        {...inputProps}
      />
    </FieldShell>
  );
}
