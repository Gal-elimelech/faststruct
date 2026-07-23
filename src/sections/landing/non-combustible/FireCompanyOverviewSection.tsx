'use client';

import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { IFireCompanyOverview } from '@/types/landing';
import { motion } from 'motion/react';
import { LandingCtaLink } from '@/sections/landing/components/LandingCtaLink';
import { Award, BadgeCheck, Building2, Network } from 'lucide-react';

const iconMap = {
  certificate: BadgeCheck,
  award: Award,
  'project-diagram': Network,
  building: Building2,
} as const;

/**
 * Page-specific company overview: the shared version leaves the right column
 * sparse. Here the credentials render as a filled 2x2 card panel that stretches
 * to match the copy column, so the section reads balanced.
 */
const FireCompanyOverviewSection: React.FC<IFireCompanyOverview> = ({
  title,
  texts,
  panelTitle,
  items,
  cta,
}) => {
  return (
    <section className='relative bg-dark text-light px-4 md:px-8 lg:px-16 py-14 md:py-20 lg:py-24 border-t border-white/5'>
      <div className='flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch'>
        <div className='lg:w-[46%] flex flex-col gap-7'>
          <AnimatedHeading
            text={title}
            className='text-h2 font-bebas text-light uppercase leading-[0.9]'
            revealColor='dark'
          />
          <div className='flex flex-col gap-3'>
            {texts.map((t, i) => (
              <p
                key={i}
                className='text-light/70 font-poppins leading-relaxed max-w-xl'
              >
                {t}
              </p>
            ))}
          </div>
          <div className='mt-auto pt-2'>
            <LandingCtaLink
              href={cta.link}
              linkClassName='block w-full sm:inline-block sm:w-auto'
            >
              {cta.text}
            </LandingCtaLink>
          </div>
        </div>

        <div className='lg:w-[54%] flex flex-col gap-5'>
          <span className='text-[10px] text-accent font-bold tracking-[0.28em] uppercase font-poppins'>
            {panelTitle}
          </span>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1'>
            {items.map((item, idx) => {
              const Icon =
                iconMap[item.icon as keyof typeof iconMap] ?? BadgeCheck;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.08,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                  className='flex flex-col gap-4 bg-white/3 border border-white/10 rounded-sm p-6 lg:p-7 hover:border-accent/40 transition-colors group'
                >
                  <div className='w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-all duration-500'>
                    <Icon
                      size={20}
                      className='text-accent group-hover:text-dark transition-colors'
                      aria-hidden
                    />
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <h3 className='font-bebas text-lg text-light uppercase tracking-wide leading-tight'>
                      {item.title}
                    </h3>
                    <p className='text-light/55 font-poppins text-sm leading-relaxed'>
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FireCompanyOverviewSection;
