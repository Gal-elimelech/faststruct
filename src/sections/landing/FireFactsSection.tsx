'use client';

import { IFireFactsSection } from '@/types/landing';
import { motion } from 'motion/react';

const toneClass: Record<string, string> = {
  ember: 'text-[#c4502e]',
  accent: 'text-accent',
  light: 'text-light',
};

const FireFactsSection: React.FC<IFireFactsSection> = ({ items, note }) => {
  return (
    <section className='relative bg-dark text-light px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20 border-y border-white/10'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 overflow-hidden'>
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: idx * 0.08,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className='flex flex-col gap-3 bg-dark p-10 md:p-12'
          >
            <span
              className={`font-bebas text-4xl md:text-5xl lg:text-6xl leading-none ${
                toneClass[item.tone] ?? 'text-light'
              }`}
            >
              {item.value}
            </span>
            <p className='text-light/70 font-poppins text-sm md:text-base max-w-[34ch]'>
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
      <p className='text-light/40 font-poppins text-xs mt-6 max-w-4xl'>{note}</p>
    </section>
  );
};

export default FireFactsSection;
