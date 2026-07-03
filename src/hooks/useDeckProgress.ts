import { useCallback, useState } from 'react';
import {
  type DeckProgress,
  defaultDeckProgress,
  isCardComplete,
  isDeckCompleteProgress,
  readDeckProgress,
  writeDeckProgress,
} from '../utils/deckProgress';

export type { DeckProgress } from '../utils/deckProgress';

export function useDeckProgress(deckId: string | undefined, totalCards = 0) {
  const [trackedDeckId, setTrackedDeckId] = useState(deckId);
  const [progress, setProgress] = useState<DeckProgress>(() =>
    deckId ? readDeckProgress(deckId) : defaultDeckProgress()
  );

  if (deckId !== trackedDeckId) {
    setTrackedDeckId(deckId);
    setProgress(deckId ? readDeckProgress(deckId) : defaultDeckProgress());
  }

  const persist = useCallback(
    (next: DeckProgress) => {
      if (!deckId) return;
      writeDeckProgress(deckId, next);
      setProgress(next);
    },
    [deckId]
  );

  const setIndex = useCallback(
    (index: number) => {
      persist({ ...readDeckProgress(deckId!), lastIndex: index });
    },
    [deckId, persist]
  );

  const toggleCardComplete = useCallback(
    (cardIndex: number) => {
      if (!deckId) return;
      const current = readDeckProgress(deckId);
      const set = new Set(current.completedCardIndices);
      if (set.has(cardIndex)) set.delete(cardIndex);
      else set.add(cardIndex);
      persist({
        ...current,
        completedCardIndices: [...set].toSorted((a, b) => a - b),
      });
    },
    [deckId, persist]
  );

  const deckCompleted = isDeckCompleteProgress(progress, totalCards);

  return {
    progress,
    deckCompleted,
    setIndex,
    toggleCardComplete,
    isCardComplete: (cardIndex: number) => isCardComplete(progress, cardIndex),
  };
}
