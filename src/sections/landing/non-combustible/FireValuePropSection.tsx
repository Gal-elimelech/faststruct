'use client';

import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { IValueProp } from '@/types/landing';
import { motion } from 'motion/react';
import Image from 'next/image';

/**
 * Page-specific value-prop for the non-combustible landing page: light ground
 * for contrast against the surrounding dark sections, and equal-height feature
 * cards so titles/descriptions line up regardless of copy length.
 */
const FireValuePropSection: React.FC<IValueProp> = ({
  title,
  texts,
  image,
  features,
}) => {
  return (
    <section className='relative bg-white text-dark px-4 md:px-8 lg:px-16 py-14 md:py-20 lg:py-24'>
      <div className='flex flex-col gap-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center'>
          <div className='flex flex-col gap-5'>
            <AnimatedHeading
              text={title}
              className='text-h2 font-bebas text-dark uppercase leading-[0.9]'
            />
            <div className='flex flex-col gap-3'>
              {texts.map((t, i) => (
                <p
                  key={i}
                  className='text-dark/70 font-poppins leading-relaxed max-w-xl'
                >
                  {t}
                </p>
              ))}
            </div>
          </div>

          <div className='relative w-full overflow-hidden rounded-sm border border-dark/10 min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]'>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes='(max-width: 1024px) 100vw, 50vw'
              className='object-cover'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5'>
          {features.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.07,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className='flex flex-col gap-4 bg-dark/2 border border-dark/10 p-7 rounded-sm hover:border-accent/40 transition-colors group'
            >
              <div className='w-10 h-[2px] bg-accent/40 group-hover:w-16 transition-all duration-500' />
              <h3 className='text-h5 font-bebas text-dark uppercase leading-tight tracking-wide min-h-[2.4em] flex items-end'>
                {item.title}
              </h3>
              <p className='text-dark/65 font-poppins text-sm leading-relaxed'>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FireValuePropSection;
