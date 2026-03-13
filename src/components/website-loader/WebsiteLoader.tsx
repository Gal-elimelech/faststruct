'use client';

import { Fragment, ReactNode, useEffect, useState } from 'react';
import LogoStrokeFillAnimated from './LogoStrokeFillAnimated';
import { AnimatePresence, motion, Variants } from 'motion/react';
import { useLenis } from 'lenis/react';

interface IWebsiteLoaderProps {
  children: ReactNode;
}

const LOGO_ANIMATION_DURATION = 3; // seconds
const FRAME_ANIMATION_DURATION = 1.2; // seconds
// Text animation: delay (0.45 + 3) + (9 letters * 0.1s stagger) + last letter duration (0.5s) = 4.75s
const TEXT_ANIMATION_COMPLETE_TIME = 4.75; // seconds

const WebsiteLoader = ({ children }: IWebsiteLoaderProps) => {
  const lenis = useLenis();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!lenis) return;
    lenis.stop();

    // Wait for text animation to complete before starting frame exit
    const timer = setTimeout(() => {
      setShowLoader(false);
      lenis.start();
    }, TEXT_ANIMATION_COMPLETE_TIME * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [lenis]);

  const loaderVariants: Variants = {
    hidden: {
      y: '-120%',
    },
    visible: {
      y: '0%',
    },
  };

  return (
    <AnimatePresence>
      {showLoader && (
        <Fragment key='website-loader'>
          <motion.div
            variants={loaderVariants}
            initial='visible'
            animate='visible'
            exit='hidden'
            transition={{
              duration: FRAME_ANIMATION_DURATION,
              ease: [0.68, -0.2, 0.32, 1.2],
            }}
            className='bg-dark fixed z-50 flex w-full items-center justify-center'
            style={{
              top: '-10%',
              height: '120dvh',
              minHeight: '120vh',
            }}>
            <LogoStrokeFillAnimated
              delay={FRAME_ANIMATION_DURATION - LOGO_ANIMATION_DURATION * 0.25}
              duration={LOGO_ANIMATION_DURATION}
              color='light'
            />
          </motion.div>
          <div
            className='bg-dark fixed z-40 w-full'
            style={{
              height: '120dvh',
              minHeight: '120vh',
            }}
          />
        </Fragment>
      )}
      <Fragment key='website-content'>{children}</Fragment>
    </AnimatePresence>
  );
};

export default WebsiteLoader;
