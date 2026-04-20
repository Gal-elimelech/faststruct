import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import HeroContactSection from '@/sections/contact/HeroContactSection';
import ContactFormSection from '@/sections/contact/ContactFormSection';
import Page from '@/components/Page';
import { generateSocialMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('contact', 'en');
  return generateSocialMetadata({
    title: 'Contact Us | Fast Struct',
    description:
      'Get in touch with Fast Struct to start your modular and panelized construction project. We handle everything from consultation to completion.',
    image: content.metadataImage,
    url: '/contact',
  });
}

export default async function Contact() {
  const content = await getContent('contact', 'en');

  return (
    <Page className='bg-dark'>
      <HeroContactSection hero={content.hero} />
      <ContactFormSection form={content.form} info={content.info} />
    </Page>
  );
}
