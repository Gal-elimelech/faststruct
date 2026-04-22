import React from 'react';
import clsx from 'clsx';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  /** When `variant` is `outline`, picks look for marketing call buttons on dark vs hero surfaces. */
  outlineTone?: 'default' | 'hero' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  hoverTransition?: 'lift' | 'scale' | '';
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  outlineTone = 'default',
  size = 'md',
  hoverTransition = '',
  ...props
}: IButtonProps) => {
  const outlineClass =
    variant === 'outline'
      ? outlineTone === 'hero'
        ? 'btn-outline-call-hero'
        : outlineTone === 'dark'
          ? 'btn-outline-call-dark'
          : 'btn-outline'
      : null;

  const classes = clsx(
    'btn',
    {
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
    },
    outlineClass,
    {
      'btn-sm': size === 'sm',
      'btn-md': size === 'md',
      'btn-lg': size === 'lg',
    },
    {
      'btn-hover-lift': hoverTransition === 'lift',
      'btn-hover-scale': hoverTransition === 'scale',
    },
    className
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
