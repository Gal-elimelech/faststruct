interface GoogleReviewBadgeProps {
  rating?: string;
  reviewText?: string;
}

const STAR_PATH =
  'M12 2l2.94 6.26 6.87.63-5.2 4.55 1.54 6.73L12 16.62l-6.15 3.55 1.54-6.73-5.2-4.55 6.87-.63L12 2z';

/**
 * Native Google review badge: transparent glass treatment matching the hero
 * card, replacing the boxed white PNG screenshot.
 */
const GoogleReviewBadge = ({
  rating = '4.9',
  reviewText = '120+ Verified Google Reviews',
}: GoogleReviewBadgeProps) => {
  return (
    <div className='inline-flex flex-col items-center gap-2 rounded-sm border border-white/15 bg-white/5 backdrop-blur-sm px-6 py-4'>
      <div className='flex items-center gap-3'>
        {/* Google "G" */}
        <svg viewBox='0 0 24 24' className='h-6 w-6 shrink-0' aria-hidden='true'>
          <path
            fill='#4285F4'
            d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
          />
          <path
            fill='#34A853'
            d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
          />
          <path
            fill='#FBBC05'
            d='M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z'
          />
          <path
            fill='#EA4335'
            d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z'
          />
        </svg>

        <div className='flex items-center gap-1' aria-hidden='true'>
          {Array.from({ length: 5 }).map((_, idx) => (
            <svg key={idx} viewBox='0 0 24 24' className='h-4 w-4'>
              <path fill='#FBBC05' d={STAR_PATH} />
            </svg>
          ))}
        </div>

        <span className='font-bebas text-2xl text-white leading-none tracking-wide pt-0.5'>
          {rating}
        </span>
      </div>

      <p className='font-poppins text-xs text-white/80 tracking-wide'>
        {reviewText}
      </p>
    </div>
  );
};

export default GoogleReviewBadge;
