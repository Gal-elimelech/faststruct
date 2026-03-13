'use client';

import { motion } from 'motion/react';

const LoadingSkeleton = () => {
  return (
    <div className='flex flex-col justify-center gap-8 md:flex-row md:flex-wrap'>
      {[1, 2, 3, 4, 5].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className='w-full shrink grow overflow-hidden rounded-xl shadow-md md:max-w-1/2 md:basis-1/3'>
          <div className='bg-light flex flex-col gap-4'>
            <div className='bg-dark/20 relative aspect-[4/3] w-full overflow-hidden'>
              <motion.div
                className='from-dark/20 via-dark/40 to-dark/20 h-full w-full bg-gradient-to-r'
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                }}
              />
            </div>
            <div className='p-4'>
              <div className='bg-dark/20 mb-2 h-6 w-3/4 rounded'></div>
              <div className='bg-dark/20 h-4 w-1/2 rounded'></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
