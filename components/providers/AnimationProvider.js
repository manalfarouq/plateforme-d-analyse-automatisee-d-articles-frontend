// components/providers/AnimationProvider.js
'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const AnimationContext = createContext();

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within AnimationProvider');
  }
  return context;
}

export function AnimationProvider({ children }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [expandingIndex, setExpandingIndex] = useState(null);

  const startNavigation = useCallback((index) => {
    setExpandingIndex(index);
    setIsNavigating(true);
  }, []);

  const endNavigation = useCallback(() => {
    setExpandingIndex(null);
    setIsNavigating(false);
  }, []);

  const value = {
    isNavigating,
    expandingIndex,
    startNavigation,
    endNavigation,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}
