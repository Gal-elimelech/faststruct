import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import HeroContactSection from '@/sections/contact/HeroContactSection';
import ContactFormSection from '@/sections/contact/ContactFormSection';
import Page from '@/components/Page';
import { generateSocialMetadata } from '@/lib/metadata';
import { validatedEnv } from '@/lib/env';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('contact', 'en');
  return generateSocialMetadata({
    title: 'Contact Fast Struct | Modular Construction CA',
    description:
      'Contact Fast Struct to plan your modular or panelized build in California, from consultation through project delivery.',
    image: content.metadataImage,
    url: '/contact',
  });
}

export default async function Contact() {
  const content = await getContent('contact', 'en');
  const siteUrl = validatedEnv.siteUrl;
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Fast Struct',
    url: `${siteUrl}/contact`,
    image: `${siteUrl}${content.metadataImage}`,
    email: content.info.email,
    telephone: content.info.phone.display,
    areaServed: 'California',
    address: {
      '@type': 'PostalAddress',
      streetAddress: content.info.address.street,
      addressLocality: 'Santa Clara',
      addressRegion: 'CA',
      postalCode: '95054',
      addressCountry: 'US',
    },
  };

  return (
    <Page className='bg-dark'>
      <JsonLd data={contactSchema} />
      <HeroContactSection hero={content.hero} />
      <ContactFormSection form={content.form} info={content.info} />
    </Page>
  );
}
