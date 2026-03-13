'use client';

import ExperienceCard from '@/sections/home/components/ExperienceCard';
import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { IExperienceMetric } from '@/types/home';
import { Fragment, useLayoutEffect, useRef, useState } from 'react';

const HEADING_TOP = 12; // px

const ExperienceSection: React.FC<{ experienceData: IExperienceMetric[] }> = ({
  experienceData,
}) => {
  const { screenWidth } = useScreenWidth();
  const cardsRefs = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingHeight, setHeadingHeight] = useState(0);
  const [cardsHeights, setCardsHeights] = useState<number[]>([]);

  useLayoutEffect(() => {
    const calculateHeights = () => {
      const headingHeight = headingRef.current?.getBoundingClientRect().height;
      const cardsHeights = cardsRefs.current.map(
        (card) => card.getBoundingClientRect().height
      );
      setHeadingHeight(headingHeight || 0);
      setCardsHeights(cardsHeights);
    };

    calculateHeights();
  }, [screenWidth]);

  return (
    <Section bgColor='white' textColor='dark'>
      {/* Sticky heading */}
      <div
        style={{ top: `${HEADING_TOP}px` }}
        className={`bg-white pb-6 text-center`}>
        <AnimatedHeading
          text='Our Experience'
          className='text-h2 font-bebas text-dark'
          revealColor='white'
        />
      </div>

      {/* transparent placeholder for sticky heading */}
      <div ref={headingRef} className='opacity-0'>
        <h2 className='text-h2 font-bebas text-dark'>x</h2>
      </div>

      {/* Sticky cards container that sits just below heading */}
      {experienceData.map((item, index) => (
        <Fragment key={`ExperienceCard-${index}`}>
          <ExperienceCard
            hasCTA={index === experienceData.length - 1}
            top={
              HEADING_TOP +
              headingHeight +
              cardsHeights.slice(0, index).reduce((a, b) => a + b, 0)
            }
            title={item.title}
            description={item.text}
            hasBorder={index > 0}
            refUpdateFunction={(el: HTMLDivElement) =>
              (cardsRefs.current[index] = el)
            }
          />

          <div className='h-72' />
        </Fragment>
      ))}
    </Section>
  );
};

export default ExperienceSection;
