'use client';

import Image from 'next/image';
import TypingEffect from '@/components/text-animation/TypingEffect';
import { useRef } from 'react';
import Parallax from '@/components/Parallax';
import { UseScrollOptions } from 'motion/react';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { IHeroSection } from '@/types/home';

const HeroSection: React.FC<IHeroSection> = ({
  title,
  animatedWords,
  subtitle,
  heroImage,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const offset: UseScrollOptions['offset'] = ['center center', 'end start'];
  const unitType = 'px';

  return (
    <div ref={ref} className='bg-white pt-24 md:pt-32 lg:pt-[30vh]'>
      {/* Text container with parallax element */}
      <Parallax endRange={100} ref={ref} offset={offset} unitType={unitType}>
        {/* 
          UPDATED RESPONSIVE CLASSES:
          - Changed mobile padding from px-[12%] to px-6 to avoid squishing text on small screens.
          - Added gap-y-6 on mobile to ensure subtitle doesn't overlap with the H1/Title when parallax moves.
        */}
        <div className='flex flex-col gap-y-6 px-6 md:px-[12%] lg:justify-between xl:flex-row xl:items-end xl:gap-y-0'>
          
          <div className='flex flex-col items-start gap-y-2 md:gap-y-3'>
            {/* 1. SMALL H1 INSIDE A BADGE/BOX (Optimized margin for mobile) */}
            <h1 className='inline-block text-[10px] md:text-xs font-poppins font-semibold tracking-widest text-accent uppercase border border-accent/30 bg-accent/5 px-3 py-1 rounded-sm'>
              Modular and Panelized Steel Homes in California
            </h1>

            {/* 
              2. MAIN TAGLINE 
              - Changed 'whitespace-nowrap' to 'whitespace-normal' on mobile, and 'md:whitespace-nowrap' on desktop.
                This prevents the typing text from cutting off on narrow screens (as seen in image_2ec19b.jpg).
              - Adjusted mobile font size to look balanced.
            */}
            <div className='text-4xl sm:text-5xl md:text-h1 font-bebas text-dark whitespace-normal md:whitespace-nowrap uppercase leading-none'>
              {title}{' '}
              <TypingEffect strings={animatedWords} className='text-accent' />
            </div>
          </div>

          {/* Subtitle paragraph with explicit mobile top margin clearance if needed */}
          <FadeInParagraph className='text-base md:text-h6 font-poppins text-dark max-w-xl xl:mb-1'>
            {subtitle}
          </FadeInParagraph>
        </div>
      </Parallax>

      {/* Image container */}
      <div className='relative aspect-3/1 overflow-hidden mt-8 md:mt-0 md:mb-10'>
        <Image
          priority
          fill
          sizes='100vw'
          src={heroImage}
          alt='Modular and Panelized Steel Homes in California - Fast Struct'
          className='object-cover object-[50%_10px] md:object-[50%_20px]'
        />
      </div>
    </div>
  );
};

export default HeroSection;
