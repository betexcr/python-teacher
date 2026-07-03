import { useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { STORAGE_PREFIX } from '../config/brand';
import { flashcardDecks } from '../data/flashcards';
import { getProgressVersion, isDeckFullyComplete } from '../utils/deckProgress';

const PROGRESS_EVENT = `${STORAGE_PREFIX}-progress`;

function subscribeProgress(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(PROGRESS_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(PROGRESS_EVENT, callback);
  };
}

function useProgressVersion() {
  return useSyncExternalStore(subscribeProgress, getProgressVersion, () => 0);
}

export function FlashcardsPage() {
  useProgressVersion();

  return (
    <>
      <h1 className="page-title">Flashcard Sections</h1>
      <div className="flashcard-grid">
        {flashcardDecks.map((deck) => {
          const completed = isDeckFullyComplete(deck.id, deck.cards.length);
          return (
            <Link key={deck.id} to={`/flashcards/${deck.slug}`} className="flashcard-section-card">
              {completed && (
                <span className="flashcard-completed-badge flashcard-completed-badge--small">Completed</span>
              )}
              <h3>{deck.title}</h3>
              <p>
                {deck.cards.length} flashcard{deck.cards.length === 1 ? '' : 's'}
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
