'use client';

import { motion, AnimatePresence } from 'motion/react';
import FilterChip from './FilterChip';
import { IFilters, IFilterState, ISort } from '@/types/modulesPage';
import clsx from 'clsx';
import SortSelect from './SortSelect';
import { useFilterDrawer } from '@/hooks/useFilterDrawer';
import { useFilterHandlers } from '@/hooks/useFilterHandlers';

interface FilterBarProps {
  filters: IFilters;
  filterState: IFilterState;
  onFilterChange: (key: keyof IFilterState, value: string) => void;
  onClearAll: () => void;
  activeFilterCount: number;
  sort: ISort;
  sortValue: string;
  onSortChange: (value: string) => void;
}

const FilterBar = ({
  filters,
  filterState,
  onFilterChange,
  onClearAll,
  activeFilterCount,
  sort,
  sortValue,
  onSortChange,
}: FilterBarProps) => {
  const { isOpen, toggle, isMobile } = useFilterDrawer();
  const { handleBedroomChange, handleBathroomChange, handleSizeChange } =
    useFilterHandlers(onFilterChange);

  return (
    <div className='bg-dark border-light/10 sticky top-0 z-40 border-b pb-4'>
      {/* Mobile Header */}
      {isMobile && (
        <div className='mb-3 flex items-center justify-between'>
          <button
            type='button'
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls='filter-content'
            className='text-h6 text-light focus:ring-accent focus:ring-offset-dark flex items-center gap-2 rounded px-2 py-1 focus:ring-2 focus:ring-offset-2 focus:outline-none'>
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className='bg-accent text-dark rounded-full px-2 py-0.5 text-xs font-bold'>
                {activeFilterCount}
              </span>
            )}
            <i
              className={clsx(
                'fa-solid transition-transform duration-200',
                isOpen ? 'fa-chevron-up' : 'fa-chevron-down'
              )}
              aria-hidden='true'></i>
          </button>
          {activeFilterCount > 0 && (
            <button
              type='button'
              onClick={onClearAll}
              className='text-h6 text-light/80 hover:text-light focus:ring-accent focus:ring-offset-dark rounded px-2 py-1 underline focus:ring-2 focus:ring-offset-2 focus:outline-none'>
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <div className='mb-3 flex flex-wrap items-center gap-5'>
          <h2 className='text-h5 font-bebas text-light uppercase'>Filters</h2>
          {activeFilterCount > 0 && (
            <button
              type='button'
              onClick={onClearAll}
              className='text-light/80 hover:text-light focus:ring-accent focus:ring-offset-dark rounded px-2 py-1 underline focus:ring-2 focus:ring-offset-2 focus:outline-none'>
              Clear all ({activeFilterCount})
            </button>
          )}
        </div>
      )}

      {/* Filter Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id='filter-content'
            initial={isMobile ? { height: 0, opacity: 0 } : false}
            animate={isMobile ? { height: 'auto', opacity: 1 } : {}}
            exit={isMobile ? { height: 0, opacity: 0 } : {}}
            transition={{ duration: 0.3 }}>
            <div
              className={clsx('flex', {
                'flex-col gap-4': isMobile,
                'flex-row items-start gap-6': !isMobile,
              })}>
              {/* Bedrooms Filter */}
              <div className='flex flex-col items-start gap-2'>
                <h3 className='text-light/80 text-xs font-medium whitespace-nowrap'>
                  {filters.bedrooms.label}:
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {filters.bedrooms.options.map((option) => (
                    <FilterChip
                      key={option}
                      label={option}
                      isActive={
                        option === 'All'
                          ? !filterState.bedrooms
                          : filterState.bedrooms === option
                      }
                      onClick={() => handleBedroomChange(option)}
                      ariaLabel={`Filter by ${option} ${filters.bedrooms.label.toLowerCase()}`}
                    />
                  ))}
                </div>
              </div>

              {/* Divider */}
              {!isMobile && (
                <div className='bg-light/20 h-12 w-px' aria-hidden='true'></div>
              )}

              {/* Bathrooms Filter */}
              <div className='flex flex-col items-start gap-2'>
                <h3 className='text-light/80 text-xs font-medium whitespace-nowrap'>
                  {filters.bathrooms.label}:
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {filters.bathrooms.options.map((option) => (
                    <FilterChip
                      key={option}
                      label={option}
                      isActive={
                        option === 'All'
                          ? !filterState.bathrooms
                          : filterState.bathrooms === option
                      }
                      onClick={() => handleBathroomChange(option)}
                      ariaLabel={`Filter by ${option} ${filters.bathrooms.label.toLowerCase()}`}
                    />
                  ))}
                </div>
              </div>

              {/* Divider */}
              {!isMobile && (
                <div className='bg-light/20 h-12 w-px' aria-hidden='true'></div>
              )}

              {/* Size Filter */}
              <div className='flex flex-col items-start gap-2'>
                <h3 className='text-light/80 text-xs font-medium whitespace-nowrap'>
                  {filters.size.label}:
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {filters.size.ranges.map((range) => (
                    <FilterChip
                      key={range.label}
                      label={range.label}
                      isActive={
                        range.label === 'All'
                          ? !filterState.size
                          : filterState.size === `${range.min}-${range.max}`
                      }
                      onClick={() => handleSizeChange(range)}
                      ariaLabel={`Filter by ${range.label}`}
                    />
                  ))}
                </div>
              </div>

              {/* Divider */}
              {!isMobile && (
                <div className='bg-light/20 h-12 w-px' aria-hidden='true'></div>
              )}

              {/* Sort Select */}
              <div className='flex flex-col gap-2'>
                <SortSelect
                  sort={sort}
                  value={sortValue}
                  onChange={onSortChange}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;
