import type { Metadata } from 'next';
import { Poppins, Bebas_Neue } from 'next/font/google';
import './globals.css';
import { ReactLenis } from 'lenis/react';
import AppNavigationProvider from '@/contexts/AppNavigationProvider';
import { generateSocialMetadata } from '@/lib/metadata';
import { validatedEnv } from '@/lib/env';
import Script from 'next/script';

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const fontBebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

export const metadata: Metadata = {
  metadataBase: new URL(validatedEnv.siteUrl),
  verification: {
    google: 'nF98nC7bk49lYVpfTPwW2iwQoG946vEGm9wVl3lzYU4',
  },
  ...generateSocialMetadata({
    title: 'Fast Struct | Modular & Panelized Homes CA',
    description:
      'Fast Struct builds modular and panelized steel homes in California with factory precision and faster timelines.',
    image: '/assets/hero-image.jpg',
    url: '/',
  }),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${fontPoppins.variable} ${fontBebasNeue.variable}`}>
        <Script id='google-tag-manager' strategy='afterInteractive'>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P458M4JF');
          `}
        </Script>

        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-P458M4JF'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <ReactLenis
          root
          options={{
            lerp: 0.08,
            smoothWheel: true,
            touchMultiplier: 2,
            wheelMultiplier: 1,
          }}>
          <AppNavigationProvider>
            {children}
          </AppNavigationProvider>
        </ReactLenis>
      </body >
    </html >
  );
}
