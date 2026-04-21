'use client';

import { Section } from '@/components/Section';
import { IConstructionMethods } from '@/types/landing';
import Image from 'next/image';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/Button';

const ConstructionMethodsSection: React.FC<IConstructionMethods> = ({ title, subtitle, paths, cta }) => {
  return (
    <Section bgColor='dark' textColor='light' className='py-32 overflow-hidden relative'>
      {/* Background Graphic */}
      <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] pointer-events-none' />

      <div className='flex flex-col gap-24 relative z-10'>
        <div className='flex flex-col md:flex-row justify-between items-end gap-10'>
          <div className='max-w-4xl flex flex-col gap-8'>
            <h2 className='text-h2 md:text-[4.5rem] font-bebas text-light uppercase leading-[0.85]'>
              {title}
            </h2>
            <p className='text-lg md:text-xl text-cream/60 font-poppins max-w-2xl'>
              {subtitle}
            </p>
          </div>
          
          <Link href={cta.link} className='mb-2'>
            <Button variant='primary' size='lg' hoverTransition='lift'>
              {cta.text}
            </Button>
          </Link>
        </div>

        <div className='flex flex-col gap-32 md:gap-48'>
          {paths.map((path, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col gap-12 items-center lg:flex-row ${
                idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Container */}
              <div className='lg:basis-1/2 w-full'>
                <div className='relative aspect-[16/10] overflow-hidden rounded-sm border border-white/5 group'>
                  <Image
                    src={idx === 0 ? "/assets/system-modular.jpg" : "/assets/system-panelized.jpg"}
                    alt={path.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-[1.5s]'
                  />
                  <div className='absolute inset-0 bg-dark/20 mix-blend-overlay group-hover:bg-dark/0 transition-colors duration-700' />
                  
                  {/* Subtle Corner Accents */}
                  <div className='absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20' />
                  <div className='absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20' />
                </div>
              </div>

              {/* Text Container */}
              <div className='lg:basis-1/2 flex flex-col gap-8 lg:px-20'>
                <div className='flex flex-col gap-4'>
                  <span className='text-accent font-bebas text-lg tracking-[0.3em] uppercase'>Path 0{idx + 1}</span>
                  <h3 className='text-h2 md:text-[3.5rem] font-bebas text-light uppercase leading-[0.9]'>
                    {path.title}
                  </h3>
                </div>
                <p className='text-lg md:text-xl text-cream/70 font-poppins leading-relaxed'>
                  {path.description}
                </p>
                <ul className='flex flex-col gap-4 mb-4'>
                  {path.bulletPoints.map((point, i) => (
                    <li key={i} className='flex items-center gap-4 text-cream/60 font-poppins'>
                      <div className='w-1.5 h-1.5 bg-accent rounded-full' />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link href="#lead-capture">
                  <Button variant='outline' size='md' hoverTransition='lift' className='outline-accent! text-accent!'>
                    Learn More About This Route
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ConstructionMethodsSection;
