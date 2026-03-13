'use client';

import { motion, Variants } from 'motion/react';

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
          <i className='fas fa-bars size-fit transition-all group-hover:scale-110 group-active:scale-90'></i>
        </div>
        <div className='flex aspect-square w-full items-center justify-center'>
          <i className='fas fa-times size-fit transition-all group-hover:scale-110 group-active:scale-90'></i>
        </div>
      </motion.div>
    </button>
  );
};

export default HamburgerButton;
