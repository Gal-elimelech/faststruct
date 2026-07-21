'use client';

import { motion } from 'motion/react';
import { LandingCtaLink } from '@/sections/landing/components/LandingCtaLink';
import clsx from 'clsx';

interface StickyCTAProps {
  phone: string;
  /** Where the estimate button points; landing pages default to the on-page form. */
  estimateHref?: string;
  estimateText?: string;
  className?: string;
}

const StickyCTA = ({
  phone,
  estimateHref = '#lead-capture',
  estimateText = 'Free Estimate',
  className,
}: StickyCTAProps) => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ ease: 'easeInOut' }}
      className={clsx(
        'fixed bottom-0 left-0 right-0 z-30 bg-dark/95 backdrop-blur-md border-t border-white/10 shadow-2xl p-4 md:px-12 flex justify-between items-center',
        className
      )}
    >
          <div className='hidden md:block'>
            <p className='font-bebas text-2xl text-light uppercase tracking-widest'>
              Ready to build? <span className='text-accent'>Get started today.</span>
            </p>
          </div>

          <div className='flex gap-4 w-full md:w-auto'>
            <LandingCtaLink
              href={`tel:${phone.replace(/\D/g, '')}`}
              size='md'
              linkClassName='grow basis-1/2'
              buttonClassName='size-full'
              fullWidth
            >
              Call Us
            </LandingCtaLink>

            <LandingCtaLink
              href={estimateHref}
              size='md' linkClassName='grow basis-1/2'
              buttonClassName='text-nowrap'
              fullWidth
            >
              {estimateText}
            </LandingCtaLink>
          </div>
    </motion.div>
  );
};

export default StickyCTA;
