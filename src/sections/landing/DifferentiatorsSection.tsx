'use client';

import { Section } from '@/components/Section';
import { IDifferentiators } from '@/types/landing';
import { motion } from 'motion/react';
import { LandingCtaLink } from '@/sections/landing/components/LandingCtaLink';

const DifferentiatorsSection: React.FC<IDifferentiators> = ({ title, items, cta }) => {
  return (
    <Section bgColor='dark' textColor='light' className='relative'>
      <div className='flex flex-col gap-14 md:gap-18'>
        <div className='flex flex-col md:flex-row justify-between items-end gap-8'>
          <div className='max-w-4xl'>
            <h2 className='text-h2 font-bebas text-light uppercase leading-[0.85]'>
              {title}
            </h2>
          </div>

          <LandingCtaLink href={cta.link} linkClassName='mb-2 shrink-0'>
            {cta.text}
          </LandingCtaLink>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 overflow-hidden'>
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className='flex flex-col gap-12 bg-dark p-12 hover:bg-white/2 group'
            >
              <div className='flex justify-between items-start'>
                <span className='font-bebas text-accent text-3xl tracking-widest'>0{idx + 1}</span>
              </div>

              <div className='flex flex-col gap-6'>
                <h3 className='text-h4 font-bebas text-light uppercase tracking-widest leading-tight group-hover:text-accent transition-colors'>
                  {item.title}
                </h3>
                <p className='text-light/60 font-poppins text-base leading-relaxed'>
                  {item.text}
                </p>
              </div>

              <div className='mt-auto pt-8'>
                <div className='w-full h-px bg-linear-to-r from-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left' />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default DifferentiatorsSection;
