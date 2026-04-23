'use client';

import { Section } from '@/components/Section';
import { IDifferentiators } from '@/types/landing';
import { motion } from 'motion/react';
import { LandingCtaLink } from '@/sections/landing/components/LandingCtaLink';

const DifferentiatorsSection: React.FC<IDifferentiators> = ({ title, items, cta }) => {
  return (
    <Section bgColor='dark' textColor='light' className='relative'>
      <div className='flex flex-col gap-16 md:gap-20'>
        <div className='flex flex-col md:flex-row justify-between items-end gap-10'>
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
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className='flex flex-col gap-12 bg-dark p-12 hover:bg-white/[0.02] transition-colors group'
            >
              <div className='flex justify-between items-start'>
                <span className='font-bebas text-accent text-3xl tracking-widest'>0{idx + 1}</span>
                <div className='w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/5 transition-all duration-500'>
                  <i className='fa-solid fa-plus text-[10px] text-white/20 group-hover:text-accent transition-colors'></i>
                </div>
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
                <div className='w-full h-[1px] bg-gradient-to-r from-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left' />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default DifferentiatorsSection;
