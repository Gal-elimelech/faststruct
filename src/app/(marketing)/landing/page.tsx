import { getContent } from '@/lib/content';
import type { Metadata } from 'next';
import Page from '@/components/Page';
import { generateSocialMetadata } from '@/lib/metadata';
import HeroLandingSection from '@/sections/landing/HeroLandingSection';
import ValuePropSection from '@/sections/landing/ValuePropSection';
import LeadCaptureSection from '@/sections/landing/LeadCaptureSection';
import CompanyOverviewSection from '@/sections/landing/CompanyOverviewSection';
import ServicesOverviewSection from '@/sections/landing/ServicesOverviewSection';
import ConstructionMethodsSection from '@/sections/landing/ConstructionMethodsSection';
import LandingGallerySection from '@/sections/landing/LandingGallerySection';
import DifferentiatorsSection from '@/sections/landing/DifferentiatorsSection';
import TestimonialsSection from '@/sections/home/TestimonialsSection';
import LandingProcessSection from '@/sections/landing/LandingProcessSection';
import LandingLocationSection from '@/sections/landing/LandingLocationSection';
import StickyCTA from '@/sections/landing/components/StickyCTA';
import { isPageEnabled } from '@/lib/page-config';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('landing', 'en');
  return generateSocialMetadata({
    title: 'Custom ADUs | Fast Struct',
    description: content.heroSection.subtitle,
    image: content.metadataImage,
    url: '/landing',
  });
}

const LandingPage = async () => {
  if (!isPageEnabled('/landing')) {
    notFound();
  }

  const content = await getContent('landing', 'en');

  return (
    <Page className='bg-dark text-cream relative'>
      <section id="heroSection">
        <HeroLandingSection {...content.heroSection} />
      </section>

      <section id="valueProp">
        <ValuePropSection {...content.valueProp} />
      </section>

      <section id="leadCapture">
        <LeadCaptureSection {...content.leadCapture} />
      </section>

      <section id="companyOverview">
        <CompanyOverviewSection {...content.companyOverview} />
      </section>

      <section id="servicesOverview">
        <ServicesOverviewSection {...content.servicesOverview} />
      </section>

      <section id="constructionMethods">
        <ConstructionMethodsSection {...content.constructionMethods} />
      </section>

      <section id="processTimeline">
        <LandingProcessSection {...content.processTimeline} />
      </section>

      <section id="differentiators">
        <DifferentiatorsSection {...content.differentiators} />
      </section>

      <section id="testimonials">
        <TestimonialsSection
          testimonials={content.testimonials}
          backgroundImage={content.heroSection.backgroundImage}
        />
      </section>

      <section id="gallery">
        <LandingGallerySection gallery={content.gallery} />
      </section>

      <section id="location">
        <LandingLocationSection {...content.location} />
      </section>

      <LeadCaptureSection
        {...content.leadCapture}
        title="Ready to Build Your ADU?"
        subtitle="Get a free estimate and see how we can bring your vision to life in 90 days."
      />

      <StickyCTA phone={content.heroSection.phoneCta.text} />
    </Page>
  );
};

export default LandingPage;
