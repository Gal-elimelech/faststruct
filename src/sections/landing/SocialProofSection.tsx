'use client';

import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { motion } from 'motion/react';

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  rating: number;
}

interface SocialProofSectionProps {
  title: string;
  testimonials: Testimonial[];
}

const SocialProofSection: React.FC<SocialProofSectionProps> = ({ title, testimonials }) => {
  return (
    <Section bgColor='dark' textColor='light' className='py-24'>
      <div className='flex flex-col gap-16'>
        <div className='text-center'>
          <AnimatedHeading
            text={title}
            className='text-h2 font-bebas text-light uppercase'
            revealColor='accent'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className='bg-white/5 border border-white/10 p-8 flex flex-col gap-6 h-full'
            >
              <div className='flex gap-1 text-accent'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden='true' focusable='false'>
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              
              <p className='text-lg text-light/80 font-poppins italic leading-relaxed flex-grow'>
                "{testimonial.quote}"
              </p>
              
              <div className='flex flex-col'>
                <span className='font-bebas text-xl text-accent uppercase'>
                  {testimonial.author}
                </span>
                <span className='text-sm text-light/50 uppercase tracking-widest'>
                  {testimonial.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SocialProofSection;
