'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ISearch } from '@/types/modulesPage';
import clsx from 'clsx';

interface SearchInputProps {
  search: ISearch;
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
}

const SearchInput = ({
  search,
  value,
  onChange,
  debounceMs = 300,
}: SearchInputProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce the onChange callback
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue, debounceMs]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className='relative w-full'>
      <label htmlFor='search-input' className='sr-only'>
        {search.label}
      </label>
      <div className='relative'>
        <i
          className='fa-solid fa-magnifying-glass text-light/60 absolute top-1/2 left-4 -translate-y-1/2'
          aria-hidden='true'></i>
        <input
          id='search-input'
          type='text'
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={search.placeholder}
          aria-label={search.label}
          aria-describedby='search-description'
          className={clsx(
            'bg-dark/40 text-light border-light/20 w-full rounded-lg border px-12 py-3 pr-12 pl-12',
            'placeholder:text-light/40',
            'focus:border-accent focus:ring-accent focus:ring-offset-dark focus:ring-2 focus:ring-offset-2 focus:outline-none',
            'hover:bg-dark/60 transition-colors duration-200'
          )}
        />
        <AnimatePresence>
          {localValue && (
            <motion.button
              type='button'
              onClick={handleClear}
              aria-label='Clear search'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className='text-light/60 hover:text-light focus:ring-accent focus:ring-offset-dark absolute top-1/2 right-4 -translate-y-1/2 rounded transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none'>
              <i className='fa-solid fa-xmark' aria-hidden='true'></i>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <p id='search-description' className='sr-only'>
        {search.ariaDescription}
      </p>
    </div>
  );
};

export default SearchInput;
