'use client';

import { motion } from 'motion/react';
import { ITestimonial } from '@/types/home';
import TestimonialCarousel from './components/TestimonialCarousel';
import Image from 'next/image';

interface ITestimonialsSectionProps {
  testimonials: ITestimonial[];
  backgroundImage: string;
}

const TestimonialsSection: React.FC<ITestimonialsSectionProps> = ({
  testimonials,
  backgroundImage,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className='relative w-full overflow-hidden py-16 md:py-24'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <Image
          src={backgroundImage}
          alt='Testimonials background'
          fill
          sizes='100vw'
          className='object-cover object-center'
          priority={false}
        />
        {/* Dark Overlay */}
        <div className='bg-dark/70 absolute inset-0' />
      </div>

      {/* Content */}
      <div className='relative z-10'>
        <TestimonialCarousel
          testimonials={testimonials}
          autoPlayInterval={8000}
        />
      </div>
    </motion.div>
  );
};

export default TestimonialsSection;
