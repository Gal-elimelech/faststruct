'use client';

import NavLink from './NavLink';
import { ENABLED_ROUTES } from '@/lib/routes';
import { RefObject } from 'react';
import { motion, Variants } from 'motion/react';

interface IMobileNavbarProps {
  menuRef: RefObject<HTMLDivElement | null>;
  onNavigate?: () => void;
}

const variants: Variants = {
  closed: {
    y: '-100%',
    opacity: 0,
  },
  opened: {
    y: '0%',
    opacity: 1,
  },
};

const MobileNavbar = ({ menuRef, onNavigate }: IMobileNavbarProps) => {
  return (
    <motion.div
      initial='closed'
      animate='opened'
      exit='closed'
      transition={{ duration: 0.3 }}
      variants={variants}
      className='bg-dark/95 absolute top-full left-0 z-0 flex w-full items-center justify-center p-8 backdrop-blur-sm lg:hidden'>
      <nav
        ref={menuRef}
        className='flex flex-col items-center justify-center gap-2'>
        {ENABLED_ROUTES.map((route) => (
          <NavLink
            button={route.isButton}
            key={route.href}
            href={route.href}
            onNavigate={onNavigate}>
            {route.title}
          </NavLink>
        ))}
      </nav>
    </motion.div>
  );
};

export default MobileNavbar;
