'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { RefObject, useRef, useState } from 'react';
import { ITeam } from '@/types/about';
import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { useIsTablet } from '@/hooks/useIsTablet';

/**
 * Generate initials from a name for placeholder display
 */
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Generate a placeholder image URL using a service
 * Falls back to a gradient placeholder if service is unavailable
 */
const getPlaceholderImage = (name: string): string => {
  // Using a placeholder service that generates images with initials
  // Alternative: You could use placeholder.com, ui-avatars.com, etc.
  const initials = getInitials(name);
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    initials
  )}&size=400&background=a88e6b&color=ffffff&bold=true&font-size=0.5`;
};

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  index: number;
  sectionRef: RefObject<HTMLElement | null>;
  isMobile: boolean;
}

const TeamMemberCard = ({
  name,
  role,
  bio,
  imageUrl,
  index,
  sectionRef,
  isMobile,
}: TeamMemberCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Determine which image to use
  const displayImage = imageError ? getPlaceholderImage(name) : imageUrl;

  // Staircase offset: each card is offset by 20px * index
  // First card (index 0) = 0px, second = 20px, third = 40px, etc.
  const baseStaircaseOffset = isMobile ? 0 : index * 20;

  // Parallax effect: aggressive, index-based velocity
  // Higher index = dramatically more parallax movement (creates deep chasm effect)
  const { scrollYProgress } = useScroll({
    target: sectionRef as RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  });

  // Aggressive multiplier: creates distinct speed differences
  // Item 0: ~20px, Item 1: ~100px, Item 2: ~180px, Item 3: ~260px
  // Formula: baseMovement + (index * aggressiveMultiplier)
  const AGGRESSIVE_MULTIPLIER = 80; // px per index
  const BASE_MOVEMENT = 20; // Minimum movement for first item
  const parallaxRange = isMobile
    ? 0
    : BASE_MOVEMENT + index * AGGRESSIVE_MULTIPLIER;

  // Combine staircase offset with aggressive parallax
  // Base offset + aggressive parallax movement based on index
  const combinedY = useTransform(
    scrollYProgress,
    [0, 1],
    [baseStaircaseOffset, baseStaircaseOffset + parallaxRange]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      style={{
        // Staircase offset + parallax effect (only on desktop)
        y: isMobile ? undefined : combinedY,
      }}
      className='group bg-light relative overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl'>
      {/* Image Container */}
      <div className='bg-accent/10 relative aspect-[3/4] w-full overflow-hidden'>
        <motion.div
          className='relative h-full w-full'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}>
          {/* Loading state */}
          {isImageLoading && (
            <div className='bg-accent/5 absolute inset-0 flex items-center justify-center'>
              <div className='border-accent/20 border-t-accent h-12 w-12 animate-spin rounded-full border-4'></div>
            </div>
          )}

          {/* Image */}
          <Image
            src={displayImage}
            alt={`${name} - ${role}`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw'
            className='object-cover object-center'
            onError={() => {
              setImageError(true);
              setIsImageLoading(false);
            }}
            onLoad={() => setIsImageLoading(false)}
            priority={index < 2} // Prioritize first 2 images
          />

          {/* Gradient overlay on hover */}
          <div className='from-dark/80 via-dark/40 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
        </motion.div>
      </div>

      {/* Content */}
      <div className='bg-light text-dark p-6'>
        <h3 className='text-h3 font-bebas text-dark mb-1'>{name}</h3>
        <p className='text-h6 text-accent mb-3'>{role}</p>
        <p className='text-dark/80 text-sm leading-relaxed'>{bio}</p>
      </div>
    </motion.div>
  );
};

const TeamSection = ({ title, members }: ITeam) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsTablet();

  // Calculate maximum displacement for the last item (highest index)
  // This creates a buffer zone to prevent overflow from parallax movement
  const AGGRESSIVE_MULTIPLIER = 80;
  const BASE_MOVEMENT = 20;
  const lastItemIndex = members.length > 0 ? members.length - 1 : 0;
  const maxDisplacement = isMobile
    ? 0
    : BASE_MOVEMENT + lastItemIndex * AGGRESSIVE_MULTIPLIER;

  return (
    <Section
      ref={sectionRef}
      bgColor='light'
      textColor='dark'
      className='py-32'
      style={{
        // Add dynamic padding-bottom to accommodate parallax movement
        // Prevents cards from overlapping with footer/next section
        // py-32 = 8rem = 128px, so we add maxDisplacement to the base padding
        paddingBottom:
          maxDisplacement > 0 ? `${128 + maxDisplacement}px` : undefined,
      }}>
      <div className='container mx-auto'>
        {/* Title */}
        <div className='mb-16 text-center'>
          <AnimatedHeading
            text={title}
            className='text-h1 font-bebas text-dark md:text-[4rem]'
            revealColor='light'
          />
        </div>

        {/* Team Grid - Staircase layout on desktop, standard grid on mobile */}
        <div
          className={`grid gap-8 ${
            isMobile
              ? 'grid-cols-1'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}>
          {members.map((member, index) => (
            <TeamMemberCard
              key={index}
              {...member}
              index={index}
              sectionRef={sectionRef}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TeamSection;
