const MAIN_CONTENT_SELECTOR = '.main-content';

let scrollRestorationConfigured = false;

/** Prevent the browser from restoring scroll on the persistent layout scroll container. */
export function ensureManualScrollRestoration(): void {
  if (scrollRestorationConfigured || typeof window === 'undefined') return;
  scrollRestorationConfigured = true;
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
}

/**
 * Scroll the app main pane to top. Uses scrollTop assignment so behavior works
 * in all browsers (some ignore scrollTo when behavior is "instant").
 */
export function scrollMainToTop(mainEl?: HTMLElement | null): void {
  ensureManualScrollRestoration();

  const main =
    mainEl ?? document.querySelector<HTMLElement>(MAIN_CONTENT_SELECTOR);

  if (main) {
    main.scrollTop = 0;
  }

  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
