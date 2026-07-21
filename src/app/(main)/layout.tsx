import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import { getContent } from '@/lib/content';
import WebsiteLoader from '@/components/website-loader/WebsiteLoader';
import StickyCTA from '@/sections/landing/components/StickyCTA';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactContent = await getContent('contact', 'en');

  return (
    <>
      <WebsiteLoader>
        <Navbar phone={contactContent.info.phone} />
        <main className='relative z-0'>{children}</main>
        <Footer
          contactInfo={contactContent.info}
          contactSocial={contactContent.social}
        />
        <StickyCTA
          phone={contactContent.info.phone.display}
          estimateHref='/contact'
          estimateText='Get Estimate'
        />
      </WebsiteLoader>
    </>
  );
}
