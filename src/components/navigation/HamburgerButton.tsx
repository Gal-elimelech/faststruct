'use client';

import { motion, Variants } from 'motion/react';
import { Menu, X } from 'lucide-react';

const variants: Variants = {
  closed: {
    y: '0%',
  },
  opened: {
    y: '-50%',
  },
};

interface IHamburgerButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const HamburgerButton = ({ isOpen, toggleMenu }: IHamburgerButtonProps) => {
  return (
    <button
      onClick={toggleMenu}
      className='bg-accent relative size-9 justify-center overflow-hidden rounded-lg text-lg text-white lg:hidden'>
      <motion.div
        variants={variants}
        initial='closed'
        animate={isOpen ? 'opened' : 'closed'}
        transition={{ duration: 0.3 }}
        className='flex w-full flex-col justify-start'>
        <div className='flex aspect-square w-full items-center justify-center'>
          <Menu className='size-fit transition-all group-hover:scale-110 group-active:scale-90' />
        </div>
        <div className='flex aspect-square w-full items-center justify-center'>
          <X className='size-fit transition-all group-hover:scale-110 group-active:scale-90' />
        </div>
      </motion.div>
    </button>
  );
};

export default HamburgerButton;
