'use client';

import { Button } from '@/components/Button';
import { IGalleryItem } from '@/types/landing';
import { motion } from 'motion/react';
import Image from 'next/image';

interface LandingGalleryCardProps {
  item: IGalleryItem;
  index: number;
}

const LandingGalleryCard = ({ item, index }: LandingGalleryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      viewport={{ once: true }}
      className='relative aspect-4/3 overflow-hidden border border-white/5 group'>
      <Image
        src={item.url}
        alt={item.alt}
        fill
        className='object-cover transition-transform duration-[2s] group-hover:scale-110'
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-dark/80 p-12 text-center opacity-0 backdrop-blur-sm transition-opacity duration-700 group-hover:opacity-100'>
        <p className='mb-8 text-sm font-poppins text-light opacity-0 transition-opacity delay-300 duration-1000 group-hover:opacity-100'>
          {item.alt}
        </p>
        <Button
          variant='outline'
          size='sm'
          className='outline-accent text-accent'
          hoverTransition='lift'>
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

export default LandingGalleryCard;
