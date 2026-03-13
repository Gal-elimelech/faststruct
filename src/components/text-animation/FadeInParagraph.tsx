'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface FadeInParagraphProps {
  children?: React.ReactNode;
  className?: string;
}

const FadeInParagraph = ({ children, className }: FadeInParagraphProps) => {
  const anchorRef = useRef(null);
  const isInView = useInView(anchorRef, {
    amount: 0.5,
    once: true,
  });

  return (
    <div ref={anchorRef} className={`${className} relative`}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}>
        {children}
      </motion.p>
    </div>
  );
};

export default FadeInParagraph;
