'use client';

import Image from 'next/image';
import { IImageText } from '@/types/about';
import Parallax from '@/components/Parallax';
import { Section } from '@/components/Section';
import { useRef } from 'react';

const ImageTextSection = ({ image, paragraph }: IImageText) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Section ref={ref} bgColor='light' textColor='dark' className='py-32'>
      <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-2'>
        <Parallax
          ref={ref}
          className='size-full'
          startRange={-50}
          endRange={50}
          unitType='px'
          offset={['start end', 'end start']}>
          <div className='relative h-96 w-full overflow-hidden rounded-xl lg:h-[70vh]'>
            <Image
              src={image}
              alt='Construction site'
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              className='object-cover object-center'
              priority
            />
          </div>
        </Parallax>
        <Parallax
          ref={ref}
          className='relative'
          startRange={-100}
          endRange={50}
          unitType='px'
          offset={['start end', 'end start']}>
          <div className='bg-accent absolute top-0 bottom-0 left-0 w-[2px]' />
          <div className='pl-4 md:pl-8'>
            <p className='text-h6 text-dark leading-relaxed'>{paragraph}</p>
          </div>
        </Parallax>
      </div>
    </Section>
  );
};

export default ImageTextSection;
