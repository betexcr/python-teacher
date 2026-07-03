import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMainScrollRef } from '../context/MainScrollContext';
import { scrollMainToTop } from '../utils/scroll';

/** Scrolls the main content pane (and window) to top on every route change. */
export function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const mainRef = useMainScrollRef();
  const routeScrollKey = `${pathname}${search}${hash}`;

  const scroll = useCallback(() => {
    scrollMainToTop(mainRef?.current ?? null);
  }, [mainRef]);

  useLayoutEffect(() => {
    scroll();
  }, [routeScrollKey, scroll]);

  useEffect(() => {
    scroll();
    const raf = requestAnimationFrame(() => {
      scroll();
      requestAnimationFrame(scroll);
    });
    const timeout = window.setTimeout(scroll, 0);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, [routeScrollKey, scroll]);

  return null;
}
