import { useState, useEffect } from 'react';

interface Responsive {
  isMobile: boolean;   // < 768px
  isTablet: boolean;   // 768–1024px
  isDesktop: boolean;  // > 1024px
}

const MOBILE = 768;
const TABLET = 1024;

const getState = (): Responsive => {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1440;
  return {
    isMobile: w < MOBILE,
    isTablet: w >= MOBILE && w < TABLET,
    isDesktop: w >= TABLET,
  };
};

export function useResponsive(): Responsive {
  const [state, setState] = useState(getState);

  useEffect(() => {
    const onResize = () => setState(getState());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return state;
}
