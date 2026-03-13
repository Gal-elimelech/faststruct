'use client';

import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import IntroSectionImage from './components/IntroSectionImage';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { IIntro } from '@/types/home';
import { useRef } from 'react';

const IntroSection: React.FC<IIntro> = ({ text, introImage }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <Section
      ref={sectionRef}
      bgColor='dark'
      textColor='light'
      className='relative z-10 overflow-x-clip'>
      <div className='relative flex flex-col items-center justify-between gap-8 lg:flex-row-reverse'>
        <IntroSectionImage parentRef={sectionRef} imageUrl={introImage} />
        <div className='z-10 flex basis-2/3 flex-col gap-4 overflow-y-clip'>
          <AnimatedHeading
            text='More Than Just Construction'
            className='text-h2 font-bebas text-light'
            revealColor='dark'
          />
          <FadeInParagraph className='text-h6 text-light'>
            {text}
          </FadeInParagraph>
        </div>
      </div>
    </Section>
  );
};

export default IntroSection;
