import NavLink from '@/components/navigation/NavLink';

export default function NotFound() {
  return (
    <div className='bg-dark flex min-h-screen flex-col items-center justify-center px-4 text-center'>
      <div className='max-w-2xl'>
        {/* Chill illustration - construction worker taking a break */}
        <div className='mb-8 flex justify-center'>
          <svg
            width='200'
            height='200'
            viewBox='0 0 200 200'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='text-accent'>
            {/* Sun */}
            <circle cx='160' cy='40' r='25' fill='currentColor' opacity='0.3' />
            {/* Cloud */}
            <path
              d='M50 50 C45 50, 40 55, 40 60 C35 60, 30 65, 30 70 C30 75, 35 80, 40 80 C40 85, 45 90, 50 90 C55 90, 60 85, 60 80 C65 80, 70 75, 70 70 C70 65, 65 60, 60 60 C60 55, 55 50, 50 50 Z'
              fill='currentColor'
              opacity='0.2'
            />
            {/* Construction worker sitting */}
            <g transform='translate(100, 120)'>
              {/* Head */}
              <circle
                cx='0'
                cy='-30'
                r='20'
                fill='currentColor'
                opacity='0.4'
              />
              {/* Hard hat */}
              <ellipse cx='0' cy='-35' rx='22' ry='8' fill='currentColor' />
              {/* Body */}
              <rect
                x='-15'
                y='-10'
                width='30'
                height='40'
                rx='5'
                fill='currentColor'
                opacity='0.4'
              />
              {/* Arms resting */}
              <line
                x1='-20'
                y1='0'
                x2='-35'
                y2='10'
                stroke='currentColor'
                strokeWidth='4'
                opacity='0.4'
              />
              <line
                x1='20'
                y1='0'
                x2='35'
                y2='10'
                stroke='currentColor'
                strokeWidth='4'
                opacity='0.4'
              />
              {/* Legs */}
              <line
                x1='-10'
                y1='30'
                x2='-10'
                y2='50'
                stroke='currentColor'
                strokeWidth='4'
                opacity='0.4'
              />
              <line
                x1='10'
                y1='30'
                x2='10'
                y2='50'
                stroke='currentColor'
                strokeWidth='4'
                opacity='0.4'
              />
            </g>
            {/* Coffee cup */}
            <g transform='translate(140, 130)'>
              <rect
                x='-8'
                y='-15'
                width='16'
                height='20'
                rx='2'
                fill='currentColor'
                opacity='0.3'
              />
              <path
                d='M 8 -15 Q 12 -15, 12 -10 L 12 5 Q 12 10, 8 10 L -8 10 Q -12 10, -12 5 L -12 -10 Q -12 -15, -8 -15'
                stroke='currentColor'
                strokeWidth='2'
                fill='none'
                opacity='0.4'
              />
              <line
                x1='12'
                y1='-5'
                x2='18'
                y2='-8'
                stroke='currentColor'
                strokeWidth='2'
                opacity='0.3'
              />
            </g>
          </svg>
        </div>

        {/* Heading */}
        <h1 className='text-h1 font-bebas text-light mb-4'>
          Page Under Construction
        </h1>

        {/* Message */}
        <p className='text-h5 font-poppins text-light mb-8 font-extralight opacity-80'>
          We&apos;re working hard to bring you something amazing. This page will
          be ready soon!
        </p>

        {/* CTA Button */}
        <NavLink href='/' button={true}>
          Back to Home
        </NavLink>
      </div>
    </div>
  );
}
