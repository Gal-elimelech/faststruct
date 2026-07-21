import { ISectionCtaBand } from '@/types/landing';
import { LandingCtaLink } from '@/sections/landing/components/LandingCtaLink';

/**
 * Compact conversion strip between major sections so visitors can act
 * mid-page instead of only at the hero, form, and footer.
 */
const LandingCtaBand = ({ title, highlight, cta, phoneCta }: ISectionCtaBand) => {
  return (
    <div className='bg-dark border-y border-white/10'>
      <div className='container-padding mx-auto py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8'>
        <p className='font-bebas text-3xl md:text-4xl text-light uppercase tracking-widest text-center md:text-left'>
          {title} <span className='text-accent'>{highlight}</span>
        </p>

        <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0'>
          <LandingCtaLink
            href={cta.link}
            size='md'
            linkClassName='w-full sm:w-auto'
          >
            {cta.text}
          </LandingCtaLink>
          <LandingCtaLink
            href={phoneCta.link}
            size='md'
            linkClassName='w-full sm:w-auto'
          >
            {phoneCta.text}
          </LandingCtaLink>
        </div>
      </div>
    </div>
  );
};

export default LandingCtaBand;
