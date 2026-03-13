'use client';

import { motion } from 'motion/react';
import { IEmptyState } from '@/types/modulesPage';

interface EmptyStateProps {
  emptyState: IEmptyState;
}

const EmptyState = ({ emptyState }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center justify-center py-16 text-center'>
      <div className='bg-light/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
        <i
          className='fa-solid fa-house text-light/60 text-2xl'
          aria-hidden='true'></i>
      </div>
      <h3 className='text-h4 font-bebas text-light mb-2 uppercase'>
        {emptyState.title}
      </h3>
      <p className='text-h6 text-light/80 max-w-md'>{emptyState.message}</p>
    </motion.div>
  );
};

export default EmptyState;
