'use client';

import { IConstructionCategory } from '@/types/home';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import ScrollableTextList from './ScrollableTextList/ScrollableTextList';
import { motion, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';
import NavLink from '@/components/navigation/NavLink';

interface WhyModularPanelizedMiniSectionProps {
  category: IConstructionCategory;
  updateActiveCategoryIndex: (isInView: boolean) => void;
  hasCTA?: boolean;
}

const WhyModularPanelizedMiniSection: React.FC<
  WhyModularPanelizedMiniSectionProps
> = ({ category, updateActiveCategoryIndex, hasCTA }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.5 });

  useEffect(() => {
    updateActiveCategoryIndex(isInView);
  }, [isInView, updateActiveCategoryIndex]);

  return (
    <div ref={sectionRef} className='z-10 md:min-h-screen'>
      <div className='relative flex flex-col items-start gap-6 md:flex-row md:gap-0'>
        <div className='sticky top-28 h-fit grow'>
          <AnimatedHeading
            text={category.title}
            className='text-h1 font-bebas text-light shrink'
            revealColor='dark'
          />
        </div>
        <div className='basis-1/2'>
          <ScrollableTextList items={category.items} />
        </div>
      </div>
      {hasCTA && (
        <div className='mt-8 flex justify-center pb-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ amount: 0.5, once: true }}>
            <NavLink button={true} href='/the-system'>
              Learn About Our System
            </NavLink>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WhyModularPanelizedMiniSection;
