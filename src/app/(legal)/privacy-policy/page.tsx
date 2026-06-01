import type { Metadata } from 'next';
import Page from '@/components/Page';
import { getContent } from '@/lib/content';
import { generateSocialMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateSocialMetadata({
  title: 'Fast Struct Privacy Policy | How We Handle Your Information',
  description:
    'Read our privacy policy to learn how we protect your personal data. We clearly explain how we collect, use, and keep your information safe. Learn more.',
  image: '/assets/hero-image.jpg',
  url: '/privacy-policy',
});

export default async function PrivacyPolicyPage() {
  const content = await getContent('privacyPolicy', 'en');
  const renderContactLine = (line: string) => {
    const trimmedLine = line.trim();

    if (trimmedLine.includes('@') && !trimmedLine.includes(' ')) {
      return (
        <a className='underline underline-offset-4 hover:text-light' href={`mailto:${trimmedLine}`}>
          {trimmedLine}
        </a>
      );
    }

    if (/^[()\d\s-]+$/.test(trimmedLine)) {
      const telValue = trimmedLine.replace(/[^\d+]/g, '');
      return (
        <a className='no-swap underline underline-offset-4 hover:text-light' href={`tel:${telValue}`}>
          {trimmedLine}
        </a>
      );
    }

    if (/^\d/.test(trimmedLine)) {
      const encodedAddress = encodeURIComponent(trimmedLine);
      return (
        <a
          className='underline underline-offset-4 hover:text-light'
          href={`https://maps.google.com/?q=${encodedAddress}`}
          rel='noopener noreferrer'
          target='_blank'
        >
          {trimmedLine}
        </a>
      );
    }

    return trimmedLine;
  };

  return (
    <Page className='bg-dark text-light'>
      <section className='container-padding py-24 md:py-32'>
        <div className='mx-auto max-w-4xl space-y-8'>
          <header className='space-y-3'>
            <h1 className='text-h2 font-bebas uppercase'>{content.title}</h1>
            <p className='text-sm text-light/70'>Last updated: {content.lastUpdated}</p>
            {content.intro ? <p className='text-light/85'>{content.intro}</p> : null}
          </header>

          <div className='space-y-8'>
            {content.sections.map((section) => (
              <article key={section.title} className='space-y-3'>
                <h2 className='text-h4 font-bebas uppercase'>{section.title}</h2>
                <div className='space-y-3 text-light/80'>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>
                      {section.title === 'Contact Information'
                        ? renderContactLine(paragraph)
                        : paragraph}
                    </p>
                  ))}
                  {section.listItems?.length ? (
                    <ul className='list-disc space-y-2 pl-6'>
                      {section.listItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
