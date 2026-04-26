import TestimonialsSection from '@/sections/home/TestimonialsSection';
import HeroSection from '@/sections/home/HeroSection';
import IntroSection from '@/sections/home/IntroSection';
import { FeatureCarousel } from '@/sections/home/FeatureCarouselSection';
import CTASection from '@/sections/home/CTASection';
import ExploreHomesSection from '@/sections/home/ExploreHomesSection';
import WhyModularPanelizedSection from '@/sections/home/WhyModularPanelizedSection';
import OurProcessSection from '@/sections/shared/OurProcessSection';
import FAQSection from '@/sections/home/FAQSection';
import ExperienceSection from '@/sections/home/ExperienceSection';
import { getContent, getModules } from '@/lib/content';
import type { Metadata } from 'next';
import Page from '@/components/Page';
import { generateSocialMetadata } from '@/lib/metadata';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('home', 'en');
  return generateSocialMetadata({
    title: 'Modular & Panelized Homes California | Fast Struct',
    description:
      'Fast Struct builds modular and panelized steel homes in California with factory precision and streamlined delivery.',
    image: content.metadataImage,
    url: '/',
  });
}

const HomePage = async () => {
  const content = await getContent('home', 'en');
  const processContent = await getContent('process', 'en');
  const modulesData = await getModules();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const organizationId = `${siteUrl}/#organization`;

  const homeSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Fast Struct',
      inLanguage: 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': organizationId,
      name: 'Fast Struct',
      url: siteUrl,
      image: `${siteUrl}${content.metadataImage}`,
      description:
        'Modular and panelized steel home construction services across California.',
      areaServed: 'California',
      serviceType: ['Modular Construction', 'Panelized Construction'],
    },
  ];

  return (
    <Page className='bg-dark text-cream'>
      <JsonLd data={homeSchema} />
      {/* Hero Section */}
      <HeroSection {...content.heroSection} />

      {/* Intro Section */}
      <IntroSection {...content.intro} />

      {/* Feature Carousel Section */}
      <FeatureCarousel features={content.features} />

      {/* Experience Section */}
      <ExperienceSection experienceData={content.experienceMetrics} />

      {/* CTA Section */}
      <CTASection {...content.cta} />

      {/* Explore Homes Section */}
      <ExploreHomesSection featuredModules={modulesData} />

      {/* Why Modular & Panelized Section */}
      <WhyModularPanelizedSection {...content.whyModularPanelized} />

      {/* Our Process Section */}
      <OurProcessSection {...processContent} />

      {/* Testimonial Section */}
      <TestimonialsSection
        testimonials={content.testimonials}
        backgroundImage={content.testimonialsBackgroundImage}
      />

      {/* FAQ Section */}
      <FAQSection {...content.faq} />
    </Page>
  );
};

export default HomePage;
