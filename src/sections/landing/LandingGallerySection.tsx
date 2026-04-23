'use client';

import { useEffect, useRef, useState } from 'react';
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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [itemSpanPx, setItemSpanPx] = useState(0);

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

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const firstItem = track.querySelector<HTMLElement>('[data-gallery-item="true"]');
      if (!firstItem) return;

      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      const width = firstItem.getBoundingClientRect().width;
      setItemSpanPx(width + gap);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    const firstItem = track.querySelector<HTMLElement>('[data-gallery-item="true"]');
    if (firstItem) {
      resizeObserver.observe(firstItem);
    }

    window.addEventListener('resize', measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [trackItems.length]);

  return (
    <Section bgColor='white' textColor='dark' className='border-y border-dark/10'>
      <div className='flex flex-col gap-16 md:gap-20'>
        <div className='text-center max-w-4xl mx-auto'>
          <h2 className='text-h2 font-bebas text-dark uppercase leading-[0.85]'>
            Completed Projects
          </h2>
          <p className='text-h6 md:text-xl font-poppins mt-2 max-w-2xl mx-auto'>
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
              ref={trackRef}
              className='flex gap-8'
              style={{
                transform:
                  itemSpanPx > 0
                    ? `translateX(${-currentPosition * itemSpanPx}px)`
                    : `translateX(calc(-${currentPosition * (100 / visibleCount)}% - ${(currentPosition * 2)}rem))`,
              }}>
              {trackItems.map((item, idx) => (
                <div
                  key={`${item.url}-${idx}`}
                  data-gallery-item='true'
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
