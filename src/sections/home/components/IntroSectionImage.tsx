'use client';

import Parallax from '@/components/Parallax';
import Image from 'next/image';
import { RefObject } from 'react';

const IntroSectionImage = ({
  parentRef,
  imageUrl,
}: {
  parentRef: RefObject<HTMLElement | null>;
  imageUrl: string;
}) => {
  return (
    <Parallax
      ref={parentRef}
      className='z-0 size-full'
      endRange={-100}
      unitType='px'
      offset={['start end', 'end start']}>
      <div className='relative h-96 w-full translate-x-10 scale-105 overflow-hidden rounded-lg lg:h-[70vh] lg:scale-110'>
        <Image
          src={imageUrl}
          alt='Construction site'
          fill
          sizes='(max-width: 1024px) 100vw, 50vw'
          className='object-cover object-center'
          priority
        />
      </div>
    </Parallax>
  );
};

export default IntroSectionImage;
