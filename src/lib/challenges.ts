import index from '../data/challenges-index.json'

export type Difficulty = 'easy' | 'medium' | 'hard' | 'very-hard'

export type ChallengeResource = {
  title: string
  url: string
}

export type AcceptanceCriterion = {
  summary: string
  detail: string
}

export type ChallengeMeta = {
  slug: string
  title: string
  acceptance: AcceptanceCriterion[]
  resources: ChallengeResource[]
}

const DIFFICULTY_IDS = new Set<Difficulty>(['easy', 'medium', 'hard', 'very-hard'])

export function isDifficulty(value: string): value is Difficulty {
  return DIFFICULTY_IDS.has(value as Difficulty)
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  'very-hard': 'Very Hard',
}

const challengeIndex = index as Record<Difficulty, ChallengeMeta[]>

const challengeModules = import.meta.glob('../../challenges/**/CHALLENGE.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const solutionModules = import.meta.glob('../../challenges/**/SOLUTION.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function pathKey(difficulty: Difficulty, slug: string, file: 'CHALLENGE' | 'SOLUTION') {
  return `../../challenges/${difficulty}/${slug}/${file}.md`
}

export function getChallengeMarkdown(difficulty: Difficulty, slug: string) {
  return challengeModules[pathKey(difficulty, slug, 'CHALLENGE')] ?? ''
}

export function getSolutionMarkdown(difficulty: Difficulty, slug: string) {
  return solutionModules[pathKey(difficulty, slug, 'SOLUTION')] ?? ''
}

export function findChallenge(difficulty: Difficulty, slug: string) {
  return challengeIndex[difficulty]?.find((c) => c.slug === slug)
}
