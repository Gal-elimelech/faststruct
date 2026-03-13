'use client';

import { motion } from 'motion/react';
import { Section } from '@/components/Section';
import { IProductDescription } from '@/types/product';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import FormattedText from '@/components/FormattedText';

const ProductDescriptionSection = ({ paragraph }: IProductDescription) => {
  return (
    <Section bgColor='dark' textColor='white' className='py-32'>
      <motion.div
        viewport={{ once: true, amount: 0.3 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='mx-auto max-w-4xl text-center'>
        <FadeInParagraph>
          <FormattedText
            className='text-h6 text-light [&>strong]:text-accent leading-relaxed'
            text={paragraph}
          />
        </FadeInParagraph>
      </motion.div>
    </Section>
  );
};

export default ProductDescriptionSection;
