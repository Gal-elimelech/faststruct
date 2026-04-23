'use client';

import { Section } from '@/components/Section';
import { IServicesOverview } from '@/types/landing';
import { motion } from 'motion/react';

const ServicesOverviewSection: React.FC<IServicesOverview> = ({ title, subtitle, items }) => {
  return (
    <Section bgColor='white' textColor='dark' className='relative'>
      <div className='flex flex-col gap-10'>

        <div className='max-w-4xl flex flex-col gap-4'>
          <h2 className='text-h2 font-bebas text-dark uppercase leading-[0.85]'>
            {title}
          </h2>
          {subtitle && (
            <p className='text-h6 md:text-xl text-dark/70 font-poppins leading-relaxed max-w-2xl'>
              {subtitle}
            </p>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-accent border border-dark/10'>
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className='group bg-white p-12  flex flex-col gap-16 relative overflow-hidden'
            >
              <div className='flex flex-col gap-6 relative z-10'>
                <h3 className='text-h3 font-bebas text-dark uppercase leading-none transition-colors duration-500'>
                  {item.title}
                </h3>
                <div className='w-12 h-[2px] bg-accent/30 group-hover:w-full transition-all duration-700' />
              </div>

              <p className='text-dark/70 font-poppins text-lg leading-relaxed relative z-10'>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ServicesOverviewSection;
