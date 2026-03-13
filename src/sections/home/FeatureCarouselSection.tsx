'use client';

import { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { IFeatureItem } from '@/types/home';
import FeatureSlide from './components/FeatureSlide';

interface FeatureCarouselProps {
  features: IFeatureItem[];
}

const FeatureCarousel = ({ features }: FeatureCarouselProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const numSlides = features.length;
  const slideIndex = useTransform(scrollYProgress, [0, 1], [1, numSlides]);

  return (
    <section
      style={{ height: `${features.length * 100}vh` }}
      ref={sectionRef}
      className={`relative w-full`}>
      {/* Sticky container overlays on top during scroll */}
      <div className='sticky top-0 right-0 left-0 h-screen overflow-hidden'>
        {features.map((feature, index) => (
          <FeatureSlide
            key={`feature-${index}`}
            feature={feature}
            index={index}
            progress={slideIndex}
          />
        ))}
      </div>
    </section>
  );
};

export { FeatureCarousel };
