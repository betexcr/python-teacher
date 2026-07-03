import { useCallback, useState } from 'react';
import { STORAGE_PREFIX } from '../config/brand';

const TUTORIAL_KEY = `${STORAGE_PREFIX}-tutorial:python-basics`;

export function readTutorialStep(): number {
  try {
    const raw = localStorage.getItem(TUTORIAL_KEY);
    if (!raw) return 0;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
}

export function writeTutorialStep(step: number) {
  try {
    localStorage.setItem(TUTORIAL_KEY, String(step));
  } catch {
    /* ignore */
  }
}

export function useTutorialPersistence() {
  const [stepIndex, setStepIndexState] = useState(readTutorialStep);

  const setStepIndex = useCallback((value: number | ((prev: number) => number)) => {
    setStepIndexState((prev) => {
      const next = typeof value === 'function' ? value(prev) : value;
      writeTutorialStep(next);
      return next;
    });
  }, []);

  return { stepIndex, setStepIndex };
}
