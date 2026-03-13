'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import clsx from 'clsx';
import { ColorsUnion } from '@/lib/css-constants';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  revealColor?: ColorsUnion;
  amount?: number;
  runAnimation?: boolean;
}

const AnimatedHeading = ({
  text,
  className,
  revealColor = 'dark',
  amount = 0.5,
  runAnimation,
}: AnimatedHeadingProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount, once: true });

  return (
    <div ref={ref} className={clsx('relative inline-block', className)}>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: (runAnimation ?? isInView) ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        className={clsx(
          'absolute inset-0 z-10 origin-right',
          `bg-${revealColor}`
        )}>
        <div className='bg-accent absolute top-0 bottom-0 left-0 w-1 rounded-full'></div>
      </motion.div>
      <span>{text}</span>
    </div>
  );
};

export default AnimatedHeading;
