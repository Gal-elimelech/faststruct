import React from 'react';
import clsx from 'clsx';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  hoverTransition?: 'lift' | 'scale' | '';
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  hoverTransition = '',
  ...props
}: IButtonProps) => {
  const classes = clsx(
    'btn',
    {
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
      'btn-outline': variant === 'outline',
    },
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
