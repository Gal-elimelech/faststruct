'use client';

import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { ICustomization } from '@/types/theSystem';
import Image from 'next/image';
import { motion } from 'motion/react';

interface CustomizationSectionProps {
  customization: ICustomization;
}

const CustomizationSection = ({ customization }: CustomizationSectionProps) => {
  return (
    <section className='text-dark section-padding-top bg-white'>
      <div className='flex flex-col gap-8'>
        <div className='container-padding text-center'>
          <AnimatedHeading
            text={customization.title}
            className='text-h1 font-bebas text-dark mb-4'
            revealColor='white'
          />
          <FadeInParagraph className='text-h6 text-dark/80 mx-auto max-w-3xl'>
            {customization.subtitle}
          </FadeInParagraph>
        </div>
        <div className='mt-12 grid grid-cols-1 md:grid-cols-2'>
          {customization.options.map((option, index) => (
            <motion.div
              key={index}
              className='group relative aspect-4/3 w-full overflow-hidden'
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}>
              <Image
                src={option.imageUrl}
                alt={option.title}
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
              />
              {/* Gradient overlay ending in the middle */}
              <div
                className='from-dark/90 via-dark/60 absolute inset-0 bg-gradient-to-t to-transparent'
                style={{
                  background:
                    'linear-gradient(to top, rgba(23, 23, 23, 0.9) 0%, rgba(23, 23, 23, 0.6) 50%, transparent 100%)',
                }}
              />
              {/* Text content positioned on gradient */}
              <div className='absolute right-0 bottom-0 left-0 p-6 md:p-8'>
                <h3 className='text-h5 font-bebas mb-2 text-white'>
                  {option.title}
                </h3>
                <p className='text-h4 font-poppins text-light/90 font-light'>
                  {option.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomizationSection;
