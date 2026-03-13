'use client';

import Image from 'next/image';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { IHeroAbout } from '@/types/about';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { WhereInnovation } from './components/WhereInnovationMeatsHome';

const HeroAboutSection = ({ title, subtitle, backgroundImage }: IHeroAbout) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['end end', 'end start'],
  });

  const topLineY = useTransform(scrollYProgress, [0, 0.5, 1], [120, 0, 0]);

  return (
    <section
      ref={sectionRef}
      className='bg-dark relative overflow-hidden p-0 text-white'>
      <div className='absolute inset-0'>
        <Image
          fill
          priority
          src={backgroundImage}
          alt='About us'
          sizes='100vw'
          className='object-cover object-center'
        />
        <div className='from-dark absolute inset-0 bg-linear-to-t to-transparent to-50%' />
      </div>

      {/* Bottom-left text overlay */}
      <div className='absolute right-0 left-0 h-screen'>
        <div className='container-padding absolute bottom-4 left-0 z-10 w-full text-white md:bottom-8 md:w-2/3 lg:bottom-16 lg:w-1/2'>
          <AnimatedHeading
            text={title}
            className='text-h1 font-bebas tracking-wider'
          />
          <FadeInParagraph className='text-h6 text-light'>
            {subtitle}
          </FadeInParagraph>
        </div>
      </div>
      {/* section height placeholder */}
      <div className='opacity-0'>
        <div className='h-screen'></div>
        <WhereInnovation className='w-full md:w-2/3 lg:w-1/2' />
      </div>
      {/* Bottom headline - scroll-driven animation */}
      <div className='absolute bottom-0 left-0 z-10 w-full overflow-hidden'>
        <motion.div
          style={{ y: topLineY }}
          className='flex w-full justify-center'>
          <WhereInnovation className='w-full md:w-2/3 lg:w-1/2' />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroAboutSection;
