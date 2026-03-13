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
  const modulee = modules.find((m) => m.slug === slug);

  if (!modulee) {
    return {
      title: 'Module Not Found',
    };
  }

  return generateSocialMetadata({
    title: `${modulee.title} | Fast Struct`,
    description: modulee.summary,
    image: modulee.mainImage,
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

  return (
    <Page className='bg-dark'>
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
