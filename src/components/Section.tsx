import React, { RefObject } from 'react';
import { clsx } from 'clsx';
import { ColorsUnion } from '@/lib/css-constants';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  bgColor?: ColorsUnion;
  textColor?: ColorsUnion;
  ref?: RefObject<HTMLElement | null>;
}

export const Section = ({
  children,
  className = '',
  bgColor = 'dark',
  textColor = 'white',
  ref,
  ...props
}: SectionProps) => {
  const classes = clsx(
    'section-padding relative',
    `bg-${bgColor}`,
    `text-${textColor}`,
    className
  );

  return (
    <section className={classes} {...props} ref={ref}>
      {children}
    </section>
  );
};
