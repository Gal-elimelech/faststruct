import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { IHeroProduct } from '@/types/product';
import { Section } from '@/components/Section';
import ArtDirectedHeroImage from '@/components/ArtDirectedHeroImage';

const HeroProductSection = ({
  title,
  subtitle,
  backgroundImage,
  mobileBackgroundImage,
}: IHeroProduct) => {
  return (
    <Section
      bgColor='dark'
      textColor='white'
      className='relative h-screen overflow-hidden p-0'>
      {/* Static hero background to reduce main-thread work at first paint */}
      <div className='absolute inset-0'>
        <ArtDirectedHeroImage
          desktopSrc={backgroundImage}
          mobileSrc={mobileBackgroundImage}
          alt={`${title} modular home exterior`}
          className='absolute inset-0 block h-full w-full'
          imgClassName='h-full w-full object-cover object-center'
          priority
          sizes='100vw'
          desktopWidth={1600}
          desktopHeight={900}
          mobileWidth={828}
          mobileHeight={1472}
        />
        <div className='from-dark absolute inset-0 bg-linear-to-t to-transparent to-50%' />
      </div>

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
