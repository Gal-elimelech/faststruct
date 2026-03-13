import {
  useEffect,
  useState,
  useRef,
  RefObject,
  useMemo,
  createRef,
} from 'react';

interface UseActiveTextIndexReturn {
  activeIndex: number;
  cubeTop: number;
  itemRefs: RefObject<HTMLDivElement | null>[];
  containerRef: RefObject<HTMLDivElement | null>;
}

export const useActiveTextIndex = (
  itemCount: number
): UseActiveTextIndexReturn => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cubeTop, setCubeTop] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Create refs array using useMemo to ensure stability
  const itemRefs = useMemo(() => {
    return Array.from({ length: itemCount }, () => createRef<HTMLDivElement>());
  }, [itemCount]);

  useEffect(() => {
    const updateActiveIndex = () => {
      const viewportCenter = window.innerHeight / 2;
      let newActiveIndex = 0;
      let minDistance = Infinity;

      itemRefs.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const itemCenterY = rect.top + rect.height / 2;
          const distance = Math.abs(itemCenterY - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            newActiveIndex = index;
          }
        }
      });

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }

      // Update cube position relative to container
      const activeRef = itemRefs[newActiveIndex];
      if (activeRef?.current && containerRef.current) {
        const itemRect = activeRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const containerTop = containerRect.top;
        const cubeHeight = 14; // 14px cube (12-16px range)
        // Calculate position relative to container
        const newCubeTop = itemCenterY - containerTop - cubeHeight / 2;
        setCubeTop(newCubeTop);
      }
    };

    // Initial calculation
    updateActiveIndex();

    // Update on scroll
    window.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [activeIndex, itemCount, itemRefs]);

  return {
    activeIndex,
    cubeTop,
    itemRefs,
    containerRef,
  };
};
