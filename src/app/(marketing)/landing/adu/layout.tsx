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
        ctaLink={content.heroSection.cta.link}
      />
      <main className='relative z-0'>{children}</main>
      <LandingFooter {...content.footer} />
    </>
  );
}
