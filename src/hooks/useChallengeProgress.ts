import { useCallback, useState } from 'react';
import { STORAGE_PREFIX } from '../config/brand';

export type ChallengeProgress = {
  checked: number[];
  completed: boolean;
};

const storageKey = (difficulty: string, slug: string) =>
  `${STORAGE_PREFIX}-challenge:${difficulty}/${slug}`;

function readChallengeProgress(
  difficulty: string,
  slug: string
): ChallengeProgress {
  try {
    const raw = localStorage.getItem(storageKey(difficulty, slug));
    if (!raw) return { checked: [], completed: false };
    const parsed = JSON.parse(raw) as ChallengeProgress;
    return {
      checked: Array.isArray(parsed.checked) ? parsed.checked : [],
      completed: Boolean(parsed.completed),
    };
  } catch {
    return { checked: [], completed: false };
  }
}

export function isChallengeCompleted(
  difficulty: string,
  slug: string,
  acceptanceCount: number
): boolean {
  if (acceptanceCount === 0) return false;
  const { checked, completed } = readChallengeProgress(difficulty, slug);
  return completed || checked.length >= acceptanceCount;
}

export function useChallengeProgress(
  difficulty: string | undefined,
  slug: string | undefined,
  acceptanceCount: number
) {
  const [trackedKey, setTrackedKey] = useState<string | undefined>(
    difficulty && slug ? `${difficulty}/${slug}` : undefined
  );
  const [progress, setProgress] = useState<ChallengeProgress>(() =>
    difficulty && slug
      ? readChallengeProgress(difficulty, slug)
      : { checked: [], completed: false }
  );

  const routeKey = difficulty && slug ? `${difficulty}/${slug}` : undefined;
  if (routeKey !== trackedKey) {
    setTrackedKey(routeKey);
    setProgress(
      routeKey ? readChallengeProgress(difficulty!, slug!) : { checked: [], completed: false }
    );
  }

  const toggleCriterion = useCallback(
    (index: number) => {
      if (!difficulty || !slug) return;
      setProgress((prev) => {
        const checkedSet = new Set(prev.checked);
        if (checkedSet.has(index)) checkedSet.delete(index);
        else checkedSet.add(index);
        const checked = [...checkedSet].toSorted((a, b) => a - b);
        const completed =
          acceptanceCount > 0 && checked.length >= acceptanceCount;
        const next = { checked, completed };
        localStorage.setItem(storageKey(difficulty, slug), JSON.stringify(next));
        return next;
      });
    },
    [difficulty, slug, acceptanceCount]
  );

  const isChecked = useCallback(
    (index: number) => progress.checked.includes(index),
    [progress.checked]
  );

  return {
    progress,
    toggleCriterion,
    isChecked,
    isComplete:
      acceptanceCount > 0 &&
      (progress.completed || progress.checked.length >= acceptanceCount),
  };
}
