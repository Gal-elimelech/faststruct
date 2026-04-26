import { fieldControlClasses, FieldShell } from '@/components/form/Field';

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type BaseSelectProps = {
  id: string;
  name: string;
  label: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  containerClassName?: string;
};

type RegisteredSelectProps = BaseSelectProps & {
  registration: Omit<React.ComponentPropsWithoutRef<'select'>, 'id'>;
  value?: never;
  onChange?: never;
};

type ControlledSelectProps = BaseSelectProps & {
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  registration?: never;
};

export type SelectProps = RegisteredSelectProps | ControlledSelectProps;

export function Select(props: SelectProps) {
  const {
    id,
    name,
    label,
    options,
    error,
    hint,
    required = false,
    className,
    containerClassName,
  } = props;

  const selectProps =
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
      <div className='relative'>
        <select
          required={required}
          className={fieldControlClasses({
            error,
            className,
            extraClasses: 'appearance-none pr-10',
          })}
          {...selectProps}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className='bg-dark text-light'
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-accent'>
          <svg
            className='h-4 w-4 fill-current'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            aria-hidden='true'
            focusable='false'>
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </div>
      </div>
    </FieldShell>
  );
}
