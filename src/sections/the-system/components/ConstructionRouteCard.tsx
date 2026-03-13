'use client';

import Image from 'next/image';
import { IConstructionRoute } from '@/types/theSystem';

interface ConstructionRouteCardProps {
  route: IConstructionRoute;
}

const ConstructionRouteCard = ({ route }: ConstructionRouteCardProps) => {
  return (
    <div className='bg-dark overflow-hidden rounded-lg p-5'>
      <div className='relative mb-6 aspect-video w-full overflow-hidden rounded-md'>
        <Image
          src={route.imageUrl}
          alt={route.title}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
          className='scale-125 object-cover object-center'
        />
      </div>
      <div className='bg-dark'>
        <h3 className='text-h2 font-bebas mb-2 text-white'>{route.title}</h3>
        <p className='text-h6 text-light/90 mb-4'>{route.description}</p>
        <ul className='space-y-2'>
          {route.bulletPoints.map((point, index) => (
            <li
              key={index}
              className='text-light/80 flex items-center gap-2 text-sm'>
              <span className='text-accent'>•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConstructionRouteCard;
