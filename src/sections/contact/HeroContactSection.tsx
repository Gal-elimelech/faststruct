'use client';

import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { IContactHero } from '@/types/contact';

interface HeroContactSectionProps {
  hero: IContactHero;
}

const HeroContactSection = ({ hero }: HeroContactSectionProps) => {
  return (
    <section className='bg-dark relative flex min-h-[60vh] items-center justify-center pt-32'>
      <div className='container-padding mx-auto text-center'>
        <AnimatedHeading
          text={hero.title}
          className='text-h1 font-bebas text-light'
          revealColor='dark'
        />
        <FadeInParagraph className='text-h6 text-light/80 mx-auto max-w-2xl'>
          {hero.subtitle}
        </FadeInParagraph>
      </div>
    </section>
  );
};

export default HeroContactSection;
