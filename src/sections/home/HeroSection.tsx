'use client';

import Image from 'next/image';
import TypingEffect from '@/components/text-animation/TypingEffect';
import { useRef } from 'react';
import Parallax from '@/components/Parallax';
import { UseScrollOptions } from 'motion/react';
import { useIsMobile } from '@/hooks/useIsMobile';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { IHeroSection } from '@/types/home';

const HeroSection: React.FC<IHeroSection> = ({
  title,
  animatedWords,
  subtitle,
  heroImage,
}) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const offset: UseScrollOptions['offset'] = [
    !isMobile ? 'center center' : '50% 30%',
    'end start',
  ];
  const unitType = 'px';

  return (
    <div ref={ref} className='bg-white pt-32 lg:pt-[30vh]'>
      {/* text container */}
      <Parallax endRange={100} ref={ref} offset={offset} unitType={unitType}>
        <div className='flex flex-col flex-wrap justify-end px-[12%] lg:justify-between xl:flex-row xl:items-end'>
          <h1 className='text-h1 font-bebas text-dark whitespace-nowrap uppercase'>
            {title}{' '}
            <TypingEffect strings={animatedWords} className='text-accent' />
          </h1>
          <FadeInParagraph className='text-h6 font-poppins text-dark max-w-xl'>
            {subtitle}
          </FadeInParagraph>
        </div>
      </Parallax>

      {/* image container */}
      <div className='relative aspect-[3/1] overflow-hidden md:mb-10'>
        <Image
          priority
          fill
          sizes='100vw'
          src={heroImage}
          alt='Modern modular home'
          className='object-cover object-[50%_10px] md:object-[50%_20px]'
        />
      </div>
    </div>
  );
};

export default HeroSection;
