'use client';

import { useState, useCallback } from 'react';

/**
 * A hook to manage a boolean state.
 *
 * @param initialState The initial state, defaults to false.
 * @returns A tuple containing the current state and a function to toggle it.
 */
export const useToggle = (initialState = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle];
};
