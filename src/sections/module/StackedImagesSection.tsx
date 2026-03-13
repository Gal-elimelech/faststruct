'use client';

import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  MotionValue,
} from 'motion/react';
import { useRef } from 'react';
import { IStackedImage, IStackedImages } from '@/types/product';
import { Section } from '@/components/Section';

const StackedImagesSection = ({ images }: IStackedImages) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const imageIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, images.length - 1]
  );

  return (
    <Section
      ref={sectionRef}
      bgColor='light'
      textColor='dark'
      style={{ height: `${images.length * 100}vh` }}
      className='relative w-full p-0'>
      {/* Sticky container for stacked images */}
      <div className='sticky top-0 h-screen w-full overflow-hidden'>
        {images.map((image, index) => (
          <StackedImage
            key={index}
            image={image}
            index={index}
            imageIndex={imageIndex}
            totalImages={images.length}
          />
        ))}
      </div>
    </Section>
  );
};

interface StackedImageProps {
  image: IStackedImage;
  index: number;
  imageIndex: MotionValue<number>;
  totalImages: number;
}

const StackedImage = ({
  image,
  index,
  imageIndex,
  totalImages,
}: StackedImageProps) => {
  // FIX 1: Invert logic so scrolling down makes previous images Negative (Past)
  // When we scroll to image 1, Image 0 becomes -1 (Past/Exit state)
  const imageProgress = useTransform(imageIndex, (current) => index - current);

  // Scale:
  // - Past (-1): Shrink to 0.5 (fly away up)
  // - Active (0): Full size 1
  // - Future (1): Start at 0.85 (waiting in stack)
  const scale = useTransform(
    imageProgress,
    [-1, 0, 1, 2, 3],
    [0.8, 1, 0.85, 0.7, 0.6]
  );

  // Opacity:
  // - Past (-0.5): Fade out quickly as it goes up
  // - Active (0): 1
  // - Future (1): 0.4 (visible in stack but dim)
  const opacity = useTransform(imageProgress, [-0.5, 0, 1], [0, 1, 1]);

  // Y Position:
  // - Past (-1): Move UP (-400px) -> This fixes the direction!
  // - Active (0): Centered (0px)
  // - Future (1): Offset DOWN (50px) -> Peeking from bottom
  // - Future (2): Offset DOWN further (100px)
  const y = useTransform(
    imageProgress,
    [-1, 0, 1, 2, 3],
    [-500, 0, 50, 150, 300]
  );

  // Z-Index (Crucial for stacking):
  // Simple stable stacking: Higher index = Lower Z-index (Stack is behind)
  // Active image will naturally be on top when progress is near 0
  const zIndex = totalImages - index;

  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.div
      style={{
        transform,
        opacity,
        zIndex,
      }}
      className='absolute inset-0 flex items-center justify-center md:p-8'>
      <div className='relative h-[60vh] w-full max-w-6xl overflow-hidden rounded-2xl md:h-full'>
        <Image
          src={image.url}
          alt={image.alt || `Product image ${index + 1}`}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1152px'
          className='object-cover object-center'
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>
    </motion.div>
  );
};

export default StackedImagesSection;
