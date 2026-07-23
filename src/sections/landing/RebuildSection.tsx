'use client';

import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { IRebuildSection } from '@/types/landing';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { LandingCtaLink } from '@/sections/landing/components/LandingCtaLink';

const RebuildSection: React.FC<IRebuildSection> = ({
  eyebrow,
  title,
  texts,
  bulletPoints,
  image,
  imageTag,
  cta,
}) => {
  return (
    <section className='relative bg-dark text-light px-4 md:px-8 lg:px-16 py-14 md:py-20 lg:py-24 border-t border-white/5'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
        <div className='relative w-full rounded-sm overflow-hidden order-1 lg:order-none min-h-[300px] lg:min-h-[460px]'>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes='(max-width: 1024px) 100vw, 50vw'
            className='object-cover'
          />
          <span className='absolute left-4 bottom-4 bg-dark/80 backdrop-blur-sm border border-white/10 rounded-sm px-4 py-2 font-poppins text-[11px] tracking-[0.14em] uppercase text-light'>
            {imageTag}
          </span>
        </div>

        <div className='flex flex-col gap-6'>
          <span className='text-[10px] text-[#d97a52] font-bold tracking-[0.28em] uppercase font-poppins'>
            {eyebrow}
          </span>
          <AnimatedHeading
            text={title}
            className='text-h2 font-bebas text-light uppercase leading-[0.9]'
            revealColor='dark'
          />
          <div className='flex flex-col gap-3'>
            {texts.map((t, i) => (
              <p
                key={i}
                className='text-light/75 font-poppins leading-relaxed max-w-xl'
              >
                {t}
              </p>
            ))}
          </div>

          <div className='grid gap-3 mt-2'>
            {bulletPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: idx * 0.07,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                className='flex items-start gap-3'
              >
                <span className='w-6 h-6 rounded-sm bg-[#c4502e]/15 flex items-center justify-center shrink-0 mt-0.5'>
                  <Check size={14} className='text-[#d97a52]' aria-hidden />
                </span>
                <p className='font-poppins text-sm md:text-base text-light/85'>
                  <span className='font-semibold text-light'>{point.title}</span>{' '}
                  {point.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className='mt-4'>
            <LandingCtaLink href={cta.link} linkClassName='inline-block w-full sm:w-auto'>
              {cta.text}
            </LandingCtaLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RebuildSection;
