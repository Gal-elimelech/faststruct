'use client';

import { Section } from '@/components/Section';
import { IGalleryItem } from '@/types/landing';
import { useLandingGalleryCarousel } from '@/hooks/useLandingGalleryCarousel';
import LandingGalleryCard from './components/LandingGalleryCard';
import LandingGalleryArrows from './components/LandingGalleryArrows';

interface LandingGallerySectionProps {
  gallery: IGalleryItem[];
}

const LandingGallerySection: React.FC<LandingGallerySectionProps> = ({
  gallery,
}) => {
  const {
    trackItems,
    visibleCount,
    currentPosition,
    shouldCarousel,
    goToNext,
    goToPrevious,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
    handleTouchCancel,
  } = useLandingGalleryCarousel({ gallery, visibleCount: 3, autoPlayInterval: 3500 });

  return (
    <Section bgColor='dark' textColor='light' className='py-32 border-y border-white/5'>
      <div className='flex flex-col gap-24'>
        <div className='text-center max-w-4xl mx-auto'>
          <h2 className='text-h2 md:text-[4.5rem] font-bebas text-light uppercase leading-[0.85]'>
            Completed Projects
          </h2>
          <p className='text-lg md:text-xl text-cream/60 font-poppins mt-8 max-w-2xl mx-auto'>
            Experience the quality and craftsmanship of our recent custom ADUs.
          </p>
        </div>

        <div
          className='relative'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}>
          <LandingGalleryArrows
            onPrevious={goToPrevious}
            onNext={goToNext}
            isVisible={shouldCarousel}
          />

          <div className='overflow-hidden'>
            <div
              className='flex gap-8'
              style={{
                transform: `translateX(calc(-${currentPosition * (100 / visibleCount)}% - ${(currentPosition * 2)}rem))`,
              }}>
              {trackItems.map((item, idx) => (
                <div
                  key={`${item.url}-${idx}`}
                  className='shrink-0 basis-[clamp(300px,30%,500px)]'>
                  <LandingGalleryCard item={item} index={idx} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default LandingGallerySection;
