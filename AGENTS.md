# PythonTeacher — agent guide

Interview-prep SPA: **61 Python challenges**, **300 flashcards**, Python Basics, patterns, and system-design write-ups.

## Stack

- React 19, TypeScript, Vite 8, React Router 7
- Static SPA on Vercel (`vercel.json` SPA rewrite; `middleware.ts` for bot/OG meta)
- No backend; challenge solutions are reference code in markdown, not executed in-app

## Commands

| Command | Use |
|---------|-----|
| `npm run dev` | `generate` then Vite dev server (port 5173) |
| `npm run generate` | Challenges, flashcards, `public/challenges`, OG images, `og-manifest.ts` |
| `npm run build` | Full production build (runs `generate` first) |
| `npm run lint` | ESLint |

**Windows (PowerShell):** chain with `;`, not `&&`.

## Content pipelines (edit source, then generate)

### Challenges

| Role | Path |
|------|------|
| **Source of truth** | `scripts/challenges/{easy,medium,hard,very-hard}.mjs` |
| Acceptance copy | `scripts/challenges/acceptance.mjs` |
| Resource links | `scripts/challenges/resources.mjs` |
| Solution code tooltips | `scripts/challenges/solution-highlights.mjs` |
| Generator | `scripts/generate-challenges.mjs` |
| **Generated** | `challenges/**`, `public/challenges/**`, `src/data/challenges-index.json` |

### Flashcards

| Role | Path |
|------|------|
| Source | `scripts/flashcard-content/python-decks.mjs`, `scripts/generate-flashcards.mjs` |
| Generated | `src/data/flashcards/*.ts` |

### Python Basics (in-app, not generated)

- Topics: `src/data/pythonBasicsTopics.ts`
- Tutorial steps: `src/data/pythonBasicsTutorialSteps.ts`
- Glossary: `src/data/pythonTermGlossary.ts`

### Patterns & System Design

- `src/data/python-patterns/content/*.md`
- `src/data/system-design/content/*.md`

## Branding

- `src/config/brand.ts` — site name, URL, storage prefix (`pythonprep`)
- Theme: gold (`#ffd43b`) + Python blue (`#3776ab`) in `src/styles/app.css`

## Conventions

- **Python 3.12+** in challenge solutions with type hints
- **Minimal diffs**; match existing naming and file layout
- Regenerate instead of patching dozens of `CHALLENGE.md` files by hand
- Progress keys: `pythonprep-challenge:`, `pythonprep-deck:`, `pythonprep-read:`
