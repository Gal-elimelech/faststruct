'use client';

import { Section } from '@/components/Section';
import { IProcessTimeline } from '@/types/landing';
import { motion } from 'motion/react';

const LandingProcessSection: React.FC<IProcessTimeline> = ({ title, steps }) => {
  return (
    <Section bgColor='white' textColor='dark' className='relative overflow-hidden'>
      <div className='pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl' />

      <div className='relative z-10 flex flex-col gap-10'>
        <div className='max-w-4xl flex flex-col gap-4'>
          <h2 className='text-h2 font-bebas text-dark uppercase leading-[0.85]'>
            {title}
          </h2>
        </div>

        <div className='flex flex-wrap justify-center'>
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.55 }}
              viewport={{ once: true }}
              className='group relative flex min-h-[280px] w-full flex-col gap-8 overflow-hidden bg-white p-10 md:w-[calc(50%-0.5px)] md:p-12 lg:w-[calc(50%-0.8px)] xl:w-[calc(20%-0.8px)] border border-dark/10'
            >
              <div className='flex items-center gap-4'>
                <span className='font-bebas text-5xl text-accent/25 group-hover:text-accent transition-colors duration-500'>
                  {step.step}
                </span>
                <div className='h-px grow bg-dark/10 group-hover:bg-accent/30 transition-colors duration-500' />
              </div>

              <div className='flex flex-col gap-3'>
                <h3 className='text-h4 font-bebas text-dark uppercase tracking-widest group-hover:text-accent transition-colors'>
                  {step.title}
                </h3>
                <p className='text-base text-dark/70 font-poppins leading-relaxed'>
                  {step.description}
                </p>
              </div>

              <div className='mt-auto'>
                <div className='h-px w-12 bg-accent/30 transition-all duration-500 group-hover:w-full' />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default LandingProcessSection;
