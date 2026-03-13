import { IFilterState } from '@/types/modulesPage';

/**
 * Custom hook to get filter state from URL search params
 * @returns Filter state derived from URL
 * @deprecated Currently returns empty state - URL sync disabled to prevent infinite loops
 */
export function useFilterStateFromURL(): IFilterState {
  // TODO: Re-implement URL sync properly without causing infinite loops
  return {
    bedrooms: '',
    bathrooms: '',
    size: '',
    search: '',
    sort: 'default',
  };
}

