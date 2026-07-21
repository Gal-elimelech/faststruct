'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ ease: 'easeInOut' }}
          className={clsx(
            'fixed bottom-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-t border-white/10 shadow-2xl p-4 md:px-12 flex justify-between items-center',
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
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
