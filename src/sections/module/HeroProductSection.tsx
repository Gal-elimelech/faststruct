'use client';

import Image from 'next/image';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import Parallax from '@/components/Parallax';
import { IHeroProduct } from '@/types/product';
import { Section } from '@/components/Section';

const HeroProductSection = ({
  title,
  subtitle,
  backgroundImage,
}: IHeroProduct) => {
  return (
    <Section
      bgColor='dark'
      textColor='white'
      className='relative h-screen overflow-hidden p-0'>
      {/* Background Image with Parallax */}
      <Parallax
        className='absolute inset-0'
        startRange={0}
        endRange={-30}
        unitType='%'
        offset={['start start', 'end end']}>
        <div className='relative h-full w-full'>
          <Image
            src={backgroundImage}
            alt='Product hero background'
            fill
            sizes='100vw'
            className='object-cover object-center'
            priority
          />
          <div className='from-dark absolute inset-0 bg-linear-to-t to-transparent to-50%' />
        </div>
      </Parallax>

      {/* Bottom-left text overlay */}
      <div className='container-padding absolute bottom-4 left-0 z-10 w-full text-white md:bottom-8 md:w-2/3 lg:bottom-16 lg:w-1/2'>
        <AnimatedHeading
          text={title}
          className='text-h1 font-bebas tracking-wider'
        />
        <FadeInParagraph className='text-h6 text-light'>
          {subtitle}
        </FadeInParagraph>
      </div>
    </Section>
  );
};

export default HeroProductSection;
