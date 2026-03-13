'use client';

import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { clsx } from 'clsx';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = (
  props: React.ComponentPropsWithRef<typeof AccordionPrimitive.Item>
) => (
  <AccordionPrimitive.Item
    className={clsx('border-light/20 border-b', props.className)}
    {...props}
  />
);

const AccordionTrigger = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>) => (
  <AccordionPrimitive.Header className='flex'>
    <AccordionPrimitive.Trigger
      className={clsx(
        'font-poppins text-light flex flex-1 items-center justify-between py-4 text-lg transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className='h-4 w-4 shrink-0 transition-transform duration-200' />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

const AccordionContent = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content
    className={clsx(
      'text-light/80 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-base transition-all',
      className
    )}
    {...props}
  >
    <div className='pt-0 pb-4'>{children}</div>
  </AccordionPrimitive.Content>
);

// A simple chevron icon. You can replace this with a library like lucide-react.
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='m6 9 6 6 6-6' />
  </svg>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
