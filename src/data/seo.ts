import { ogManifest } from './og-manifest.js';
import { SITE_NAME, SITE_URL } from '../config/brand';

export { SITE_NAME, SITE_URL };

export type PageMeta = {
  title: string;
  description: string;
  ogImageId: string;
};

type ManifestRoute = {
  title: string;
  description: string;
  ogImageId: string;
};

const DEFAULT_META: PageMeta = {
  title: SITE_NAME,
  description:
    'Python interview prep with coding challenges, flashcards, patterns, and backend system design walkthroughs.',
  ogImageId: 'default',
};

const SECTION_FALLBACK: Record<string, PageMeta> = {
  '/get-started': {
    title: `Get Started · ${SITE_NAME}`,
    description: 'Setup, study paths, and how to get the most from PythonTeacher.',
    ogImageId: 'get-started',
  },
  '/python-basics': {
    title: `Python Basics · ${SITE_NAME}`,
    description:
      'Python from zero: types, control flow, functions, modules, venv, files, and exceptions before easy challenges.',
    ogImageId: 'python-basics',
  },
  '/challenges': {
    title: `Python Challenges · ${SITE_NAME}`,
    description:
      'Hands-on Python coding challenges from easy to very hard with acceptance criteria.',
    ogImageId: 'challenges',
  },
  '/flashcards': {
    title: `Flashcards · ${SITE_NAME}`,
    description: 'Quick-review flashcards for FastAPI, pytest, asyncio, RAG, MCP, and more.',
    ogImageId: 'flashcards',
  },
  '/python-patterns': {
    title: `Python Patterns · ${SITE_NAME}`,
    description:
      'Python idioms and design patterns: decorators, dataclasses, async, clean architecture, and more.',
    ogImageId: 'python-patterns',
  },
  '/system-design': {
    title: `System Design · ${SITE_NAME}`,
    description: 'Backend system design problems and interview walkthroughs with Python.',
    ogImageId: 'system-design',
  },
};

const manifestRoutes = ogManifest.routes as Record<string, ManifestRoute>;

export function ogImageUrl(ogImageId: string): string {
  return `${SITE_URL}/og/${ogImageId}.png`;
}

function normalizePathname(pathname: string): string {
  if (pathname === '/') return '/get-started';
  return pathname.replace(/\/+$/, '') || '/get-started';
}

export function getPageMeta(pathname: string): PageMeta {
  const path = normalizePathname(pathname);
  const exact = manifestRoutes[path];
  if (exact) {
    return {
      title: exact.title,
      description: exact.description,
      ogImageId: exact.ogImageId,
    };
  }

  const section = SECTION_FALLBACK[path];
  if (section) return section;

  if (path.startsWith('/flashcards/')) return SECTION_FALLBACK['/flashcards'];

  const challengeTier = path.match(/^\/challenges\/(easy|medium|hard|very-hard)$/);
  if (challengeTier) {
    const tier = manifestRoutes[`/challenges/${challengeTier[1]}`];
    if (tier) {
      return { title: tier.title, description: tier.description, ogImageId: tier.ogImageId };
    }
  }

  if (path.startsWith('/challenges/')) return SECTION_FALLBACK['/challenges'];
  if (path.startsWith('/python-patterns/')) return SECTION_FALLBACK['/python-patterns'];
  if (path.startsWith('/system-design/')) return SECTION_FALLBACK['/system-design'];
  if (path.startsWith('/get-started')) return SECTION_FALLBACK['/get-started'];
  if (path.startsWith('/python-basics')) return SECTION_FALLBACK['/python-basics'];

  return DEFAULT_META;
}
