'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  currentPosition: number;
  shouldCarousel: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
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
  const [currentPosition, setCurrentPosition] = useState(middleStartIndex);
  const [isPaused, setIsPaused] = useState(false);
  const currentPositionRef = useRef(middleStartIndex);
  const lastFrameTimeRef = useRef<number | null>(null);

  const normalizePosition = useCallback(
    (position: number): number => {
      if (!shouldCarousel) return middleStartIndex;

      if (position >= galleryLength * 2) {
        return position - galleryLength;
      }

      if (position < galleryLength) {
        return position + galleryLength;
      }

      return position;
    },
    [galleryLength, middleStartIndex, shouldCarousel]
  );

  useEffect(() => {
    setCurrentPosition(middleStartIndex);
    currentPositionRef.current = middleStartIndex;
    lastFrameTimeRef.current = null;
  }, [middleStartIndex, galleryLength]);

  const goToNext = useCallback(() => {
    if (!shouldCarousel) return;
    const nextPosition = normalizePosition(currentPositionRef.current + 1);
    currentPositionRef.current = nextPosition;
    setCurrentPosition(nextPosition);
  }, [normalizePosition, shouldCarousel]);

  const goToPrevious = useCallback(() => {
    if (!shouldCarousel) return;
    const nextPosition = normalizePosition(currentPositionRef.current - 1);
    currentPositionRef.current = nextPosition;
    setCurrentPosition(nextPosition);
  }, [normalizePosition, shouldCarousel]);

  useEffect(() => {
    if (!shouldCarousel || isPaused || autoPlayInterval <= 0) return;

    let animationFrameId = 0;
    const itemsPerMs = 1 / autoPlayInterval;

    const animate = (timestamp: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;

      const nextPosition = normalizePosition(
        currentPositionRef.current + elapsed * itemsPerMs
      );

      currentPositionRef.current = nextPosition;
      setCurrentPosition(nextPosition);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lastFrameTimeRef.current = null;
    };
  }, [autoPlayInterval, isPaused, normalizePosition, shouldCarousel]);

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
    currentPosition,
    shouldCarousel,
    goToNext,
    goToPrevious,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
    handleTouchCancel,
  };
}
