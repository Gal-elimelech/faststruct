import { Suspense } from 'react';
import { getContent, getModules } from '@/lib/content';
import type { Metadata } from 'next';
import Page from '@/components/Page';
import HeroModulesSection from '@/sections/modules/HeroModulesSection';
import ModulesContent from '@/sections/modules/ModulesContent';
import LoadingSkeleton from '@/sections/modules/components/LoadingSkeleton';
import { generateSocialMetadata } from '@/lib/metadata';
import { validatedEnv } from '@/lib/env';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('modulesPage', 'en');
  return generateSocialMetadata({
    title: 'Find Modern Modular Homes in California | Fast Struct',
    description:
      'Explore our wide range of modern modular housing in California. Whether you need a small ADU or a large family space, we have a layout just for you.',
    image: content.metadataImage,
    url: '/modules',
  });
}

const ModulesPage = async () => {
  const content = await getContent('modulesPage', 'en');
  const modulesData = await getModules();
  const siteUrl = validatedEnv.siteUrl;
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: `${siteUrl}/modules`,
    name: 'Fast Struct Modular Home Models',
    hasPart: {
      '@type': 'ItemList',
      itemListElement: modulesData.map((module, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/module/${module.slug}`,
        item: {
          '@type': 'Product',
          name: module.title,
          description: module.summary,
          image: `${siteUrl}${module.mainImage}`,
        },
      })),
    },
  };

  return (
    <Page className='bg-dark text-cream'>
      <JsonLd data={itemListSchema} />
      <h1 className='sr-only'>Modular Home Models in California</h1>
      <HeroModulesSection hero={content.hero} />
      <ModulesContent modules={modulesData} content={content} />
    </Page>
  );
};

export default ModulesPage;
