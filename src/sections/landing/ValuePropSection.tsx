'use client';

import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { IValueProp } from '@/types/landing';
import { motion } from 'motion/react';

const ValuePropSection: React.FC<IValueProp> = ({ title, texts, features }) => {
  return (
    <Section bgColor='dark' textColor='light'>
      <div className='flex flex-col gap-12'>
        <div className='max-w-4xl flex flex-col gap-6'>
          <AnimatedHeading
            text={title}
            className='text-h2 md:text-h1 font-bebas text-light uppercase leading-[0.9]'
            revealColor='dark'
          />
          <div className='flex flex-col gap-4'>
            {texts.map((t, i) => (
              <p key={i} className='text-cream/80 font-poppins text-lg md:text-xl leading-relaxed max-w-3xl'>
                {t}
              </p>
            ))}
          </div>
        </div>

        <div className='mt-8'>
          <h3 className='text-accent font-bebas text-2xl uppercase tracking-widest mb-10'>
            {features.title}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {features.items.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className='flex flex-col gap-8 bg-white/[0.02] border border-white/5 p-10 rounded-sm hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden'
              >
                {/* Index Number */}
                <span className='font-bebas text-5xl text-white/[0.03] absolute top-4 right-6 group-hover:text-accent/10 transition-colors'>
                  0{idx + 1}
                </span>

                <div className='w-12 h-[2px] bg-accent/30 group-hover:w-20 transition-all duration-500' />

                <div className='flex flex-col gap-4 relative z-10'>
                  <h3 className='text-h4 font-bebas text-light uppercase leading-tight group-hover:text-accent transition-colors'>
                    {item.title}
                  </h3>
                  <p className='text-cream/60 font-poppins text-base leading-relaxed'>
                    {item.text}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className='absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/10 group-hover:border-accent/40 transition-colors' />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ValuePropSection;
