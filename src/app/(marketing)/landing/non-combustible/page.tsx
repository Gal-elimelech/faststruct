import { getContent } from '@/lib/content';
import type { Metadata } from 'next';
import Page from '@/components/Page';
import { generateSocialMetadata } from '@/lib/metadata';
import HeroLandingSection from '@/sections/landing/HeroLandingSection';
import FireFactsSection from '@/sections/landing/FireFactsSection';
import FireValuePropSection from '@/sections/landing/non-combustible/FireValuePropSection';
import LeadCaptureSection from '@/sections/landing/LeadCaptureSection';
import ComparisonSection from '@/sections/landing/ComparisonSection';
import FireCompanyOverviewSection from '@/sections/landing/non-combustible/FireCompanyOverviewSection';
import FireProcessSection from '@/sections/landing/non-combustible/FireProcessSection';
import LandingCtaBand from '@/sections/landing/components/LandingCtaBand';
import RebuildSection from '@/sections/landing/RebuildSection';
import FireDifferentiatorsSection from '@/sections/landing/non-combustible/FireDifferentiatorsSection';
import TestimonialsSection from '@/sections/home/TestimonialsSection';
import LandingGallerySection from '@/sections/landing/LandingGallerySection';
import LandingLocationSection from '@/sections/landing/LandingLocationSection';
import StickyCTA from '@/sections/landing/components/StickyCTA';

const PAGE_PATH = '/landing/non-combustible';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('landingNonCombustible', 'en');
  return generateSocialMetadata({
    title: 'Non-Combustible Steel Homes in California | Fast Struct',
    description:
      'Custom non-combustible homes with 100% steel framing, built for California fire country with factory precision and fast timelines.',
    image: content.metadataImage,
    url: PAGE_PATH,
  });
}

const LandingNonCombustiblePage = async () => {
  const content = await getContent('landingNonCombustible', 'en');
  const consent = await getContent('consent', 'en');

  return (
    <Page className='bg-dark text-light relative'>
      <section id='heroSection' className='z-20'>
        <HeroLandingSection {...content.heroSection} />
      </section>

      <section id='fireFacts'>
        <FireFactsSection {...content.fireFacts} />
      </section>

      <section id='valueProp' className='z-10'>
        <FireValuePropSection {...content.valueProp} />
      </section>

      <section id='lead-capture' className='scroll-mt-24'>
        <LeadCaptureSection
          {...content.leadCapture}
          consent={consent}
          defaultServiceType='New Home Construction'
        />
      </section>

      <section id='comparison'>
        <ComparisonSection {...content.comparison} />
      </section>

      <section id='companyOverview'>
        <FireCompanyOverviewSection {...content.companyOverview} />
      </section>

      <section id='processTimeline'>
        <FireProcessSection {...content.processTimeline} />
      </section>

      {content.processCta && <LandingCtaBand {...content.processCta} />}

      <section id='rebuild'>
        <RebuildSection {...content.rebuild} />
      </section>

      <section id='differentiators'>
        <FireDifferentiatorsSection {...content.differentiators} />
      </section>

      <section id='testimonials'>
        <TestimonialsSection
          testimonials={content.testimonials}
          backgroundImage='/assets/testimonials.jpg'
        />
      </section>

      <section id='gallery'>
        <LandingGallerySection {...content.gallery} />
      </section>

      {content.galleryCta && <LandingCtaBand {...content.galleryCta} />}

      <section id='location'>
        <LandingLocationSection {...content.location} />
      </section>

      <StickyCTA phone={content.heroSection.phoneCta.text} />
    </Page>
  );
};

export default LandingNonCombustiblePage;
