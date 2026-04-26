import { getModules } from '@/lib/content';
import { notFound } from 'next/navigation';
import { isModulePageEnabled } from '@/lib/page-config';
import HeroProductSection from '@/sections/module/HeroProductSection';
import SpecificationsSection from '@/sections/module/SpecificationsSection';
import ProductDescriptionSection from '@/sections/module/ProductDescriptionSection';
import StackedImagesSection from '@/sections/module/StackedImagesSection';
import ExploreHomesSection from '@/sections/home/ExploreHomesSection';
import Page from '@/components/Page';
import { generateSocialMetadata } from '@/lib/metadata';
import { validatedEnv } from '@/lib/env';
import JsonLd from '@/components/seo/JsonLd';

interface ModulePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const modules = await getModules();
  return modules.map((module) => ({
    slug: module.slug,
  }));
}

export async function generateMetadata({ params }: ModulePageProps) {
  const { slug } = await params;
  const modules = await getModules();
  const module = modules.find((m) => m.slug === slug);

  if (!module) {
    return {
      ...generateSocialMetadata({
        title: 'Module Not Found | Fast Struct',
        description:
          'The requested module page is unavailable. Explore our available modular home models in California.',
        image: '/assets/hero-image.png',
        url: '/modules',
      }),
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return generateSocialMetadata({
    title: `${module.title} Modular Home | Fast Struct`,
    description: module.summary,
    image: module.mainImage,
    url: `/module/${slug}`,
  });
}

const ModulePage = async ({ params }: ModulePageProps) => {
  const { slug } = await params;

  if (!isModulePageEnabled()) {
    notFound();
  }

  const modulesList = await getModules();
  const currentModule = modulesList.find((m) => m.slug === slug);

  if (!currentModule) {
    notFound();
  }

  // Transform module data to match section props
  const heroData = {
    title: currentModule.title,
    subtitle: currentModule.summary,
    backgroundImage: currentModule.mainImage,
    mobileBackgroundImage: currentModule.mobileImage,
  };

  const specificationsData = {
    floorPlanImage: currentModule.sketchPlans[0] || currentModule.mainImage,
    floorPlanLabel: 'FLOOR PLAN',
    area: `${currentModule.specs.areaSqft} sq.ft.`,
    specs: [
      { label: 'SIZE (sqft)', value: currentModule.specs.areaSqft },
      { label: 'BEDROOM', value: currentModule.specs.bedrooms },
      { label: 'BATHROOMS', value: currentModule.specs.bathrooms },
      { label: 'MODULES', value: currentModule.specs.modulesCount },
    ],
  };

  const descriptionData = {
    image: currentModule.images[0] || currentModule.mainImage,
    paragraph: currentModule.marketingDescription,
  };

  const stackedImagesData = {
    images: currentModule.images.map((url, index) => ({
      url,
      alt: `${currentModule.title} - Image ${index + 1}`,
    })),
  };

  const exploreData = {
    title: 'EXPLORE OUR HOMES',
    subtitle:
      'Explore our range of models, each designed for flexibility and comfort.',
  };

  const otherModules = modulesList.filter((m) => m.slug !== slug);
  const siteUrl = validatedEnv.siteUrl;
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: currentModule.title,
    sku: currentModule.slug,
    category: 'Modular Home',
    description: currentModule.summary,
    image: currentModule.images.map((image) => `${siteUrl}${image}`),
    url: `${siteUrl}/module/${currentModule.slug}`,
    brand: {
      '@type': 'Brand',
      name: 'Fast Struct',
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Area (sqft)',
        value: currentModule.specs.areaSqft,
      },
      {
        '@type': 'PropertyValue',
        name: 'Bedrooms',
        value: currentModule.specs.bedrooms,
      },
      {
        '@type': 'PropertyValue',
        name: 'Bathrooms',
        value: currentModule.specs.bathrooms,
      },
    ],
  };

  return (
    <Page className='bg-dark'>
      <JsonLd data={productSchema} />
<<<<<<< HEAD
      <h1 className='sr-only'>{currentModule.title} Modular Home</h1>
=======
>>>>>>> 75ba8d0fbe04ae139428a325e85acb16b0cb3f41
      <HeroProductSection {...heroData} />
      <SpecificationsSection {...specificationsData} />
      <ProductDescriptionSection {...descriptionData} />
      <StackedImagesSection {...stackedImagesData} />
      <ExploreHomesSection
        featuredModules={otherModules}
        exploreContent={exploreData}
      />
    </Page>
  );
};

export default ModulePage;
