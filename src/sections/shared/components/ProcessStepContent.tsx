'use client';

import { IProcess } from '@/types/process';
import { motion } from 'motion/react';

type IProcessStepContentProps = IProcess['steps'][number] & {
  index: number;
  x: number;
  y: number;
  updateRef: (ref: HTMLDivElement | null) => void;
  width: number;
  tranformValue: number;
};

const ProcessStepContent = ({
  text,
  title,
  x,
  y,
  updateRef,
  width,
  tranformValue,
}: IProcessStepContentProps) => {
  return (
    <motion.div
      ref={updateRef}
      style={{
        top: y,
        left: x,
        width,
        opacity: 1 - tranformValue,
        scale: 1 - tranformValue * 0.5,
        perspective: 1000,
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className='point absolute p-5 text-start text-white md:p-0 md:pr-10'>
      <motion.h2
        style={{
          rotateY: tranformValue,
          transformStyle: 'preserve-3d',
        }}
        className='font-bebas text-h1 text-light'>
        {title}
      </motion.h2>
      <motion.p
        style={{
          rotateY: tranformValue,
          transformStyle: 'preserve-3d',
        }}
        className='font-poppins text-h4'>
        {text}
      </motion.p>
    </motion.div>
  );
};

export default ProcessStepContent;
