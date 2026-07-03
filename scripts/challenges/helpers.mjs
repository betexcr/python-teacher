function titleFromUrl(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (host === 'docs.python.org') return 'Python Documentation';
    if (host === 'fastapi.tiangolo.com') return 'FastAPI';
    if (host === 'docs.pytest.org') return 'pytest';
    if (host === 'docs.pydantic.dev') return 'Pydantic';
    if (host === 'requests.readthedocs.io') return 'Requests';
    if (host === 'react.dev') return 'React Documentation';
    if (host === 'github.com') return 'GitHub';
    if (host === 'typescriptlang.org') return 'TypeScript Documentation';
    return host;
  } catch {
    return url;
  }
}

import { getAcceptanceCriteria } from './acceptance.mjs';
import { getChallengeResources } from './resources.mjs';

function normalizeAcceptance(acceptance, difficulty, slug) {
  const curated = getAcceptanceCriteria(difficulty, slug);
  const list = curated?.length ? curated : acceptance;
  return list.map((item) => {
    if (typeof item === 'object' && item !== null && 'summary' in item) {
      return {
        summary: String(item.summary),
        detail: String(item.detail ?? ''),
      };
    }
    const summary = String(item);
    return { summary, detail: `Check that: ${summary}` };
  });
}

export function normalizeResource(r) {
  if (typeof r === 'object' && r !== null && 'url' in r) {
    const url = String(r.url);
    const title = r.title ? String(r.title) : titleFromUrl(url);
    return { title, url };
  }

  const s = String(r).trim();
  const md = s.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (md) return { title: md[1], url: md[2] };

  if (/^https?:\/\//i.test(s)) {
    return { title: titleFromUrl(s), url: s };
  }

  return { title: s, url: s };
}

export function challenge({
  slug,
  title,
  difficulty,
  topics,
  goals,
  description,
  requirements,
  starter,
  hints,
  acceptance,
  resources = [],
  solutionApproach,
  concepts,
  solution,
  walkthrough,
  mistakes,
  stretch = [],
  starterFile = null,
}) {
  const normalizedResources = (resources.length
    ? resources
    : getChallengeResources(difficulty, slug, topics)
  ).map(normalizeResource);

  return {
    slug,
    title,
    difficulty,
    topics,
    goals,
    description,
    requirements,
    starter,
    hints,
    acceptance: normalizeAcceptance(acceptance, difficulty, slug),
    resources: normalizedResources,
    solutionApproach,
    concepts,
    solution,
    walkthrough,
    mistakes,
    stretch,
    starterFile,
  };
}
