'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import FastructLogo from '../FastructLogo';
import { motion } from 'motion/react';
import { LandingCtaLink } from '@/sections/landing/components/LandingCtaLink';

interface LandingHeaderProps {
  phone: string;
  ctaLink: string;
}

export default function LandingHeader({ phone, ctaLink }: LandingHeaderProps) {
  const [showNavbar, setShowNavbar] = useState(true);
  const previousScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const directionDown = currentScrollY > previousScrollY.current;

      if (currentScrollY < 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(!directionDown);
      }

      previousScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className='fixed top-0 z-50 w-full bg-dark'
    >
      <div className='container-padding max-w-[1400px] mx-auto py-3 md:py-4 flex items-center justify-between gap-4'>
        <Link href='/'>
          <FastructLogo
            color='light'
            className='h-[35px]'
          />
        </Link>

        {/* <div className='flex items-center gap-2'>
          <LandingCtaLink
            href={`tel:${phone.replace(/\D/g, '')}`}
            size='md'
            linkClassName='inline-flex shrink-0'
            buttonClassName='inline-flex items-center justify-center gap-2'
          >
            <i className='fas fa-phone-alt' aria-hidden />
            <span>Call</span>
          </LandingCtaLink>

          <LandingCtaLink href={ctaLink} size='md' linkClassName='inline-flex shrink-0'>
            Free Estimate
          </LandingCtaLink>
        </div> */}
      </div>
    </motion.header>
  );
}
