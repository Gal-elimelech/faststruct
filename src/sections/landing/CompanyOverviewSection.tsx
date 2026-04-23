'use client';

import { Section } from '@/components/Section';
import { ICompanyOverview } from '@/types/landing';
import { motion } from 'motion/react';
import { LandingCtaLink } from '@/sections/landing/components/LandingCtaLink';

const CompanyOverviewSection: React.FC<ICompanyOverview> = ({ title, texts, items, cta }) => {
  return (
    <Section bgColor='dark' textColor='light' className='border-t border-white/5'>
      <div className='flex flex-col lg:flex-row gap-16 items-start justify-between'>
        <div className='lg:w-1/2 flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-h2 font-bebas text-light uppercase leading-[0.9]'>
              {title}
            </h2>
            <div className='flex flex-col gap-3'>
              {texts.map((t, i) => (
                <p key={i} className='text-light/70 font-poppins text-lg leading-relaxed max-w-xl'>
                  {t}
                </p>
              ))}
            </div>
          </div>
          
          <LandingCtaLink href={cta.link} linkClassName='inline-block w-full sm:w-auto'>
            Call: {cta.text}
          </LandingCtaLink>
        </div>

        <div className='lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 w-full pt-4'>
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className='flex items-start gap-5 group'
            >
              <div className='w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-all duration-500'>
                <i className={`fa-solid ${item.icon.replace('fas ', '').replace('fa-solid ', '')} text-accent group-hover:text-dark transition-colors text-lg`}></i>
              </div>
              <span className='font-bebas text-xl text-light/90 uppercase tracking-tight pt-2'>{item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CompanyOverviewSection;
