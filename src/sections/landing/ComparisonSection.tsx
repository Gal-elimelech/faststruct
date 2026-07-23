'use client';

import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { IComparisonSection } from '@/types/landing';
import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

const ComparisonSection: React.FC<IComparisonSection> = ({
  title,
  subtitle,
  wood,
  steel,
}) => {
  return (
    <Section bgColor='white' textColor='dark'>
      <div className='flex flex-col gap-12'>
        <div className='max-w-3xl flex flex-col gap-4'>
          <AnimatedHeading
            text={title}
            className='text-h2 font-bebas text-dark uppercase leading-[0.85]'
          />
          <p className='text-h6 md:text-xl text-dark/70 font-poppins leading-relaxed'>
            {subtitle}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
          {/* Wood - muted */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className='bg-dark/3 border border-dark/10 rounded-sm p-8 md:p-10 flex flex-col gap-6'
          >
            <h3 className='font-bebas text-h3 text-dark/50 uppercase leading-none'>
              {wood.title}
            </h3>
            <div className='flex flex-col'>
              {wood.rows.map((row, idx) => (
                <div
                  key={idx}
                  className='flex items-start gap-3 py-4 border-t border-dark/10 text-dark/75 font-poppins text-sm md:text-base'
                >
                  <span className='w-5 h-5 rounded-full bg-[#c4502e]/15 flex items-center justify-center shrink-0 mt-0.5'>
                    <X size={13} className='text-[#c4502e]' aria-hidden />
                  </span>
                  {row}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Steel - highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.08,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className='bg-dark text-light rounded-sm p-8 md:p-10 flex flex-col gap-6 shadow-2xl'
          >
            <h3 className='font-bebas text-h3 text-accent uppercase leading-none'>
              {steel.title}
            </h3>
            <div className='flex flex-col'>
              {steel.rows.map((row, idx) => (
                <div
                  key={idx}
                  className='flex items-start gap-3 py-4 border-t border-white/10 text-light/90 font-poppins text-sm md:text-base'
                >
                  <span className='w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5'>
                    <Check size={13} className='text-accent' aria-hidden />
                  </span>
                  {row}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default ComparisonSection;
