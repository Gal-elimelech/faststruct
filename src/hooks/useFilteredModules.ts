import { useMemo } from 'react';
import { IModule } from '@/types/modules';
import { IFilterState } from '@/types/modulesPage';

/**
 * Custom hook to filter modules based on filter state
 * @param modules - Array of modules to filter
 * @param filterState - Current filter state
 * @returns Filtered array of modules
 */
export function useFilteredModules(
  modules: IModule[],
  filterState: IFilterState
): IModule[] {
  return useMemo(() => {
    let filtered = [...modules];

    // Filter by bedrooms
    if (filterState.bedrooms) {
      if (filterState.bedrooms === '3+') {
        filtered = filtered.filter((m) => m.specs.bedrooms >= 3);
      } else {
        const bedrooms = parseInt(filterState.bedrooms, 10);
        filtered = filtered.filter((m) => m.specs.bedrooms === bedrooms);
      }
    }

    // Filter by bathrooms
    if (filterState.bathrooms) {
      if (filterState.bathrooms === '2+') {
        filtered = filtered.filter((m) => m.specs.bathrooms >= 2);
      } else {
        const bathrooms = parseInt(filterState.bathrooms, 10);
        filtered = filtered.filter((m) => m.specs.bathrooms === bathrooms);
      }
    }

    // Filter by size
    if (filterState.size) {
      const [min, max] = filterState.size.split('-').map(Number);
      filtered = filtered.filter(
        (m) => m.specs.areaSqft >= min && m.specs.areaSqft <= max
      );
    }

    // Filter by search
    if (filterState.search) {
      const searchLower = filterState.search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(searchLower) ||
          m.summary.toLowerCase().includes(searchLower) ||
          m.marketingDescription.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [modules, filterState]);
}

