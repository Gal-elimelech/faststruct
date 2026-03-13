'use client';

import { ModuleCard } from '@/sections/home/components/ModuleCard';
import { IModule } from '@/types/modules';
import { motion, AnimatePresence, Variants } from 'motion/react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ModuleList = ({ modules }: { modules: IModule[] }) => {
  const modulesKey = modules.map((m) => m.slug).join(',');

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={modulesKey}
        className='flex flex-col justify-center gap-8 md:flex-row md:flex-wrap'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit='hidden'>
        {modules.map((module, index) => {
          return (
            <ModuleCard
              index={index}
              key={module.slug}
              slug={module.slug}
              imageUrl={module.mainImage}
              title={module.title}
              specs={[
                `${module.specs.areaSqft} sqft`,
                `${module.specs.bedrooms} Bedroom`,
                `${module.specs.bathrooms} Bathroom`,
              ]}
              variants={itemVariants}
            />
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};

export default ModuleList;
