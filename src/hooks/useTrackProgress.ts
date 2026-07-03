import { useSyncExternalStore } from 'react';
import challengesIndex from '../data/challenges-index.json';
import { flashcardDecks } from '../data/flashcards';
import { pythonPatterns } from '../data/python-patterns';
import { systemDesignProblems } from '../data/system-design';
import { STORAGE_PREFIX } from '../config/brand';
import type { Difficulty } from '../lib/challenges';
import { isChallengeCompleted } from '../hooks/useChallengeProgress';
import { getProgressVersion, isDeckFullyComplete } from '../utils/deckProgress';
import { isRead } from './useReadTracking';

export type SearchResult = {
  title: string;
  subtitle: string;
  href: string;
  section: string;
};

const PROGRESS_EVENT = `${STORAGE_PREFIX}-progress`;

function subscribeProgress(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(PROGRESS_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(PROGRESS_EVENT, callback);
  };
}

export function searchContent(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const deck of flashcardDecks) {
    if (deck.title.toLowerCase().includes(q)) {
      results.push({
        title: deck.title,
        subtitle: 'Flashcard deck',
        href: `/flashcards/${deck.slug}`,
        section: 'Flashcards',
      });
    }
    deck.cards.forEach((card, i) => {
      if (card.question.toLowerCase().includes(q)) {
        results.push({
          title: card.question,
          subtitle: deck.title,
          href: `/flashcards/${deck.slug}`,
          section: 'Flashcards',
        });
      }
      if (i > 40) return;
    });
  }

  for (const [difficulty, items] of Object.entries(challengesIndex)) {
    for (const item of items as { slug: string; title: string }[]) {
      if (item.title.toLowerCase().includes(q)) {
        results.push({
          title: item.title,
          subtitle: `${difficulty} challenge`,
          href: `/challenges/${difficulty}/${item.slug}`,
          section: 'Challenges',
        });
      }
    }
  }

  for (const pattern of pythonPatterns) {
    if (pattern.title.toLowerCase().includes(q) || pattern.subtitle.toLowerCase().includes(q)) {
      results.push({
        title: pattern.title,
        subtitle: pattern.subtitle,
        href: `/python-patterns/${pattern.slug}`,
        section: 'Python Patterns',
      });
    }
  }

  for (const problem of systemDesignProblems) {
    if (problem.title.toLowerCase().includes(q) || problem.subtitle.toLowerCase().includes(q)) {
      results.push({
        title: problem.title,
        subtitle: problem.subtitle,
        href: `/system-design/${problem.slug}`,
        section: 'System Design',
      });
    }
  }

  return results.slice(0, 24);
}

export type TrackProgress = {
  label: string;
  href: string;
  completed: number;
  total: number;
  percent: number;
};

function computeTrackProgress(): TrackProgress[] {
  let challengeDone = 0;
  let challengeTotal = 0;
  for (const [difficulty, items] of Object.entries(challengesIndex)) {
    for (const item of items as { slug: string; acceptance: unknown[] }[]) {
      challengeTotal += 1;
      if (isChallengeCompleted(difficulty as Difficulty, item.slug, item.acceptance.length)) {
        challengeDone += 1;
      }
    }
  }

  let deckDone = 0;
  for (const deck of flashcardDecks) {
    if (isDeckFullyComplete(deck.id, deck.cards.length)) deckDone += 1;
  }

  let patternRead = 0;
  for (const p of pythonPatterns) {
    if (isRead('python-pattern', p.slug)) patternRead += 1;
  }

  let designRead = 0;
  for (const p of systemDesignProblems) {
    if (isRead('system-design', p.slug)) designRead += 1;
  }

  return [
    {
      label: 'Challenges',
      href: '/challenges',
      completed: challengeDone,
      total: challengeTotal,
      percent: challengeTotal ? Math.round((challengeDone / challengeTotal) * 100) : 0,
    },
    {
      label: 'Flashcard decks',
      href: '/flashcards',
      completed: deckDone,
      total: flashcardDecks.length,
      percent: flashcardDecks.length ? Math.round((deckDone / flashcardDecks.length) * 100) : 0,
    },
    {
      label: 'Python patterns',
      href: '/python-patterns',
      completed: patternRead,
      total: pythonPatterns.length,
      percent: pythonPatterns.length ? Math.round((patternRead / pythonPatterns.length) * 100) : 0,
    },
    {
      label: 'System design',
      href: '/system-design',
      completed: designRead,
      total: systemDesignProblems.length,
      percent: systemDesignProblems.length
        ? Math.round((designRead / systemDesignProblems.length) * 100)
        : 0,
    },
  ];
}

export function useTrackProgress(): TrackProgress[] {
  useSyncExternalStore(subscribeProgress, getProgressVersion, () => 0);
  return computeTrackProgress();
}
