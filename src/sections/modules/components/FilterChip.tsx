'use client';

import { motion } from 'motion/react';
import clsx from 'clsx';

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  ariaLabel?: string;
}

const FilterChip = ({
  label,
  isActive,
  onClick,
  ariaLabel,
}: FilterChipProps) => {
  return (
    <motion.button
      type='button'
      onClick={onClick}
      aria-label={ariaLabel || `${label} filter`}
      aria-pressed={isActive}
      className={clsx(
        'focus:ring-accent focus:ring-offset-dark rounded-full px-3 py-1.5 text-xs font-bold uppercase transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none',
        {
          'bg-accent text-dark': isActive,
          'bg-dark/40 text-light hover:bg-dark/60': !isActive,
        }
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}>
      {label}
    </motion.button>
  );
};

export default FilterChip;
