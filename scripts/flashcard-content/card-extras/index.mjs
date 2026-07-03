/** Optional per-card extras (detail, code). Python decks embed code in backs; map is empty by default. */
const BY_DECK = {};

function normalizeFront(front) {
  return front.trim().replace(/\?$/, '');
}

/** @returns {{ detail?: string; code?: string }} */
export function getCardExtras(deckId, front) {
  const key = normalizeFront(front);
  const deck = BY_DECK[deckId];
  if (!deck) return {};
  return deck[key] ?? deck[front.trim()] ?? {};
}
