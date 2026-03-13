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

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('home', 'en');
  return generateSocialMetadata({
    title: 'Home | Fast Struct',
    description: content.heroSection.subtitle,
    image: content.metadataImage,
    url: '/',
  });
}

const HomePage = async () => {
  const content = await getContent('home', 'en');
  const processContent = await getContent('process', 'en');
  const modulesData = await getModules();

  return (
    <Page className='bg-dark text-cream'>
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
