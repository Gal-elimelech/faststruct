'use client';

import { Section } from '@/components/Section';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { IAbout } from '@/types/about';
import Parallax from '@/components/Parallax';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { MeatsHome } from './components/WhereInnovationMeatsHome';

const AboutIntroSection = ({ paragraph }: IAbout) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start center'],
  });

  const bottomLineY = useTransform(scrollYProgress, [0, 1], [-120, 0]);

  return (
    <Section
      ref={sectionRef}
      className='bg-dark relative text-center text-white'>
      {/* Top headline - scroll-driven animation */}
      <div className='absolute top-0 left-0 w-full overflow-hidden'>
        <motion.div
          style={{ y: bottomLineY }}
          className='flex w-full justify-center'>
          <MeatsHome className='w-full md:w-2/3 lg:w-1/2' />
        </motion.div>
      </div>

      {/* Paragraph content */}
      <div className='pt-16 md:pt-24'>
        <Parallax
          ref={sectionRef}
          className='mx-auto max-w-4xl'
          startRange={50}
          endRange={-50}
          unitType='px'
          offset={['start end', 'end start']}>
          <FadeInParagraph className='text-h4 text-light leading-tight'>
            {paragraph}
          </FadeInParagraph>
        </Parallax>
      </div>
    </Section>
  );
};

export default AboutIntroSection;
