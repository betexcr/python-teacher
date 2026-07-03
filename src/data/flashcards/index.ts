import { pythonFundamentalsDeck } from './python-fundamentals';
import { dataStructuresDeck } from './data-structures';
import { functionsDeck } from './functions';
import { oopDeck } from './oop';
import { typingDeck } from './typing';
import { stdlibDeck } from './stdlib';
import { asyncDeck } from './async';
import { pytestDeck } from './pytest';
import { fastapiDeck } from './fastapi';
import { flaskDeck } from './flask';
import { databasesDeck } from './databases';
import { devopsDeck } from './devops';
import { cloudDeck } from './cloud';
import { dataEngDeck } from './data-eng';
import { performanceDeck } from './performance';
import { cleanCodeDeck } from './clean-code';
import { llmAppsDeck } from './llm-apps';
import { ragDeck } from './rag';
import { agentsDeck } from './agents';
import { mcpDeck } from './mcp';

export * from './types';

export const flashcardDecks = [
  pythonFundamentalsDeck,
  dataStructuresDeck,
  functionsDeck,
  oopDeck,
  typingDeck,
  stdlibDeck,
  asyncDeck,
  pytestDeck,
  fastapiDeck,
  flaskDeck,
  databasesDeck,
  devopsDeck,
  cloudDeck,
  dataEngDeck,
  performanceDeck,
  cleanCodeDeck,
  llmAppsDeck,
  ragDeck,
  agentsDeck,
  mcpDeck,
];

export function getDeckBySlug(slug: string) {
  return flashcardDecks.find((d) => d.slug === slug);
}
