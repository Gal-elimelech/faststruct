import { getContent } from '@/lib/content';
import HeroAboutSection from '@/sections/about/HeroAboutSection';
import AboutIntroSection from '@/sections/about/AboutIntroSection';
import ImageTextSection from '@/sections/about/ImageTextSection';
import FeaturesGridSection from '@/sections/about/FeaturesGridSection';
import { isPageEnabled } from '@/lib/page-config';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Page from '@/components/Page';
import { generateSocialMetadata } from '@/lib/metadata';
import { validatedEnv } from '@/lib/env';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('about', 'en');
  return generateSocialMetadata({
    title: 'About Fast Struct | California Modular Experts',
    description:
      'Learn how Fast Struct delivers precision modular and panelized construction across California with speed, quality, and trust.',
    image: content.hero.backgroundImage,
    url: '/about',
  });
}

const AboutPage = async () => {
  if (!isPageEnabled('/about')) {
    notFound();
  }

  const content = await getContent('about', 'en');
  const siteUrl = validatedEnv.siteUrl;
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${siteUrl}/about`,
    name: 'About Fast Struct',
    description: content.hero.subtitle,
    about: {
      '@type': 'Organization',
      name: 'Fast Struct',
      url: siteUrl,
    },
  };

  return (
    <Page className='bg-dark'>
      <JsonLd data={aboutSchema} />
      <h1 className='sr-only'>About Fast Struct</h1>
      <HeroAboutSection {...content.hero} />
      <AboutIntroSection {...content.about} />
      <ImageTextSection {...content.imageText} />
      <FeaturesGridSection {...content.featuresGrid} />
    </Page>
  );
};

export default AboutPage;
