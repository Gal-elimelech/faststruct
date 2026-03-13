'use client';

import {
  motion,
  useScroll,
  UseScrollOptions,
  useTransform,
} from 'motion/react';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  startRange?: number;
  endRange?: number;
  unitType?: 'vh' | 'px' | '%';
  offset?: UseScrollOptions['offset'];
  ref?: UseScrollOptions['target'];
}

const Parallax = ({
  children,
  className,
  startRange = 0,
  endRange = 0,
  unitType = '%',
  offset = ['start end', 'end start'],
  ref,
}: ParallaxProps) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const start = 0;
  const end = 1;

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [`${startRange}${unitType}`, `${endRange}${unitType}`]
  );

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
};

export default Parallax;
