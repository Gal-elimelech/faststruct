'use client';

import { Section } from '@/components/Section';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { ILocation } from '@/types/landing';
import { motion } from 'motion/react';

const LandingLocationSection: React.FC<ILocation> = ({
  title,
  mainAddress,
  phone,
  serviceAreas,
}) => {
  return (
    <Section
      bgColor='dark'
      textColor='light'
      className='relative overflow-hidden border-t border-white/5'>
      <div className='pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-accent/5 blur-[120px]' />

      <div className='relative z-10 flex flex-col gap-12 lg:gap-16'>
        <div className='flex flex-col items-end justify-between gap-8 md:flex-row'>
          <div className='max-w-4xl'>
            <h2 className='text-h2 font-bebas text-light uppercase leading-[0.9]'>
              {title}
            </h2>
          </div>
        </div>

        <div className='grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='flex flex-col gap-8'>
            <p className='font-poppins text-xs font-semibold tracking-[0.2em] text-light/50 uppercase'>
              {mainAddress.label}
            </p>

            <div className='rounded-sm border border-white/10 bg-white/2 p-6 md:p-8'>
              <div className='flex gap-4'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10'>
                  <i className='fa-solid fa-location-dot text-xl text-accent' />
                </div>
                <div className='min-w-0'>
                  <p className='font-bebas text-3xl leading-[0.95] text-light uppercase sm:text-4xl md:text-5xl'>
                    {mainAddress.street}
                  </p>
                  <p className='mt-2 font-bebas text-xl tracking-wider text-light/90 uppercase sm:text-2xl'>
                    {mainAddress.cityStateZip}
                  </p>
                </div>
              </div>
            </div>

            <a
              href={`tel:${phone.tel}`}
              className='group flex items-center gap-4 rounded-sm border border-white/5 bg-white/2 p-4 transition-colors hover:border-accent/30'>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-colors group-hover:bg-accent'>
                <i className='fa-solid fa-phone text-accent transition-colors group-hover:text-dark' />
              </div>
              <span className='font-bebas text-lg tracking-wider text-light/90 uppercase'>
                <a href={`tel:${phone.tel}`}>{phone.display}</a>
              </span>
            </a>

            <div>
              <h3 className='font-bebas text-lg tracking-wider text-light/70 uppercase'>
                Counties we serve
              </h3>
              <ul className='mt-4 flex flex-wrap gap-2'>
                {serviceAreas.map((area) => (
                  <li
                    key={area}
                    className='rounded-full border border-white/10 bg-white/3 px-3 py-1.5 font-poppins text-xs text-light/85'>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className='flex h-full min-h-0 flex-col'>
            <div className='relative h-[280px] w-full overflow-hidden rounded-sm border border-white/10 sm:h-[320px] lg:h-full lg:min-h-[420px]'>
              <GoogleMapEmbed
                mapQuery={mainAddress.mapQuery}
                className='absolute inset-0 h-full w-full'
                title='Fast Struct headquarters map'
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default LandingLocationSection;
