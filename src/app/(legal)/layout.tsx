import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import { getContent } from '@/lib/content';

export default async function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactContent = await getContent('contact', 'en');

  return (
    <>
      <Navbar />
      <main className='relative z-0'>{children}</main>
      <Footer
        contactInfo={contactContent.info}
        contactSocial={contactContent.social}
      />
    </>
  );
}
