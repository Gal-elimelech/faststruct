import { useCallback, useState } from 'react';

interface UseCountProps {
  initialCount?: number;
  step?: number;
  cycle?: boolean;
  max?: number;
}

interface UseCountReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  isAtMax: boolean;
  isAtMin: boolean;
}

export default function useCount({
  initialCount = 0,
  step = 1,
  cycle = false,
  max = Infinity,
}: UseCountProps): UseCountReturn {
  const [count, setCount] = useState(initialCount);

  const increment = useCallback(() => {
    setCount((prevCount) => {
      if (prevCount >= max) {
        return cycle ? initialCount : prevCount;
      }
      return prevCount + step;
    });
  }, [max, step, cycle, initialCount]);

  const decrement = useCallback(() => {
    setCount((prevCount) => {
      if (prevCount <= initialCount) {
        return cycle ? max : prevCount;
      }
      return prevCount - step;
    });
  }, [max, step, cycle, initialCount]);

  return {
    count,
    increment,
    decrement,
    isAtMax: count >= max,
    isAtMin: count <= initialCount,
  };
}
