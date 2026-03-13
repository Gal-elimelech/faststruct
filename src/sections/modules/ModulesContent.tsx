'use client';

import ModulesFilterSection from './ModulesFilterSection';
import ModulesGridSection from './ModulesGridSection';
import { IModule } from '@/types/modules';
import { IModulesPageContent } from '@/types/modulesPage';
import { useFilterState } from '@/hooks/useFilterState';
import { useFilteredModules } from '@/hooks/useFilteredModules';
import { useSortedModules } from '@/hooks/useSortedModules';

interface ModulesContentProps {
  modules: IModule[];
  content: IModulesPageContent;
}

/**
 * Client component that manages filter state and connects filter section with grid section
 * This prevents unnecessary rerenders by memoizing filtered and sorted results
 */
const ModulesContent = ({ modules, content }: ModulesContentProps) => {
  const { filterState, handleFilterChange, handleClearAll, activeFilterCount } =
    useFilterState();

  // Memoize filtered modules to prevent unnecessary recalculations
  const filteredModules = useFilteredModules(modules, filterState);

  // Memoize sorted modules based on filtered results
  const sortedModules = useSortedModules(filteredModules, filterState.sort);

  return (
    <>
      <ModulesFilterSection
        content={content}
        filterState={filterState}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        activeFilterCount={activeFilterCount}
      />
      <ModulesGridSection
        modules={sortedModules}
        allModules={modules}
        content={content}
      />
    </>
  );
};

export default ModulesContent;
