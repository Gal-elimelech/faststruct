'use client';

import { IResults } from '@/types/modulesPage';
import { motion } from 'motion/react';

interface ResultsCountProps {
  showing: number;
  total: number;
  results: IResults;
}

const ResultsCount = ({ showing, total, results }: ResultsCountProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='text-h6 text-light/80'
      role='status'
      aria-live='polite'
      aria-atomic='true'>
      <span className='sr-only'>
        {results.showing} {showing} {results.of} {total} {results.modules}
      </span>
      <span aria-hidden='true'>
        {results.showing} <strong className='text-light'>{showing}</strong>{' '}
        {results.of} <strong className='text-light'>{total}</strong>{' '}
        {results.modules}
      </span>
    </motion.div>
  );
};

export default ResultsCount;
