import { useMemo } from 'react';
import { useScreenWidth } from './useScreenWidth';
import { TailwindBreakpoints } from '@/lib/css-constants';

/**
 * Custom hook to determine if the current screen is tablet or smaller
 * @returns boolean indicating if screen is tablet or smaller (< lg breakpoint)
 */
export function useIsTablet(): boolean {
  const { screenWidth } = useScreenWidth();

  return useMemo(() => {
    return screenWidth < TailwindBreakpoints.lg;
  }, [screenWidth]);
}
