import { useState, useEffect } from 'react';
import { useIsMobile } from './useIsMobile';

/**
 * Custom hook to manage filter drawer open/close state
 * @returns drawer state and toggle function
 */
export function useFilterDrawer() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  // Update open state when mobile state changes
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    toggle,
    isMobile,
  };
}

