import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { IHeroSystem } from '@/types/theSystem';
import ArtDirectedHeroImage from '@/components/ArtDirectedHeroImage';

const HeroSystemSection = ({
  title,
  subtitle,
  backgroundImageDesktop,
  backgroundImageMobile,
}: IHeroSystem) => {
  return (
    <section className='bg-dark relative overflow-hidden p-0 text-white'>
      <div className='absolute inset-0'>
        <ArtDirectedHeroImage
          desktopSrc={backgroundImageDesktop}
          mobileSrc={backgroundImageMobile}
          alt='Fast Struct factory'
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
      </div>
    </section>
  );
};

export default HeroSystemSection;
