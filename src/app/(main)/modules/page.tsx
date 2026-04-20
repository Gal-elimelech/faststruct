import { Suspense } from 'react';
import { getContent, getModules } from '@/lib/content';
import type { Metadata } from 'next';
import Page from '@/components/Page';
import HeroModulesSection from '@/sections/modules/HeroModulesSection';
import ModulesContent from '@/sections/modules/ModulesContent';
import LoadingSkeleton from '@/sections/modules/components/LoadingSkeleton';
import { generateSocialMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('modulesPage', 'en');
  return generateSocialMetadata({
    title: 'Explore Our Modules | Fast Struct',
    description: content.hero.subtitle,
    image: content.metadataImage,
    url: '/modules',
  });
}

const ModulesPage = async () => {
  const content = await getContent('modulesPage', 'en');
  const modulesData = await getModules();

  return (
    <Page className='bg-dark text-cream'>
      <HeroModulesSection hero={content.hero} />
      <ModulesContent modules={modulesData} content={content} />
    </Page>
  );
};

export default ModulesPage;
