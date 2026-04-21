'use client';

import { Section } from '@/components/Section';
import { IServicesOverview } from '@/types/landing';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/Button';

const ServicesOverviewSection: React.FC<IServicesOverview> = ({ title, subtitle, items, cta }) => {
  return (
    <Section bgColor='dark' textColor='light' className='py-32 relative'>
      <div className='flex flex-col gap-24'>
        <div className='flex flex-col md:flex-row justify-between items-end gap-10'>
          <div className='max-w-4xl flex flex-col gap-8'>
            <h2 className='text-h2 md:text-[4.5rem] font-bebas text-light uppercase leading-[0.85]'>
              {title}
            </h2>
            {subtitle && (
              <p className='text-lg md:text-xl text-cream/60 font-poppins max-w-2xl'>
                {subtitle}
              </p>
            )}
          </div>
          
          <Link href={cta.link} className='mb-2'>
            <Button variant='primary' size='lg' hoverTransition='lift'>
              {cta.text}
            </Button>
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10'>
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className='group bg-dark p-12 hover:bg-white/[0.02] transition-all duration-500 flex flex-col gap-16 relative overflow-hidden'
            >
              {/* Decorative Tech Icon */}
              <div className='absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors' />

              <div className='flex flex-col gap-6 relative z-10'>
                <h3 className='text-h3 font-bebas text-light uppercase leading-none group-hover:text-accent transition-colors duration-500'>
                  {item.title}
                </h3>
                <div className='w-12 h-[2px] bg-accent/30 group-hover:w-full transition-all duration-700' />
              </div>
              
              <p className='text-cream/60 font-poppins text-lg leading-relaxed relative z-10'>
                {item.description}
              </p>

              {/* Bottom Corner Accent */}
              <div className='absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700'>
                <i className='fas fa-chevron-right text-accent text-sm'></i>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ServicesOverviewSection;
