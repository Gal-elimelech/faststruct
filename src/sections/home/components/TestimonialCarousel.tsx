'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ITestimonial } from '@/types/home';

interface ITestimonialCarouselProps {
  testimonials: ITestimonial[];
  autoPlayInterval?: number; // in milliseconds, 0 to disable
}

const TestimonialCarousel = ({
  testimonials,
  autoPlayInterval = 5000,
}: ITestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const goToNext = useCallback(() => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrevious = useCallback(() => {
    setDirection('left');
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const goToIndex = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 'right' : 'left');
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Auto-play functionality
  useEffect(() => {
    if (autoPlayInterval > 0) {
      const interval = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlayInterval, goToNext]);

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? 100 : -100,
      opacity: 0,
    }),
  };

  const transition = {
    x: { type: 'spring' as const, stiffness: 300, damping: 30 },
    opacity: { duration: 0.3 },
  };

  return (
    <div className='relative w-full'>
      {/* Carousel Container */}
      <div className='relative min-h-[300px] overflow-hidden px-12 md:min-h-[280px] md:px-16'>
        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={transition}
            className='absolute inset-0 flex flex-col items-center justify-center px-4'>
            <blockquote className='mx-auto w-full max-w-2xl text-center'>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className='font-poppins text-light text-base leading-relaxed italic md:text-lg md:leading-relaxed'>
                &ldquo;{currentTestimonial.quote}&rdquo;
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className='font-poppins text-light/80 mt-6 text-sm italic md:text-base'>
                - {currentTestimonial.author}
              </motion.p>
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {testimonials.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className='bg-accent/20 hover:bg-accent/40 text-light absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full p-2.5 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 md:left-4 md:p-3.5'
            aria-label='Previous testimonial'>
            <i className='fa-solid fa-chevron-left text-base md:text-lg'></i>
          </button>
          <button
            onClick={goToNext}
            className='bg-accent/20 hover:bg-accent/40 text-light absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full p-2.5 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 md:right-4 md:p-3.5'
            aria-label='Next testimonial'>
            <i className='fa-solid fa-chevron-right text-base md:text-lg'></i>
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {testimonials.length > 1 && (
        <div className='mt-8 flex justify-center gap-2.5'>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className='group relative p-1'
              aria-label={`Go to testimonial ${index + 1}`}>
              <motion.div
                className='bg-light/30 group-hover:bg-light/60 h-2 w-2 rounded-full transition-all duration-300 md:h-2.5 md:w-2.5'
                animate={{
                  scale: currentIndex === index ? 1.5 : 1,
                  backgroundColor:
                    currentIndex === index
                      ? 'rgba(229, 224, 210, 1)'
                      : 'rgba(229, 224, 210, 0.3)',
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
