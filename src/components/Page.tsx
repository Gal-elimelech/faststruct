'use client';
import { ReactNode, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useAppNavigation } from '@/contexts/AppNavigationProvider';
interface IPageProps {
  children: ReactNode;
  className?: string;
}

export default function Page({ children, className = '' }: IPageProps) {
  const pathname = usePathname();
  const { endTransition, isNavigating } = useAppNavigation();

  useEffect(() => {
    endTransition();
  }, []);

  return (
    <AnimatePresence>
      {!isNavigating ? (
        <motion.div
          key={pathname}
          className={`origin-left ${className}`}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}>
          {children}
        </motion.div>
      ) : (
        <div className='h-[300vh] w-full bg-white'></div>
      )}
    </AnimatePresence>
  );
}
