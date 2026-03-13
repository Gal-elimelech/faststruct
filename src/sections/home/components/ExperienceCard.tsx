import AnimatedHeading from '../../../components/text-animation/AnimatedHeading';
import FadeInParagraph from '../../../components/text-animation/FadeInParagraph';
import NavLink from '@/components/navigation/NavLink';
import { motion } from 'motion/react';

interface ExperienceCardProps {
  title: string;
  description: string;
  hasBorder: boolean;
  refUpdateFunction: (el: HTMLDivElement) => void;
  top: number;
  hasCTA?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  description,
  hasBorder,
  refUpdateFunction,
  top,
  hasCTA,
}) => {
  return (
    <div
      ref={refUpdateFunction}
      className={`sticky bg-white p-6 ${
        hasBorder ? 'border-dark border-t-2' : ''
      }`}
      style={{ top }}>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
        <h3 className='text-h2 text-accent mb-2 font-bold md:mb-0'>
          <AnimatedHeading revealColor='white' text={title} />
        </h3>
        <FadeInParagraph className='text-h6 text-dark md:basis-1/2'>
          {description}
        </FadeInParagraph>
      </div>
      {hasCTA && (
        <motion.div
          className='mt-8 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ amount: 0.5, once: true }}>
          <NavLink button={true} href='/about'>
            Learn More About Us
          </NavLink>
        </motion.div>
      )}
    </div>
  );
};

export default ExperienceCard;
