import { useMemo } from 'react';
import { useScreenWidth } from './useScreenWidth';
import { TailwindBreakpoints } from '@/lib/css-constants';

/**
 * Custom hook to determine if the current screen is mobile
 * @returns boolean indicating if screen is mobile (< md breakpoint)
 */
export function useIsMobile(): boolean {
  const { screenWidth } = useScreenWidth();

  return useMemo(() => {
    return screenWidth < TailwindBreakpoints.md;
  }, [screenWidth]);
}
