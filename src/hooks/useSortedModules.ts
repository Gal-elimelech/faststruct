import { useMemo } from 'react';
import { IModule } from '@/types/modules';
import { SortOption } from '@/types/modulesPage';

/**
 * Custom hook to sort modules based on sort option
 * @param modules - Array of modules to sort
 * @param sortOption - Sort option to apply
 * @returns Sorted array of modules
 */
export function useSortedModules(
  modules: IModule[],
  sortOption: string
): IModule[] {
  return useMemo(() => {
    const sorted = [...modules];
    const option = sortOption as SortOption;

    switch (option) {
      case 'size-asc':
        return sorted.sort((a, b) => a.specs.areaSqft - b.specs.areaSqft);
      case 'size-desc':
        return sorted.sort((a, b) => b.specs.areaSqft - a.specs.areaSqft);
      case 'bedrooms-asc':
        return sorted.sort((a, b) => a.specs.bedrooms - b.specs.bedrooms);
      case 'bedrooms-desc':
        return sorted.sort((a, b) => b.specs.bedrooms - a.specs.bedrooms);
      default:
        return sorted;
    }
  }, [modules, sortOption]);
}

