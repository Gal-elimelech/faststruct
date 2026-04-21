'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import FastructLogo from '../FastructLogo';
import { Button } from '../Button';
import { motion } from 'motion/react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface LandingHeaderProps {
  phone: string;
  ctaLink: string;
}

export default function LandingHeader({ phone, ctaLink }: LandingHeaderProps) {
  const [showNavbar, setShowNavbar] = useState(true);
  const isMobile = useIsMobile();
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
      className='fixed top-0 z-50 w-full bg-dark/90 backdrop-blur-md border-b border-white/10'
    >
      <div className='container-padding max-w-[1400px] mx-auto py-3 md:py-4 flex items-center justify-between gap-4'>
        <Link href='/'>
          <FastructLogo
            color='light'
            className='h-[20px] md:h-[35px] lg:h-[40px]'
          />
        </Link>

        <div className='flex items-center gap-2'>
          <Link
            href={`tel:${phone.replace(/\D/g, '')}`}
          >
            <Button variant='secondary' size={isMobile ? 'sm' : 'md'} hoverTransition='lift' className='flex items-center gap-2'>
              <i className='fas fa-phone-alt '></i>
              <span>Call: {phone}</span>
            </Button>

          </Link>

          <Link href={ctaLink}>
            <Button
              variant='primary'
              size={isMobile ? 'sm' : 'md'}
              hoverTransition='lift'
            >
              Free Estimate
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
