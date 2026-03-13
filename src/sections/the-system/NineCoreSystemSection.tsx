'use client';

import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { INineCoreSystem } from '@/types/theSystem';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef } from 'react';

interface NineCoreSystemSectionProps {
  nineCoreSystem: INineCoreSystem;
}

const NineCoreSystemSection = ({
  nineCoreSystem,
}: NineCoreSystemSectionProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Generate 9 blocks
  const blocks = Array.from({ length: 9 }, (_, i) => i + 1);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Calculate total width of all blocks
    const blockWidth = 320; // w-80 = 320px
    const gap = 32; // gap-8 = 32px
    const totalWidth = blocks.length * (blockWidth + gap);

    // Create infinite loop animation
    const animateCarousel = () => {
      animate(x, -totalWidth, {
        duration: 20, // Adjust speed (higher = slower)
        repeat: Infinity,
        ease: 'linear',
      });
    };

    animateCarousel();
  }, [blocks.length, x]);

  // Transform x value to translateX
  const translateX = useTransform(x, (value) => `${value}px`);

  return (
    <Section bgColor='dark' textColor='light'>
      <div className='container-padding flex flex-col gap-8'>
        <div className='text-center'>
          <AnimatedHeading
            text={nineCoreSystem.title}
            className='text-h1 font-bebas text-light mb-4'
            revealColor='dark'
          />
          <FadeInParagraph className='text-h6 text-light/80 mx-auto max-w-3xl'>
            {nineCoreSystem.subtitle}
          </FadeInParagraph>
        </div>

        {/* Horizontal Carousel */}
        <div className='mt-12 overflow-hidden'>
          <motion.div
            ref={carouselRef}
            className='flex gap-8'
            style={{ x: translateX, width: 'max-content' }}>
            {/* First set of blocks */}
            {blocks.map((blockNum) => (
              <motion.div
                key={`block-${blockNum}`}
                className='bg-dark/60 border-light/20 flex h-64 w-64 shrink-0 items-center justify-center rounded-lg border-2 md:h-80 md:w-80'
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: blockNum * 0.1 }}>
                <span className='text-h1 font-bebas text-light/50'>
                  {blockNum}
                </span>
              </motion.div>
            ))}
            {/* Duplicate set for seamless loop */}
            {blocks.map((blockNum) => (
              <motion.div
                key={`block-duplicate-${blockNum}`}
                className='bg-dark/60 border-light/20 flex h-64 w-64 shrink-0 items-center justify-center rounded-lg border-2 md:h-80 md:w-80'>
                <span className='text-h1 font-bebas text-light/50'>
                  {blockNum}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default NineCoreSystemSection;
