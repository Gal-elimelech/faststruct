'use client';

import FilterBar from './components/FilterBar';
import SearchInput from './components/SearchInput';
import { IModulesPageContent, IFilterState } from '@/types/modulesPage';

interface ModulesFilterSectionProps {
  content: IModulesPageContent;
  filterState: IFilterState;
  onFilterChange: (key: keyof IFilterState, value: string) => void;
  onClearAll: () => void;
  activeFilterCount: number;
}

const ModulesFilterSection = ({
  content,
  filterState,
  onFilterChange,
  onClearAll,
  activeFilterCount,
}: ModulesFilterSectionProps) => {
  return (
    <section className='bg-dark container-padding text-light pb-0'>
      <div className='flex flex-col gap-4'>
        {/* Search Input */}
        <div className='flex-1 lg:max-w-md'>
          <SearchInput
            search={content.search}
            value={filterState.search}
            onChange={(value) => onFilterChange('search', value)}
          />
        </div>

        {/* Filter Bar with Sort */}
        <div className='mt-3'>
          <FilterBar
            filters={content.filters}
            filterState={filterState}
            onFilterChange={onFilterChange}
            onClearAll={onClearAll}
            activeFilterCount={activeFilterCount}
            sort={content.sort}
            sortValue={filterState.sort}
            onSortChange={(value) => onFilterChange('sort', value)}
          />
        </div>
      </div>
    </section>
  );
};

export default ModulesFilterSection;
