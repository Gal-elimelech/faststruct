'use client';

import { IProcess } from '@/types/process';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { calculateDistance, getElementCenter } from '@/lib/utils';
import ProcessStepNumber from './components/ProcessStepNumber';
import ProcessStepContent from './components/ProcessStepContent';
import clsx from 'clsx';

const RADIANS_RANGE = 2 * Math.PI;

const OurProcessSection: React.FC<IProcess> = ({ title, steps }) => {
  const isMobile = useIsMobile();

  const numberContainerRef = useRef<HTMLDivElement>(null);
  const stepsPlaceholderRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [stepNumber, setStepNumber] = useState<number>(0);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([
    ...Array(steps.length).fill({ x: 0, y: 0 }),
  ]);
  const [stepWidth, setStepWidth] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [stepsPositionYOffset, setStepsPositionYOffset] = useState<number>(0);

  const snappedIndex = useMotionValue(0);

  // Track scroll progress through the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Transform scroll progress (0-1) to step index (0 to steps.length - 1)
  const scrollStepIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, steps.length - 1]
  );

  // Sync scroll-based step index with snappedIndex
  useMotionValueEvent(scrollStepIndex, 'change', (latest) => {
    if (!snappedIndex.isAnimating()) {
      const targetIndex = Math.round(latest);
      const currentIndex = Math.round(snappedIndex.get());

      // Only update if different to prevent unnecessary animations
      if (targetIndex !== currentIndex) {
        const clampedIndex = Math.max(
          0,
          Math.min(targetIndex, steps.length - 1)
        );
        animate(snappedIndex, clampedIndex, {
          ease: 'easeOut',
          duration: 0.5,
        });
      }
    }
  });

  useMotionValueEvent(snappedIndex, 'change', (fi) => {
    const radiansStep = steps.length > 1 ? RADIANS_RANGE / steps.length : 0;

    const offsets = getStepsPositionsOffsetFromNumber(
      radiansStep,
      distance,
      steps.length,
      isMobile,
      fi
    );

    setStepNumber(fi);
    setPositions(
      offsets.map((p) => ({
        x: p.x - (isMobile ? 0 : window.innerWidth * 0.15),
        y: p.y + stepsPositionYOffset,
      }))
    );
  });

  useEffect(() => {
    const calculatePositions = () => {
      if (
        !numberContainerRef.current ||
        !stepsPlaceholderRef.current ||
        !contentContainerRef.current ||
        !sectionRef.current
      )
        return;

      const contentContainerRect =
        contentContainerRef.current.getBoundingClientRect();

      const numberContainerRect =
        numberContainerRef.current.getBoundingClientRect();
      const stepsPlaceholderRect =
        stepsPlaceholderRef.current.getBoundingClientRect();

      const numberContainerCenter = getElementCenter(numberContainerRect);
      numberContainerCenter.x -= contentContainerRect.left;
      numberContainerCenter.y -= contentContainerRect.top;

      const stepsPlaceholderCenter = getElementCenter(stepsPlaceholderRect);
      stepsPlaceholderCenter.x -= contentContainerRect.left;
      stepsPlaceholderCenter.y -= contentContainerRect.top;

      const distance = isMobile
        ? window.innerHeight * 0.7
        : calculateDistance(
            numberContainerCenter.x,
            numberContainerCenter.y,
            stepsPlaceholderCenter.x,
            numberContainerCenter.y
          );

      const radiansDiffBetweenSteps =
        steps.length > 1 ? RADIANS_RANGE / steps.length : 0;

      const offsetsFromNumberContainer = getStepsPositionsOffsetFromNumber(
        radiansDiffBetweenSteps,
        distance,
        steps.length,
        isMobile,
        0
      );

      const stepsPositionYOffset = isMobile
        ? -window.innerHeight * 0.35
        : stepsPlaceholderRect.height * 0.3;

      const stepPositionXOffset = isMobile ? 0 : -window.innerWidth * 0.15;

      setPositions(
        offsetsFromNumberContainer.map((p) => ({
          x: p.x + stepPositionXOffset,
          y: p.y + stepsPositionYOffset,
        }))
      );
      setStepWidth(stepsPlaceholderRect.width);
      setDistance(distance);
      setStepsPositionYOffset(stepsPositionYOffset);
      setStepNumber(0);
    };

    calculatePositions();
  }, [steps, isMobile]);

  return (
    <section
      ref={sectionRef}
      className='section-padding-y relative z-0 text-center'>
      <AnimatedHeading
        text={title}
        className='text-h1 font-bebas text-light'
        revealColor='dark'
      />

      {/* content */}

      <div
        ref={contentContainerRef}
        className='sticky top-28 z-0 mt-10 h-screen md:top-0'>
        <div className='relative flex size-full flex-col justify-center overflow-hidden md:flex-row'>
          {/* number */}
          <div className='flex h-1/3 w-full items-center justify-center self-center text-center md:h-auto md:w-1/3'>
            <ProcessStepNumber
              number={Math.round(stepNumber) + 1}
              ref={numberContainerRef}
            />
          </div>

          {/* steps */}
          <div ref={stepsPlaceholderRef} className='grow md:self-stretch'>
            {steps.map((s, i) => (
              <ProcessStepContent
                index={i}
                updateRef={(ref) => (stepsRefs.current[i] = ref)}
                {...s}
                key={s.title}
                x={positions[i].x}
                y={positions[i].y}
                width={stepWidth}
                tranformValue={transformValueCalculation(stepNumber, i)}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        id={`step-placeholder-0`}
        key={`placeholder-0`}
        className='text-light absolute top-0 h-screen w-full text-center'></motion.div>

      {steps.map(
        (s, i) =>
          i < steps.length - 1 && (
            <motion.div
              id={`step-placeholder-${i + 1}`}
              key={`placeholder-${s.title}`}
              className={clsx(
                'text-light h-screen text-center',
                i % 2 === 0 && 'bg-white/5'
              )}></motion.div>
          )
      )}
    </section>
  );
};

export default OurProcessSection;

/**
 * Calculates the offset positions for process step markers around a central number container,
 * distributing them evenly in a circle, with an optional rotation for mobile layouts.
 *
 * @param radiansDiffBetweenSteps - The difference in angle (in radians) between each step.
 * @param distance                - The radius/distance from the center number container to each step.
 * @param stepsCount              - The total number of steps/markers to position.
 * @param isMobile                - Flag to adjust rotation offset for mobile screens.
 * @param stepIndex               - The index of the current highlighted or "active" step.
 * @returns An array of position objects { x, y } for each step, relative to the center point.
 *
 * The resultant positions place the steps in a circle. The currently highlighted step is at the "0 angle",
 * with others distributed at increments of radiansDiffBetweenSteps, offset as needed for mobile.
 */
const getStepsPositionsOffsetFromNumber = (
  radiansDiffBetweenSteps: number,
  distance: number,
  stepsCount: number,
  isMobile: boolean,
  stepIndex: number
) => {
  return [...Array(stepsCount)].map((_, i) => {
    // On mobile, rotate the circle 90deg (π/2 radians) to align vertically.
    const rotationOffset = isMobile ? Math.PI / 2 : 0;

    // Compute this step's angle, wrapping around the circle.
    const currentRadians =
      ((i - stepIndex + stepsCount) % stepsCount) * radiansDiffBetweenSteps +
      rotationOffset;

    const xFromCenterOfNumberContainer = distance * Math.cos(currentRadians);
    const yFromCenterOfNumberContainer = distance * Math.sin(currentRadians);

    return {
      x: xFromCenterOfNumberContainer,
      y: yFromCenterOfNumberContainer,
    };
  });
};

/**
 * Softly snaps a continuous value to the nearest integer, with a "lock zone".
 *
 * @param value           Continuous index, e.g. from scroll (0 → steps-1)
 * @param innerRadius     Distance where we are fully snapped (|value-n| <= innerRadius)
 * @param outerRadius     Distance where snapping effect completely disappears
 *
 * innerRadius < outerRadius
 */
export function getSoftSnappedIndex(
  value: number,
  innerRadius: number = 0.05,
  outerRadius: number = 0.25
): {
  finalIndex: number; // use this for positions
  snappedIndex: number; // nearest integer index
  blend: number; // 0..1, how much we are pulled to snappedIndex
} {
  const snappedIndex = Math.round(value);
  const diff = Math.abs(value - snappedIndex); // how far we are from that step

  // Completely outside snap range → no snapping at all
  if (diff >= outerRadius) {
    return {
      finalIndex: value,
      snappedIndex,
      blend: 0,
    };
  }

  // Deep inside snap zone → fully snapped (hard lock)
  if (diff <= innerRadius) {
    return {
      finalIndex: snappedIndex,
      snappedIndex,
      blend: 1,
    };
  }

  // Between inner & outer → blend smoothly between continuous and snapped
  // Map diff from [innerRadius, outerRadius] → [0,1]
  const t = (diff - innerRadius) / (outerRadius - innerRadius); // 0..1
  const blend = 1 - t; // 1 near inner, 0 near outer

  // Linear interpolation (lerp) between continuous value and snapped step
  const finalIndex = value * (1 - blend) + snappedIndex * blend;

  return { finalIndex, snappedIndex, blend };
}

// const transformValueCalculation = (stepNumber: number, i: number) => {
//   return stepNumber - i > 1 ? 1 : stepNumber - i < -1 ? -1 : stepNumber - i;
// };

const transformValueCalculation = (stepNumber: number, i: number) => {
  return stepNumber - i >= -0.5 && stepNumber - i <= 1.5 ? stepNumber - i : 1;
};
