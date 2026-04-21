'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { IGalleryItem } from '@/types/landing';
import { useIsMobile } from './useIsMobile';

interface IUseLandingGalleryCarouselParams {
  gallery: IGalleryItem[];
  visibleCount?: number;
  autoPlayInterval?: number;
}

interface IUseLandingGalleryCarouselReturn {
  trackItems: IGalleryItem[];
  visibleCount: number;
  currentIndex: number;
  isTransitionEnabled: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  handleTrackTransitionEnd: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleTouchStart: () => void;
  handleTouchEnd: () => void;
  handleTouchCancel: () => void;
}

export function useLandingGalleryCarousel({
  gallery,
  visibleCount = 3,
  autoPlayInterval = 3500,
}: IUseLandingGalleryCarouselParams): IUseLandingGalleryCarouselReturn {
  const isMobile = useIsMobile();
  const galleryLength = gallery.length;
  const shouldCarousel = galleryLength > visibleCount;

  const trackItems = useMemo(
    () => [...gallery, ...gallery, ...gallery],
    [gallery]
  );

  const middleStartIndex = galleryLength;
  const [currentIndex, setCurrentIndex] = useState(middleStartIndex);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setCurrentIndex(middleStartIndex);
    setIsTransitionEnabled(true);
  }, [middleStartIndex]);

  const goToNext = useCallback(() => {
    if (!shouldCarousel) return;
    setIsTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  }, [shouldCarousel]);

  const goToPrevious = useCallback(() => {
    if (!shouldCarousel) return;
    setIsTransitionEnabled(true);
    setCurrentIndex((prev) => prev - 1);
  }, [shouldCarousel]);

  const handleTrackTransitionEnd = useCallback(() => {
    if (!shouldCarousel) return;

    if (currentIndex >= galleryLength * 2) {
      setIsTransitionEnabled(false);
      setCurrentIndex(galleryLength);
      return;
    }

    if (currentIndex < galleryLength) {
      setIsTransitionEnabled(false);
      setCurrentIndex(galleryLength * 2 - 1);
    }
  }, [currentIndex, galleryLength, shouldCarousel]);

  useEffect(() => {
    if (isTransitionEnabled) return;

    const timer = setTimeout(() => {
      setIsTransitionEnabled(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [isTransitionEnabled]);

  useEffect(() => {
    if (!shouldCarousel || isPaused || autoPlayInterval <= 0) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlayInterval, goToNext, isPaused, shouldCarousel]);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsPaused(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsPaused(false);
    }
  }, [isMobile]);

  const handleTouchStart = useCallback(() => {
    if (isMobile) {
      setIsPaused(true);
    }
  }, [isMobile]);

  const handleTouchEnd = useCallback(() => {
    if (isMobile) {
      setIsPaused(false);
    }
  }, [isMobile]);

  const handleTouchCancel = useCallback(() => {
    if (isMobile) {
      setIsPaused(false);
    }
  }, [isMobile]);

  return {
    trackItems,
    visibleCount,
    currentIndex,
    isTransitionEnabled,
    goToNext,
    goToPrevious,
    handleTrackTransitionEnd,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
    handleTouchCancel,
  };
}
