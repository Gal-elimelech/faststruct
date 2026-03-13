'use client';

import { ISort, ISortOption } from '@/types/modulesPage';
import clsx from 'clsx';

interface SortSelectProps {
  sort: ISort;
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
}

const SortSelect = ({ sort, value, onChange, ariaLabel }: SortSelectProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <label
        htmlFor='sort-select'
        className='text-light/80 text-xs font-medium whitespace-nowrap'>
        {sort.label}:
      </label>
      <select
        id='sort-select'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel || sort.label}
        className={clsx(
          'bg-dark/40 text-light rounded-full px-3 py-1.5 text-xs font-bold uppercase transition-colors duration-200',
          'border-light/20 focus:border-accent focus:ring-accent focus:ring-offset-dark border focus:ring-2 focus:ring-offset-2 focus:outline-none',
          'hover:bg-dark/60 cursor-pointer'
        )}>
        {sort.options.map((option: ISortOption) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelect;
