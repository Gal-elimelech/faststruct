'use client';

import { Section } from '@/components/Section';
import { ILocation } from '@/types/landing';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/Button';

const LandingLocationSection: React.FC<ILocation> = ({ title, items, cta }) => {
  return (
    <Section bgColor='dark' textColor='light' className='py-32 border-t border-white/5 relative overflow-hidden'>
      {/* Background Graphic */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] pointer-events-none' />

      <div className='flex flex-col gap-20 relative z-10'>
        <div className='flex flex-col md:flex-row justify-between items-end gap-10'>
          <div className='max-w-4xl'>
            <h2 className='text-h2 md:text-[4rem] font-bebas text-light uppercase leading-[0.9]'>
              {title}
            </h2>
          </div>
          
          <Link href={cta.link} className='mb-2'>
            <Button variant='primary' size='lg' hoverTransition='lift'>
              {cta.text}
            </Button>
          </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className='flex items-center gap-4 group bg-white/[0.02] border border-white/5 p-6 rounded-sm hover:border-accent/30 transition-all duration-500'
            >
              <div className='w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-all duration-500'>
                <i className={`${item.icon} text-accent group-hover:text-dark transition-colors`}></i>
              </div>
              <span className='font-bebas text-lg text-cream/90 uppercase tracking-wider'>{item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default LandingLocationSection;
