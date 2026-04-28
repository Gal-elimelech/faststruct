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
import JsonLd from '@/components/seo/JsonLd';
import { validatedEnv } from '@/lib/env';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('landing', 'en');
  return generateSocialMetadata({
    title: 'Custom ADUs in the Bay Area | Fast Struct',
    description:
      'Design and build custom ADUs in the Bay Area with steel construction, factory precision, and faster project timelines.',
    image: content.metadataImage,
    url: '/landing',
  });
}

const LandingPage = async () => {
  if (!isPageEnabled('/landing')) {
    notFound();
  }

  const content = await getContent('landing', 'en');
  const siteUrl = validatedEnv.siteUrl;
  const landingSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Fast Struct ADU Services',
    url: `${siteUrl}/landing`,
    description: content.heroSection.subtitle,
    image: `${siteUrl}${content.metadataImage}`,
    areaServed: 'Bay Area, California',
    serviceType: ['Custom ADUs', 'Modular ADU Construction'],
    telephone: content.heroSection.phoneCta.text,
  };

  return (
    <Page className='bg-dark text-light relative'>
      <JsonLd data={landingSchema} />
      <section id="heroSection" className='z-20'>
        <HeroLandingSection {...content.heroSection} />
      </section>

      <section id="valueProp" className='z-10'>
        <ValuePropSection {...content.valueProp} />
      </section>

      <section id="lead-capture" className='scroll-mt-24'>
        <LeadCaptureSection
          {...content.leadCapture}
        />
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
          backgroundImage='/assets/testimonials.png'
        />
      </section>

      <section id="gallery">
        <LandingGallerySection gallery={content.gallery} />
      </section>

      <section id="location">
        <LandingLocationSection {...content.location} />
      </section>

      <StickyCTA phone={content.heroSection.phoneCta.text} />
    </Page>
  );
};

export default LandingPage;
