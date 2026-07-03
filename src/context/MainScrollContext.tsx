import { createContext, use, type RefObject } from 'react';

export const MainScrollContext = createContext<RefObject<HTMLElement | null> | null>(null);

export function useMainScrollRef() {
  return use(MainScrollContext);
}
