'use client';

import { IFooter } from '@/types/landing';
import FastructLogo from '../FastructLogo';
import Link from 'next/link';
import { LandingCtaLink } from '@/sections/landing/components/LandingCtaLink';

const LandingFooter: React.FC<IFooter> = ({ title, subtitle, licenses, cta, phoneCta, address }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-dark text-white py-20 border-t border-white/10'>
      <div className='container-padding max-w-[1400px] mx-auto'>
        <div className='flex flex-col md:flex-row justify-between gap-20'>
          <div className='flex flex-col gap-10 max-w-xl'>
            <div className='flex flex-col gap-6'>
              <FastructLogo color='light' className='h-10 w-auto' />
              <h2 className='text-h3 font-bebas uppercase leading-none text-light'>{title}</h2>
              <p className='text-cream/60 font-poppins text-lg leading-relaxed'>
                {subtitle}
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-3'>
              <LandingCtaLink href={cta.link} linkClassName='w-full sm:w-auto'>
                {cta.text}
              </LandingCtaLink>
              <LandingCtaLink href={phoneCta.link} linkClassName='w-full sm:w-auto'>
                Call: {phoneCta.text}
              </LandingCtaLink>
            </div>
          </div>

          <div className='flex flex-col gap-12 min-w-[300px]'>
            <div className='flex flex-col gap-6'>
              <p className='text-accent font-bebas text-xl uppercase tracking-widest'>Office & Factory</p>
              <div className='flex items-start gap-3'>
                <i className='fas fa-map-marker-alt text-accent mt-1'></i>
                <span className='text-cream/80 text-lg leading-tight'>{address}</span>
              </div>
            </div>

            <div className='flex flex-col gap-6'>
              <p className='text-accent font-bebas text-xl uppercase tracking-widest'>Licensing</p>
              <div className='flex flex-col gap-3'>
                {licenses.map((lic, idx) => (
                  <p key={idx} className='text-cream/50 text-sm tracking-widest uppercase'>
                    {lic.label} #{lic.number}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/30 uppercase tracking-[0.2em]'>
          <p>© {currentYear} Fast Struct Inc. All Rights Reserved.</p>
          <div className='flex gap-8'>
            <Link href="#" className='hover:text-accent transition-colors'>Privacy Policy</Link>
            <Link href="#" className='hover:text-accent transition-colors'>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
