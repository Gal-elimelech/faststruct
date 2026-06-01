import { getContent } from '@/lib/content';
import { isPageEnabled } from '@/lib/page-config';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Page from '@/components/Page';
import HeroSystemSection from '@/sections/the-system/HeroSystemSection';
import TwoPathsSection from '@/sections/the-system/TwoPathsSection';
import NineCoreSystemSection from '@/sections/the-system/NineCoreSystemSection';
import ScalableSolutionsSection from '@/sections/the-system/ScalableSolutionsSection';
import CustomizationSection from '@/sections/the-system/CustomizationSection';
import OurProcessSection from '@/sections/shared/OurProcessSection';
import { generateSocialMetadata } from '@/lib/metadata';
import { validatedEnv } from '@/lib/env';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('theSystem', 'en');
  return generateSocialMetadata({
    title: 'The System | California Construction Solutions & Process',
    description:
      'See how our lab-based construction solutions in California work. Moving production off-site means less chaos and a fast finish for your brand new home.',
    image: content.hero.backgroundImageDesktop,
    url: '/the-system',
  });
}

const TheSystemPage = async () => {
  if (!isPageEnabled('/the-system')) {
    notFound();
  }

  const content = await getContent('theSystem', 'en');
  const processContent = await getContent('process', 'en');
  const siteUrl = validatedEnv.siteUrl;
  const systemSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fast Struct Modular and Panelized Build System',
    provider: {
      '@type': 'Organization',
      name: 'Fast Struct',
      url: siteUrl,
    },
    url: `${siteUrl}/the-system`,
    description: content.hero.subtitle,
    areaServed: 'California',
    serviceType: ['Modular Construction', 'Panelized Construction'],
  };

  return (
    <Page className='bg-dark'>
      <JsonLd data={systemSchema} />
      <h1 className='sr-only'>How Fast Struct Works</h1>
      <HeroSystemSection {...content.hero} />
      <TwoPathsSection twoPaths={content.twoPaths} />
      {/* <NineCoreSystemSection nineCoreSystem={content.nineCoreSystem} /> */}
      <ScalableSolutionsSection scalableSolutions={content.scalableSolutions} />
      <CustomizationSection customization={content.customization} />
      <OurProcessSection {...processContent} />
    </Page>
  );
};

export default TheSystemPage;
