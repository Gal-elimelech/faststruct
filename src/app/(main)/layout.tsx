import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import { getContent } from '@/lib/content';
import WebsiteLoader from '@/components/website-loader/WebsiteLoader';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactContent = await getContent('contact', 'en');

  return (
    <>
      <WebsiteLoader>
        <Navbar />
        <main className='relative z-0'>{children}</main>
        <Footer
          contactInfo={contactContent.info}
          contactSocial={contactContent.social}
        />
      </WebsiteLoader>
    </>
  );
}
