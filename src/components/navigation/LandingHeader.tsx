'use client';

import Link from 'next/link';
import FastructLogo from '../FastructLogo';
import { LandingCtaLink } from '@/sections/landing/components/LandingCtaLink';

interface LandingHeaderProps {
  phone: string;
  phoneLink: string;
  ctaLink: string;
  ctaText: string;
}

export default function LandingHeader({
  phone,
  phoneLink,
  ctaLink,
  ctaText,
}: LandingHeaderProps) {
  return (
    <header className='fixed top-0 z-50 w-full bg-dark border-b border-white/10'>
      <div className='container-padding mx-auto py-3 md:py-4 flex items-center justify-between gap-3'>
        <Link href='/' className='shrink-0'>
          <FastructLogo
            color='light'
            className='h-[25px] md:h-[35px] lg:h-[40px]'
          />
        </Link>

        <div className='flex items-center gap-2 md:gap-3'>
          <LandingCtaLink href={phoneLink} surface='dark' size='sm'>
            <span className='hidden sm:inline'>{phone}</span>
            <span className='sm:hidden'>Call</span>
          </LandingCtaLink>

          <div className='hidden md:block'>
            <LandingCtaLink href={ctaLink} surface='dark' size='sm'>
              {ctaText}
            </LandingCtaLink>
          </div>
        </div>
      </div>
    </header>
  );
}
