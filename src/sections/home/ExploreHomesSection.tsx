'use client';

import { Section } from '@/components/Section';
import { IModule } from '@/types/modules';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import ModuleList from './components/ModuleList';
import { IExplore } from '@/types/product';
import NavLink from '@/components/navigation/NavLink';
import { motion } from 'motion/react';

interface IExploreHomesSectionProps {
  featuredModules: IModule[];
  exploreContent?: IExplore;
}

const ExploreHomesSection = ({
  featuredModules,
  exploreContent,
}: IExploreHomesSectionProps) => {
  const title = exploreContent?.title || 'Explore Our Homes';
  const subtitle =
    exploreContent?.subtitle ||
    'Explore our range of models, each designed for flexibility and comfort';

  return (
    <Section bgColor='dark' textColor='light'>
      <div className='flex flex-col gap-8'>
        <div className='text-center'>
          <AnimatedHeading
            text={title}
            className='text-h2 font-bebas text-light'
            revealColor='dark'
          />

          <FadeInParagraph className='text-h6 text-light/80 mx-auto max-w-2xl'>
            {subtitle}
          </FadeInParagraph>
        </div>
        <ModuleList modules={featuredModules} />

        {/* CTA Button */}
        <div className='mt-8 flex justify-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ amount: 0.5, once: true }}>
            <NavLink button={true} href='/modules'>
              View All Modules
            </NavLink>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default ExploreHomesSection;
