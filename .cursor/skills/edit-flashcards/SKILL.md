---
name: edit-flashcards
description: Edit Python flashcard decks and regenerate TypeScript output.
---

# Edit Python Flashcards

1. Edit `scripts/flashcard-content/python-decks.mjs`
2. Run `node scripts/generate-flashcards.mjs` or `npm run generate`
3. Output lands in `src/data/flashcards/*.ts`

Each deck: `{ id, title, cards: [{ front, back, code? }] }`
