'use client';

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
      className='relative aspect-4/3 overflow-hidden border border-white/5'>
      <Image src={item.url} alt={item.alt} fill className='object-cover' />
    </motion.div>
  );
};

export default LandingGalleryCard;
