'use client';

import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { IValueProp } from '@/types/landing';
import { motion } from 'motion/react';
import Image from 'next/image';

const ValuePropSection: React.FC<IValueProp> = ({ title, texts, image, features }) => {
  return (
    <Section bgColor='dark' textColor='light'>
      <div className='flex flex-col gap-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch'>
          <div className='flex flex-col gap-4 lg:pr-4'>
            <AnimatedHeading
              text={title}
              className='text-h2 font-bebas text-light uppercase leading-[0.9]'
              revealColor='dark'
            />
            <div className='flex flex-col gap-3'>
              {texts.map((t, i) => (
                <p key={i} className='text-light/80 font-poppins leading-relaxed max-w-3xl'>
                  {t}
                </p>
              ))}
            </div>
          </div>

          <div className='w-full overflow-hidden rounded-sm border border-white/10 bg-white/5'>
            <div className='relative w-full h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]'>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes='(max-width: 1024px) 100vw, 50vw'
                className='object-cover'
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
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
              className='flex flex-col gap-8 bg-white/2 border border-white/5 p-10 rounded-sm hover:border-accent/30 hover:bg-white/4 group relative overflow-hidden'
            >
              {/* Index Number */}
              <span className='font-bebas text-5xl text-white/3 absolute top-4 right-6 group-hover:text-accent/10 transition-colors'>
                0{idx + 1}
              </span>

              <div className='w-12 h-[2px] bg-accent/30 group-hover:w-20 transition-all duration-500' />

              <div className='flex flex-col gap-4 relative z-10'>
                <h3 className='text-h4 font-bebas text-light uppercase leading-tight group-hover:text-accent transition-colors'>
                  {item.title}
                </h3>
                <p className='text-light/60 font-poppins text-base leading-relaxed'>
                  {item.text}
                </p>
              </div>

              {/* Corner Accent */}
              <div className='absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/10 group-hover:border-accent/40 transition-colors' />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ValuePropSection;
