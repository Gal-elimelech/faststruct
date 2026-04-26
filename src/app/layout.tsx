import type { Metadata } from 'next';
import { Poppins, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { ReactLenis } from 'lenis/react';
import AppNavigationProvider from '@/contexts/AppNavigationProvider';
import { generateSocialMetadata } from '@/lib/metadata';
import { validatedEnv } from '@/lib/env';

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
  ...generateSocialMetadata({
    title: 'Fast Struct | Modular & Panelized Homes CA',
    description:
      'Fast Struct builds modular and panelized steel homes in California with factory precision and faster timelines.',
    image: '/assets/hero-image.png',
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
        <Script
          src='https://kit.fontawesome.com/42dfb7600e.js'
          crossOrigin='anonymous'
        />
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
      </body>
    </html>
  );
}
