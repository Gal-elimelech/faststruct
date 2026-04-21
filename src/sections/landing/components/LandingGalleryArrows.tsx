'use client';

interface LandingGalleryArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  isVisible: boolean;
}

const LandingGalleryArrows = ({
  onPrevious,
  onNext,
  isVisible,
}: LandingGalleryArrowsProps) => {
  if (!isVisible) return null;

  return (
    <>
      <button
        onClick={onPrevious}
        className='absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-accent/20 p-2.5 text-light backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-accent/40 active:scale-95 md:left-4 md:p-3.5'
        aria-label='Previous project'
        type='button'>
        <i className='fa-solid fa-chevron-left text-base md:text-lg'></i>
      </button>
      <button
        onClick={onNext}
        className='absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-accent/20 p-2.5 text-light backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-accent/40 active:scale-95 md:right-4 md:p-3.5'
        aria-label='Next project'
        type='button'>
        <i className='fa-solid fa-chevron-right text-base md:text-lg'></i>
      </button>
    </>
  );
};

export default LandingGalleryArrows;
