import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const TOP_N = 50;

function loadOgRoutes() {
  const raw = readFileSync(join(root, 'src/data/og-manifest.ts'), 'utf8');
  const match = raw.match(/"routes":\s*(\{[\s\S]*\})\s*,?\s*\}\s*as const/);
  if (!match) throw new Error('Could not parse og-manifest routes');
  const routes = JSON.parse(match[1]);
  return Object.entries(routes).map(([path, meta]) => ({ path, ...meta }));
}

function stripMarkdown(md) {
  return md
    .replace(/^#+\s+/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 1200);
}

function challengeBody(difficulty, slug) {
  try {
    const md = readFileSync(
      join(root, `public/challenges/${difficulty}/${slug}/CHALLENGE.md`),
      'utf8',
    );
    return stripMarkdown(md);
  } catch {
    return '';
  }
}

const priority = [
  '/get-started',
  '/about',
  '/faq',
  '/blog',
  '/challenges',
  '/flashcards',
];

const routes = loadOgRoutes();
const ordered = [
  ...priority.map((p) => routes.find((r) => r.path === p)).filter(Boolean),
  ...routes.filter((r) => !priority.includes(r.path)),
].slice(0, TOP_N);

const snapshots = ordered.map((route) => {
  const challengeMatch = route.path.match(/^\/challenges\/([^/]+)\/([^/]+)$/);
  let body = route.description;
  if (challengeMatch) {
    const [, difficulty, slug] = challengeMatch;
    const md = challengeBody(difficulty, slug);
    if (md) body = `${route.description}\n\n${md}`;
  }
  return {
    path: route.path,
    title: route.title,
    description: route.description,
    body,
  };
});

writeFileSync(join(root, 'src/data/seo/crawl-snapshots.json'), JSON.stringify({ snapshots }, null, 2));
console.log(`Prerender crawl snapshots: ${snapshots.length} pages`);
