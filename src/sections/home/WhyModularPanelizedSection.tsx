'use client';

import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { IWhyModularPanelized } from '@/types/home';
import WhyModularPanelizedMiniSection from './components/WhyModularPanelizedMiniSection';
import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const WhyModularPanelizedSection: React.FC<IWhyModularPanelized> = ({
  modular,
  panelized,
  combinedApproach,
}) => {
  const categories = [modular, panelized, combinedApproach];
  const [isMiniSectionVisible, setIsMiniSectionVisible] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const activeCategoryIndex = isMiniSectionVisible.findLastIndex(
    (value) => value
  );

  return (
    <Section bgColor='dark' textColor='light'>
      <div className='mb-8 text-center'>
        <AnimatedHeading
          text='Why Modular & Panelized Construction'
          className='text-h2 font-bebas text-light'
          revealColor='dark'
        />
      </div>

      <div className='relative mt-16 flex flex-col gap-36'>
        <AnimatePresence>
          <motion.div
            key={categories[activeCategoryIndex]?.title}
            style={{ display: activeCategoryIndex !== -1 ? 'block' : 'none' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='fixed top-0 z-0 size-full h-screen w-full -translate-x-1/4'>
            <Image
              src={
                categories[activeCategoryIndex]?.image || categories[0].image
              }
              alt={
                categories[activeCategoryIndex]?.title ||
                'Why Modular & Panelized Construction image'
              }
              fill
              sizes='100vw'
              className='object-contain'
            />
          </motion.div>
        </AnimatePresence>
        {categories.map((category, index) => (
          <WhyModularPanelizedMiniSection
            key={category.title}
            category={category}
            updateActiveCategoryIndex={(isInView) =>
              setIsMiniSectionVisible((prev) =>
                prev.map((value, i) => (i === index ? isInView : value))
              )
            }
            hasCTA={index === categories.length - 1}
          />
        ))}
      </div>
    </Section>
  );
};

export default WhyModularPanelizedSection;
