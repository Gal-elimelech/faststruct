import { getContent } from '@/lib/content';
import LandingHeader from '@/components/navigation/LandingHeader';
import LandingFooter from '@/components/footer/LandingFooter';

export default async function LandingAduLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent('landingAdu', 'en');

  return (
    <>
      <LandingHeader
        phone={content.heroSection.phoneCta.text}
        phoneLink={content.heroSection.phoneCta.link}
        ctaLink={content.heroSection.cta.link}
        ctaText={content.heroSection.cta.text}
      />
      <main className='relative z-0'>{children}</main>
      <LandingFooter {...content.footer} />
      {/* Scroll clearance so the fixed bottom CTA bar never covers footer content */}
      <div aria-hidden className='h-20 bg-dark' />
    </>
  );
}
