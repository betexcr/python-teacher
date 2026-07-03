import { STORAGE_PREFIX } from '../config/brand';

const FILTER_KEY = `${STORAGE_PREFIX}-flashcards:uncompletedOnly`;

export function readUncompletedOnlyFilter(): boolean {
  try {
    return localStorage.getItem(FILTER_KEY) === 'true';
  } catch {
    return false;
  }
}

export function writeUncompletedOnlyFilter(enabled: boolean): void {
  try {
    localStorage.setItem(FILTER_KEY, enabled ? 'true' : 'false');
  } catch {
    /* ignore quota / private mode */
  }
}

export function getUncompletedIndices(
  total: number,
  isComplete: (index: number) => boolean
): number[] {
  const indices: number[] = [];
  for (let i = 0; i < total; i++) {
    if (!isComplete(i)) indices.push(i);
  }
  return indices;
}
