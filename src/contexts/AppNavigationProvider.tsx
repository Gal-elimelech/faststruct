'use client';

import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';

interface INavigationContextReturn {
  isNavigating: boolean;
  startTransition: (path: string) => void;
  endTransition: () => void;
  targetPath: string | null;
}

const NavigationContext = createContext<INavigationContextReturn | null>(null);

interface INavigationProviderProps {
  children: React.ReactNode;
}

const AppNavigationProvider = ({ children }: INavigationProviderProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);

  const startTransition = (path: string) => {
    setIsNavigating(true);
    setTargetPath(path);
  };

  const endTransition = () => {
    setIsNavigating(false);
    setTargetPath(null);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [isNavigating]);

  return (
    <NavigationContext.Provider
      value={{ isNavigating, startTransition, endTransition, targetPath }}>
      {children}
    </NavigationContext.Provider>
  );
};

export function useAppNavigation(): INavigationContextReturn {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context as INavigationContextReturn;
}

export default AppNavigationProvider;
