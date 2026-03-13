'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { useActiveTextIndex } from './useActiveTextIndex';

interface ScrollableTextListProps {
  items: string[];
  onActiveIndexChange?: (index: number) => void;
}

const ScrollableTextList: React.FC<ScrollableTextListProps> = ({
  items,
  onActiveIndexChange,
}) => {
  const { activeIndex, cubeTop, itemRefs, containerRef } = useActiveTextIndex(
    items.length
  );

  const [prevCubeTop, setPrevCubeTop] = useState(cubeTop);
  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);

  // Use motion values for smooth animations
  const top = useMotionValue(cubeTop);

  // Shared spring configuration for synchronized animations
  const springConfig = {
    stiffness: 80,
    damping: 10,
  };

  const springTop = useSpring(top, springConfig);

  useEffect(() => {
    if (onActiveIndexChange) {
      onActiveIndexChange(activeIndex);
    }
  }, [activeIndex, onActiveIndexChange, setPrevActiveIndex]);

  useEffect(() => {
    const triggerBounceAnimation = () => {
      // Trigger bounce animation when active index changes
      if (activeIndex !== prevActiveIndex && cubeTop !== prevCubeTop) {
        setPrevActiveIndex(activeIndex);
        setPrevCubeTop(cubeTop);

        top.set(cubeTop);
      }
    };
    triggerBounceAnimation();
  }, [activeIndex, prevActiveIndex, cubeTop, prevCubeTop, top]);

  return (
    <div
      ref={containerRef}
      className={`relative ml-auto flex basis-1/2 flex-col`}>
      {/* Cube indicator */}
      <motion.div
        className='bg-accent absolute h-[14px] w-[14px] rounded-sm'
        style={{
          left: 0,
          top: springTop,
        }}
      />
      {/* Text items */}
      <div className={`flex flex-col gap-y-24 pl-6`}>
        {items.map((item, index) => {
          const ref = itemRefs[index];
          return (
            <div
              style={{ opacity: index === activeIndex ? 1 : 0.5 }}
              key={index}
              ref={ref}
              className='text-h4 font-poppins text-light text-left font-extralight'>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollableTextList;
