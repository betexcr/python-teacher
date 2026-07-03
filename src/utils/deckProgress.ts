import { STORAGE_PREFIX } from '../config/brand';

export type DeckProgress = {
  lastIndex: number;
  completedCardIndices: number[];
};

const deckProgressKey = (deckId: string) => `${STORAGE_PREFIX}-deck:${deckId}`;

export function defaultDeckProgress(): DeckProgress {
  return { lastIndex: 0, completedCardIndices: [] };
}

export function readDeckProgress(deckId: string): DeckProgress {
  try {
    const raw = localStorage.getItem(deckProgressKey(deckId));
    if (!raw) return defaultDeckProgress();
    const parsed = JSON.parse(raw) as Partial<DeckProgress> & { completed?: boolean };
    const completedCardIndices = Array.isArray(parsed.completedCardIndices)
      ? [...new Set(parsed.completedCardIndices.filter((n) => typeof n === 'number'))]
      : [];
    return {
      lastIndex: typeof parsed.lastIndex === 'number' ? parsed.lastIndex : 0,
      completedCardIndices,
    };
  } catch {
    return defaultDeckProgress();
  }
}

let progressVersion = 0;

export function getProgressVersion() {
  return progressVersion;
}

function notifyProgressChange() {
  progressVersion += 1;
  window.dispatchEvent(new Event(`${STORAGE_PREFIX}-progress`));
}

export function writeDeckProgress(deckId: string, progress: DeckProgress) {
  localStorage.setItem(deckProgressKey(deckId), JSON.stringify(progress));
  notifyProgressChange();
}

export function isDeckFullyComplete(deckId: string, totalCards: number): boolean {
  if (totalCards <= 0) return false;
  const { completedCardIndices } = readDeckProgress(deckId);
  const done = new Set(completedCardIndices);
  for (let i = 0; i < totalCards; i++) {
    if (!done.has(i)) return false;
  }
  return true;
}

export function isDeckCompleteProgress(progress: DeckProgress, totalCards: number): boolean {
  if (totalCards <= 0) return false;
  const done = new Set(progress.completedCardIndices);
  for (let i = 0; i < totalCards; i++) {
    if (!done.has(i)) return false;
  }
  return true;
}

export function isCardComplete(progress: DeckProgress, cardIndex: number): boolean {
  return progress.completedCardIndices.includes(cardIndex);
}
