'use client';

import { useMemo } from 'react';
import { Section } from '@/components/Section';
import ModuleList from '@/sections/home/components/ModuleList';
import EmptyState from './components/EmptyState';
import ResultsCount from './components/ResultsCount';
import { IModule } from '@/types/modules';
import { IModulesPageContent } from '@/types/modulesPage';

interface ModulesGridSectionProps {
  modules: IModule[];
  allModules: IModule[];
  content: IModulesPageContent;
}

const ModulesGridSection = ({
  modules,
  allModules,
  content,
}: ModulesGridSectionProps) => {
  // Memoize results count to prevent unnecessary rerenders
  const resultsCount = useMemo(
    () => ({
      showing: modules.length,
      total: allModules.length,
    }),
    [modules.length, allModules.length]
  );

  return (
    <Section bgColor='dark' textColor='light' className='-my-16'>
      <div className='flex flex-col gap-8'>
        {/* Results Count */}
        <div className='flex items-center justify-between'>
          <ResultsCount
            showing={resultsCount.showing}
            total={resultsCount.total}
            results={content.results}
          />
        </div>

        {/* Empty State */}
        {modules.length === 0 && <EmptyState emptyState={content.emptyState} />}

        {/* Module Grid */}
        {modules.length > 0 && <ModuleList modules={modules} />}
      </div>
    </Section>
  );
};

export default ModulesGridSection;
