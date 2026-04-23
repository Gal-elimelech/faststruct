'use client';

import Image from 'next/image';
import { ILandingHero } from '@/types/landing';
import { motion } from 'motion/react';
import { LandingCtaLink } from '@/sections/landing/components/LandingCtaLink';

const HeroLandingSection: React.FC<ILandingHero> = ({
  title,
  subtitle,
  licenses,
  cta,
  phoneCta,
  googleReviewBadge,
  backgroundImage,
}) => {
  return (
    <section className='relative w-full min-h-[110vh] bg-dark flex items-center justify-center py-20'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className='object-cover'
        />
      </div>

      {/* Centered Content Card */}
      <div className='container-padding relative z-10 w-full flex justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className='max-w-4xl w-full bg-dark/60 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-sm text-center flex flex-col items-center gap-6'
        >
          <div className='flex flex-col gap-4'>
            <h1 className='text-h1 md:text-h2 lg:text-[5rem] font-bebas text-white uppercase leading-[0.85] tracking-normal'>
              {title}
            </h1>

            <p className='text-h6 font-poppins text-white max-w-2xl mx-auto leading-tight'>
              {subtitle}
            </p>
          </div>
          {/* Licenses */}
          <div className='flex flex-wrap items-center justify-center gap-8 py-4 border-y border-white/10 w-full max-w-lg'>
            <h3 className='text-h6 font-bebas text-white uppercase tracking-widest leading-none'>Licenses:</h3>
            {licenses.map((license, idx) => (
              <div key={idx} className='flex flex-col items-center'>
                <span className='text-[10px] text-accent font-bold tracking-[0.2em] uppercase mb-1'>{license.label}</span>
                <span className='text-white font-bebas text-lg tracking-widest leading-none'>
                  #{license.number}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto justify-stretch sm:justify-center'>
            <LandingCtaLink
              href={cta.link}
              surface='hero'
              size='md'
              linkClassName='w-full sm:w-auto min-w-0 sm:min-w-[12rem]'
            >
              {cta.text}
            </LandingCtaLink>
            <LandingCtaLink
              href={phoneCta.link}
              surface='hero'
              size='md'
              linkClassName='w-full sm:w-auto min-w-0 sm:min-w-[12rem]'
            >
              {phoneCta.text}
            </LandingCtaLink>
          </div>


          {/* Floating Google Review Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className='relative w-full'>
              <Image
                src={googleReviewBadge}
                alt='Google Reviews'
                width={52 * 5}
                height={52 * 5}
                className='object-contain'
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Technical Spec Indicator (Bottom Right) */}
      {/* <div className='absolute bottom-10 right-10 hidden lg:flex flex-col gap-4 items-end z-20'>
        <div className='bg-dark/40 backdrop-blur-sm border border-white/10 p-3 rounded-sm flex items-center gap-3'>
          <div className='w-2 h-2 rounded-full bg-accent animate-pulse' />
          <span className='text-[10px] font-bebas text-white uppercase tracking-[0.3em]'>System-9 Tech Enabled</span>
        </div>
      </div> */}
    </section>
  );
};

export default HeroLandingSection;
