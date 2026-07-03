import { useCallback, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMainScrollRef } from '../context/MainScrollContext';
import { scrollMainToTop } from '../utils/scroll';

/** Scroll main content to top when this route mounts or the location changes. */
export function useRouteScrollTop() {
  const { key } = useLocation();
  const mainRef = useMainScrollRef();

  const scroll = useCallback(() => {
    scrollMainToTop(mainRef?.current ?? null);
  }, [mainRef]);

  useLayoutEffect(() => {
    scroll();
    const raf = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(raf);
  }, [key, scroll]);
}
