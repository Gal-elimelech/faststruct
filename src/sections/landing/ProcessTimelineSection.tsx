'use client';

import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { IProcessTimeline } from '@/types/landing';
import { motion } from 'motion/react';

const ProcessTimelineSection: React.FC<IProcessTimeline> = ({ title, steps }) => {
  return (
    <Section bgColor='dark' textColor='light' className='py-24'>
      <div className='flex flex-col gap-16'>
        <div className='text-center'>
          <AnimatedHeading
            text={title}
            className='text-h2 font-bebas text-light uppercase'
            revealColor='accent'
          />
        </div>

        <div className='max-w-4xl mx-auto w-full'>
          <div className='relative flex flex-col gap-12'>
            {/* vertical line */}
            <div className='absolute left-8 top-0 bottom-0 w-px bg-white/20 hidden md:block' />

            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className='flex flex-col md:flex-row gap-8 items-start relative'
              >
                <div className='z-10 flex-shrink-0 w-16 h-16 bg-accent flex items-center justify-center rounded-full font-bebas text-2xl text-dark'>
                  {step.step}
                </div>
                
                <div className='flex flex-col gap-4 pt-2'>
                  <h3 className='text-h3 font-bebas text-accent uppercase leading-none'>
                    {step.title}
                  </h3>
                  <p className='text-xl text-light/70 font-poppins leading-relaxed'>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProcessTimelineSection;
