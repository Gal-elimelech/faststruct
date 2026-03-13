'use client';

import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { IScalableSolutions } from '@/types/theSystem';
import { motion } from 'motion/react';

interface ScalableSolutionsSectionProps {
  scalableSolutions: IScalableSolutions;
}

const ScalableSolutionsSection = ({
  scalableSolutions,
}: ScalableSolutionsSectionProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'box-arrow-up':
        return 'fa-box';
      case 'house':
        return 'fa-house';
      case 'stack-boxes':
        return 'fa-layer-group';
      default:
        return 'fa-circle';
    }
  };

  return (
    <Section bgColor='light' textColor='dark'>
      <div className='container-padding flex flex-col gap-8'>
        <div className='text-center'>
          <AnimatedHeading
            text={scalableSolutions.title}
            className='text-h1 font-bebas text-dark mb-4'
            revealColor='light'
          />
          <FadeInParagraph className='text-h6 text-dark/80 mx-auto max-w-3xl'>
            {scalableSolutions.subtitle}
          </FadeInParagraph>
        </div>

        <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-3'>
          {scalableSolutions.solutions.map((solution, index) => (
            <motion.div
              key={index}
              className='bg-dark text-light overflow-hidden rounded-lg p-8'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}>
              <div className='mb-6 flex justify-center'>
                <div className='border-accent/30 bg-accent/20 flex aspect-square h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2'>
                  <i
                    className={`fa-solid ${getIcon(solution.icon)} text-accent text-2xl`}></i>
                </div>
              </div>
              <h4 className='text-h4 font-bebas text-center text-white'>
                {solution.title}
              </h4>
              <p className='text-light/70 mb-4 text-center text-sm'>
                {solution.subtitle}
              </p>
              <p className='text-light/90 mt-2 text-center text-base leading-relaxed'>
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ScalableSolutionsSection;
