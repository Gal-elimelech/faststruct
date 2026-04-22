'use client';

import { Section } from '@/components/Section';
import { IProcessTimeline } from '@/types/landing';
import { motion } from 'motion/react';

const LandingProcessSection: React.FC<IProcessTimeline> = ({ title, steps }) => {
  return (
    <Section bgColor='light' textColor='dark' className='py-32 relative overflow-hidden'>
      {/* Background Graphic */}
      <div className='absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent' />
      
      <div className='flex flex-col gap-24 relative z-10'>
        <div className='max-w-4xl'>
          <h2 className='text-h2 md:text-[4.5rem] font-bebas text-dark uppercase leading-[0.85]'>
            {title}
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className='flex flex-col gap-8 group'
            >
              <div className='flex items-center gap-4'>
                <span className='font-bebas text-5xl text-accent/20 group-hover:text-accent transition-colors duration-500'>
                  {step.step}
                </span>
                <div className='h-[1px] flex-grow bg-dark/10 group-hover:bg-accent/30 transition-colors duration-500' />
              </div>
              
              <div className='flex flex-col gap-4'>
                <h3 className='text-h4 font-bebas text-dark uppercase tracking-widest group-hover:text-accent transition-colors'>
                  {step.title}
                </h3>
                <p className='text-dark/70 font-poppins text-sm leading-relaxed'>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default LandingProcessSection;
