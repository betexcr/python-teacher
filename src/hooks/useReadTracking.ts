import { useEffect } from 'react';
import { STORAGE_PREFIX } from '../config/brand';

export function markAsRead(section: string, slug: string | undefined) {
  if (!slug) return;
  try {
    const key = `${STORAGE_PREFIX}-read:${section}:${slug}`;
    localStorage.setItem(key, '1');
    window.dispatchEvent(new Event(`${STORAGE_PREFIX}-progress`));
  } catch {
    /* ignore */
  }
}

export function isRead(section: string, slug: string): boolean {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}-read:${section}:${slug}`) === '1';
  } catch {
    return false;
  }
}

export function useReadTracking(section: string, slug: string | undefined) {
  useEffect(() => {
    if (slug) markAsRead(section, slug);
  }, [section, slug]);
}
