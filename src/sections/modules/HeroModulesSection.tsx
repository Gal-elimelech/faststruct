import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { IHero } from '@/types/modulesPage';

interface HeroModulesSectionProps {
  hero: IHero;
}

const HeroModulesSection = ({ hero }: HeroModulesSectionProps) => {
  return (
    <Section bgColor='dark' textColor='light' className='-mb-8'>
      <div className='container-padding flex flex-col text-center'>
        <AnimatedHeading
          text={hero.title}
          className='text-h1 font-bebas text-light'
          revealColor='dark'
        />
        <FadeInParagraph className='text-h6 text-light mx-auto max-w-2xl'>
          {hero.subtitle}
        </FadeInParagraph>
      </div>
    </Section>
  );
};

export default HeroModulesSection;
