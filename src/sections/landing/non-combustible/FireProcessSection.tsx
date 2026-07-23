'use client';

import { IProcessTimeline } from '@/types/landing';
import { motion } from 'motion/react';

/**
 * Page-specific process timeline: equal-height cards with a fixed-height title
 * block so descriptions align across steps regardless of title length, and
 * tighter section padding than the shared component.
 */
const FireProcessSection: React.FC<IProcessTimeline> = ({ title, steps }) => {
  return (
    <section className='relative bg-white text-dark px-4 md:px-8 lg:px-16 py-14 md:py-20 lg:py-24 overflow-hidden'>
      <div className='pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl' />

      <div className='relative z-10 flex flex-col gap-10'>
        <div className='max-w-4xl'>
          <h2 className='text-h2 font-bebas text-dark uppercase leading-[0.85]'>
            {title}
          </h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-px bg-dark/10 border border-dark/10'>
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.06,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className='group flex flex-col bg-white p-8 lg:p-9'
            >
              <div className='flex items-center gap-4 mb-6'>
                <span className='font-bebas text-4xl text-accent/30 group-hover:text-accent transition-colors duration-500 leading-none'>
                  {step.step}
                </span>
                <div className='h-px grow bg-dark/10 group-hover:bg-accent/30 transition-colors duration-500' />
              </div>

              <h3 className='text-h5 font-bebas text-dark uppercase tracking-widest leading-tight min-h-[2.4em] flex items-start group-hover:text-accent transition-colors'>
                {step.title}
              </h3>
              <p className='text-sm text-dark/65 font-poppins leading-relaxed mt-3'>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FireProcessSection;
