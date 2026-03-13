'use client';

import {
  TailwindBreakpoints,
  TailwindBreakpointsUnion,
} from '@/lib/css-constants';
import { useState, useEffect } from 'react';

interface IuseScreenWidthReturn {
  screenWidth: number;
  breakpoint: TailwindBreakpointsUnion | undefined;
}

export const useScreenWidth = (): IuseScreenWidthReturn => {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const listener = () => setScreenWidth(window.innerWidth);

      window.addEventListener('resize', listener);
      return () => window.removeEventListener('resize', listener);
    }
  }, []);

  const keysArray = Object.keys(
    TailwindBreakpoints
  ) as TailwindBreakpointsUnion[];
  const breakpoint = keysArray.findLast(
    (key) => TailwindBreakpoints[key] < screenWidth
  );

  return {
    screenWidth,
    breakpoint,
  };
};
