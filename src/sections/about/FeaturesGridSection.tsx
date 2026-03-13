'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { motion, Transition } from 'motion/react';
import { IFeaturesGrid, IFeatureItem } from '@/types/about';
import { useIsMobile } from '@/hooks/useIsMobile';

const FeatureRow = ({
  title,
  text,
  imageUrl,
  index,
  isActive,
  rowRef,
}: IFeatureItem & {
  index: number;
  isActive: boolean;
  rowRef: (el: HTMLDivElement | null) => void;
}) => {
  // Desktop: flip on hover, Mobile: flip on scroll activation
  const isFlipped = isActive;
  const isCardActive = isActive;

  // Conditional transition: delay only on exit (flipping back to 0)
  // Enter (flip to 180): immediate (delay = 0)
  // Exit (flip to 0): delayed (delay = 0.3) for smoother feel
  const transition: Transition = {
    duration: 0.6,
    ease: 'easeInOut',
    delay: isCardActive ? 0 : 0.3,
  };

  return (
    <div ref={rowRef} className='relative z-0 w-full' data-row-index={index}>
      <div className='relative w-full overflow-hidden'>
        <motion.div
          className='border-dark/20 relative grid size-full grid-cols-1 grid-rows-1 content-center items-center justify-center border-b py-10 text-center'
          animate={{
            rotateX: isFlipped ? 180 : 0,
          }}
          transition={transition}>
          <motion.div
            className='absolute inset-0 z-0'
            animate={{
              filter: isCardActive
                ? 'brightness(1) saturate(1)'
                : 'brightness(0.5) saturate(0)',
            }}
            transition={transition}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes='100vw'
              className='object-cover object-center'
            />
          </motion.div>

          <div className='bg-dark/30 absolute inset-0 z-0 flex items-center justify-center' />

          <motion.h3
            style={{
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
            }}
            transition={transition}
            animate={{
              rotateX: isCardActive ? 180 : 0,
            }}
            className='text-h2 font-bebas md:text-h1 z-10 text-white lg:text-[4rem]'>
            {title}
          </motion.h3>

          <motion.div
            transition={transition}
            animate={{
              rotateX: isCardActive ? 0 : 180,
            }}
            style={{
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
            }}
            className='absolute inset-0 z-50 flex items-center justify-center'>
            <motion.p
              animate={{
                opacity: isCardActive ? 1 : 0,
              }}
              transition={transition}
              className='text-h6 text-light max-w-2xl rotate-x-180'>
              {text}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const FeaturesGridSection = ({ items }: IFeaturesGrid) => {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const updateActiveRow = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex: number | null = null;
      let closestDistance = Infinity;

      rowRefs.current.forEach((rowRef, index) => {
        if (!rowRef) return;

        const rowRect = rowRef.getBoundingClientRect();
        const rowCenter = rowRect.top + rowRect.height / 2;
        const distanceFromCenter = Math.abs(rowCenter - viewportCenter);

        if (
          rowRect.bottom > 0 &&
          rowRect.top < window.innerHeight &&
          distanceFromCenter < closestDistance
        ) {
          closestDistance = distanceFromCenter;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    updateActiveRow();
    window.addEventListener('scroll', updateActiveRow, { passive: true });
    window.addEventListener('resize', updateActiveRow);

    return () => {
      window.removeEventListener('scroll', updateActiveRow);
      window.removeEventListener('resize', updateActiveRow);
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className='bg-light text-dark py-0'>
      <div className='w-full'>
        {items.map((item, index) => (
          <FeatureRow
            key={index}
            {...item}
            index={index}
            isActive={activeIndex === index}
            rowRef={(el) => {
              rowRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesGridSection;
