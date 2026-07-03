import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { enrichCard } from './flashcard-content/enrich.mjs';
import { pythonDecks } from './flashcard-content/python-decks.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'src', 'data', 'flashcards');

const DECK_SLUGS = {
  'python-fundamentals': 'fundamentals',
  'data-structures': 'data-structures',
  functions: 'functions',
  oop: 'oop',
  typing: 'typing',
  stdlib: 'stdlib',
  async: 'async',
  pytest: 'pytest',
  fastapi: 'fastapi',
  flask: 'flask',
  databases: 'databases',
  devops: 'devops',
  cloud: 'cloud',
  'data-eng': 'data-eng',
  performance: 'performance',
  'clean-code': 'clean-code',
  'llm-apps': 'llm-apps',
  rag: 'rag',
  agents: 'agents',
  mcp: 'mcp',
};

const processedDecks = pythonDecks.map((d) => ({
  id: d.id,
  slug: DECK_SLUGS[d.id] ?? d.id,
  title: d.title,
  cards: d.cards.map((c) => enrichCard(d.title, d.id, c.front, c.back, c)),
}));

fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, 'types.ts'),
  `export type Flashcard = {
  question: string;
  explanation: string;
};

export type FlashcardDeck = {
  id: string;
  slug: string;
  title: string;
  cards: Flashcard[];
};
`
);

function toExportName(id) {
  return id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

const deckIds = new Set(processedDecks.map((d) => d.id));

for (const file of fs.readdirSync(outDir)) {
  if (!file.endsWith('.ts') || file === 'types.ts' || file === 'index.ts') continue;
  const deckId = file.replace(/\.ts$/, '');
  if (!deckIds.has(deckId)) {
    fs.unlinkSync(path.join(outDir, file));
  }
}

const deckFiles = processedDecks.map((d) => {
  const constName = toExportName(d.id);
  const content = `import type { FlashcardDeck } from './types';

export const ${constName}Deck: FlashcardDeck = ${JSON.stringify(d, null, 2)};
`;
  fs.writeFileSync(path.join(outDir, `${d.id}.ts`), content);
  return { id: d.id, exportName: `${constName}Deck`, count: d.cards.length };
});

const imports = deckFiles.map((d) => `import { ${d.exportName} } from './${d.id}';`).join('\n');
const registry = deckFiles.map((d) => `  ${d.exportName},`).join('\n');

fs.writeFileSync(
  path.join(outDir, 'index.ts'),
  `${imports}

export * from './types';

export const flashcardDecks = [
${registry}
];

export function getDeckBySlug(slug: string) {
  return flashcardDecks.find((d) => d.slug === slug);
}
`
);

const totalCards = processedDecks.reduce((n, d) => n + d.cards.length, 0);
console.log(`Generated ${processedDecks.length} decks, ${totalCards} cards total.`);
for (const d of deckFiles) {
  console.log(`  ${d.id}: ${d.count} cards`);
}
