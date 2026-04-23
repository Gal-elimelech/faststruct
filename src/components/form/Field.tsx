import clsx from 'clsx';

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
};

const baseControlClasses =
  'w-full rounded-lg border p-4 focus:ring-2 transition-colors border-accent/50 bg-light/10 text-light placeholder-accent/70 focus:border-accent focus:ring-accent/50';

export const fieldControlClasses = ({
  error,
  className,
  extraClasses,
}: {
  error?: string;
  className?: string;
  extraClasses?: string;
}) =>
  clsx(
    baseControlClasses,
    error && 'border-red-500/50',
    extraClasses,
    className
  );

export function FieldShell({
  id,
  label,
  required = false,
  error,
  hint,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className='text-h6 text-light mb-2 block font-medium'>
        {label}
        {required ? <span className='ml-1 text-accent'>*</span> : null}
      </label>
      {children}
      {error ? <p className='mt-1 text-sm text-red-400'>{error}</p> : null}
      {!error && hint ? <p className='mt-1 text-sm text-light/70'>{hint}</p> : null}
    </div>
  );
}
