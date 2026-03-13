import type { Metadata } from 'next';
import { generateSocialMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateSocialMetadata({
  title: 'Coming Soon | Fast Struct',
  description: "We're working on something amazing. Our website will be ready soon!",
  image: '/assets/hero-image.png',
  url: '/coming-soon',
});

export default function ComingSoonPage() {
  return (
    <div className='bg-dark flex min-h-screen flex-col items-center justify-center px-4 text-center'>
      <div className='max-w-2xl'>
        {/* Illustration - building under construction */}
        <div className='mb-8 flex justify-center'>
          <svg
            width='200'
            height='200'
            viewBox='0 0 200 200'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='text-accent'>
            {/* Sun */}
            <circle cx='160' cy='40' r='25' fill='currentColor' opacity='0.3' />
            {/* Cloud */}
            <path
              d='M50 50 C45 50, 40 55, 40 60 C35 60, 30 65, 30 70 C30 75, 35 80, 40 80 C40 85, 45 90, 50 90 C55 90, 60 85, 60 80 C65 80, 70 75, 70 70 C70 65, 65 60, 60 60 C60 55, 55 50, 50 50 Z'
              fill='currentColor'
              opacity='0.2'
            />
            {/* Building structure */}
            <g transform='translate(100, 150)'>
              {/* Base */}
              <rect
                x='-40'
                y='20'
                width='80'
                height='20'
                rx='2'
                fill='currentColor'
                opacity='0.3'
              />
              {/* Main building */}
              <rect
                x='-35'
                y='-30'
                width='70'
                height='50'
                rx='2'
                fill='currentColor'
                opacity='0.4'
              />
              {/* Windows */}
              <rect
                x='-25'
                y='-20'
                width='15'
                height='15'
                rx='1'
                fill='currentColor'
                opacity='0.2'
              />
              <rect
                x='10'
                y='-20'
                width='15'
                height='15'
                rx='1'
                fill='currentColor'
                opacity='0.2'
              />
              <rect
                x='-25'
                y='0'
                width='15'
                height='15'
                rx='1'
                fill='currentColor'
                opacity='0.2'
              />
              <rect
                x='10'
                y='0'
                width='15'
                height='15'
                rx='1'
                fill='currentColor'
                opacity='0.2'
              />
              {/* Door */}
              <rect
                x='-8'
                y='5'
                width='16'
                height='15'
                rx='1'
                fill='currentColor'
                opacity='0.3'
              />
              {/* Crane */}
              <g transform='translate(50, -40)'>
                {/* Crane base */}
                <rect x='-3' y='0' width='6' height='30' fill='currentColor' opacity='0.4' />
                {/* Crane arm */}
                <line
                  x1='0'
                  y1='0'
                  x2='-30'
                  y2='-20'
                  stroke='currentColor'
                  strokeWidth='3'
                  opacity='0.4'
                />
                {/* Hook */}
                <circle cx='-30' cy='-20' r='3' fill='currentColor' opacity='0.5' />
              </g>
            </g>
          </svg>
        </div>

        {/* Heading */}
        <h1 className='text-h1 font-bebas text-light mb-4'>Coming Soon</h1>

        {/* Message */}
        <p className='text-h5 font-poppins text-light mb-8 font-extralight opacity-80'>
          We&apos;re working on something amazing. Our website will be ready soon!
        </p>

        {/* Sub message */}
        <p className='text-base font-poppins text-light/60 mb-12 font-extralight'>
          Stay tuned for something special.
        </p>
      </div>
    </div>
  );
}

