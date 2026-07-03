export type Flashcard = {
  question: string;
  explanation: string;
};

export type FlashcardDeck = {
  id: string;
  slug: string;
  title: string;
  cards: Flashcard[];
};
