'use client';

import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { ITwoPaths } from '@/types/theSystem';
import ConstructionRouteCard from './components/ConstructionRouteCard';

interface TwoPathsSectionProps {
  twoPaths: ITwoPaths;
}

const TwoPathsSection = ({ twoPaths }: TwoPathsSectionProps) => {
  return (
    <Section bgColor='white' textColor='dark'>
      <div className='container-padding flex flex-col gap-8'>
        <div className='text-center'>
          <AnimatedHeading
            text={twoPaths.title}
            className='text-h1 font-bebas text-dark mb-4'
            revealColor='white'
          />
          <FadeInParagraph className='text-h6 text-dark/80 mx-auto max-w-3xl'>
            {twoPaths.subtitle}
          </FadeInParagraph>
        </div>

        <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-2'>
          <ConstructionRouteCard route={twoPaths.modular} />
          <ConstructionRouteCard route={twoPaths.panelized} />
        </div>
      </div>
    </Section>
  );
};

export default TwoPathsSection;
