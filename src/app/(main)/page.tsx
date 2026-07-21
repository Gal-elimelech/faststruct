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
import { validatedEnv } from '@/lib/env';
import JsonLd from '@/components/seo/JsonLd';
import LandingCtaBand from '@/sections/landing/components/LandingCtaBand';

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
  const siteUrl = validatedEnv.siteUrl;

  // Dito sa loob ng array magkakasama na silang tatlo: WebSite, Business, at FAQs
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
      '@type': 'HomeAndConstructionBusiness',
      name: 'Fast Struct',
      url: 'https://www.faststruct.com/',
      telephone: '(408) 702-9012',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3395 Edward Ave',
        addressLocality: 'Santa Clara',
        addressRegion: 'CA',
        postalCode: '95054',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 37.386003,
        longitude: -121.940657,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is modular or panelized construction in California more expensive than traditional building?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not necessarily. Our modular and panelized construction methods in California offer faster timelines and efficient processes that often lower overall costs with complete transparency from the start.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will my home look like a “prefab box”?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No - every project is fully customizable in layout and finishes.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to build?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Typically 3-5 months from permit approval to completion.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you handle permits and approvals?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes - our team manages the entire process.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is modular/panelized construction durable?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely - built with light-gauge steel and high-performance materials for strength and longevity.',
          },
        },
      ],
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

      {content.midCta1 && <LandingCtaBand {...content.midCta1} />}

      {/* Our Process Section */}
      <OurProcessSection {...processContent} />

      {/* Testimonial Section */}
      <TestimonialsSection
        testimonials={content.testimonials}
        backgroundImage={content.testimonialsBackgroundImage}
      />

      {content.midCta2 && <LandingCtaBand {...content.midCta2} />}

      {/* FAQ Section */}
      <FAQSection {...content.faq} />
    </Page>
  );
};

export default HomePage;
