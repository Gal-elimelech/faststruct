import { useState, useMemo, useCallback } from 'react';
import { IFilterState } from '@/types/modulesPage';

/**
 * Custom hook to manage filter state (local state only, no URL sync)
 * @returns Filter state, handlers, and active filter count
 */
export function useFilterState() {
  const [filterState, setFilterState] = useState<IFilterState>({
    bedrooms: '',
    bathrooms: '',
    size: '',
    search: '',
    sort: 'default',
  });

  // Memoize handlers to prevent unnecessary rerenders
  const handleFilterChange = useCallback(
    (key: keyof IFilterState, value: string) => {
      setFilterState((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleClearAll = useCallback(() => {
    setFilterState({
      bedrooms: '',
      bathrooms: '',
      size: '',
      search: '',
      sort: 'default',
    });
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filterState.bedrooms) count++;
    if (filterState.bathrooms) count++;
    if (filterState.size) count++;
    if (filterState.search) count++;
    if (filterState.sort && filterState.sort !== 'default') count++;
    return count;
  }, [filterState]);

  return {
    filterState,
    handleFilterChange,
    handleClearAll,
    activeFilterCount,
  };
}

