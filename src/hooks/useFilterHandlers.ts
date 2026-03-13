import { useCallback } from 'react';
import { IFilterState } from '@/types/modulesPage';

/**
 * Custom hook to create filter change handlers
 * @param onFilterChange - Callback function to handle filter changes
 * @returns Object with handler functions for each filter type
 */
export function useFilterHandlers(
  onFilterChange: (key: keyof IFilterState, value: string) => void
) {
  const handleBedroomChange = useCallback(
    (value: string) => {
      onFilterChange('bedrooms', value === 'All' ? '' : value);
    },
    [onFilterChange]
  );

  const handleBathroomChange = useCallback(
    (value: string) => {
      onFilterChange('bathrooms', value === 'All' ? '' : value);
    },
    [onFilterChange]
  );

  const handleSizeChange = useCallback(
    (range: { label: string; min: number; max: number }) => {
      onFilterChange(
        'size',
        range.label === 'All' ? '' : `${range.min}-${range.max}`
      );
    },
    [onFilterChange]
  );

  return {
    handleBedroomChange,
    handleBathroomChange,
    handleSizeChange,
  };
}

