import { Suspense } from 'react';
import { getContent, getModules } from '@/lib/content';
import type { Metadata } from 'next';
import Page from '@/components/Page';
import HeroModulesSection from '@/sections/modules/HeroModulesSection';
import ModulesContent from '@/sections/modules/ModulesContent';
import LoadingSkeleton from '@/sections/modules/components/LoadingSkeleton';
import { generateSocialMetadata } from '@/lib/metadata';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('modulesPage', 'en');
  return generateSocialMetadata({
    title: 'Modular Home Models in California | Fast Struct',
    description:
      'Browse Fast Struct modular home and ADU models in California, from compact studios to spacious family-ready layouts.',
    image: content.metadataImage,
    url: '/modules',
  });
}

const ModulesPage = async () => {
  const content = await getContent('modulesPage', 'en');
  const modulesData = await getModules();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
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
      <HeroModulesSection hero={content.hero} />
      <ModulesContent modules={modulesData} content={content} />
    </Page>
  );
};

export default ModulesPage;
