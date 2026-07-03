---
name: solution-code-tooltips
description: >-
  Maintains per-challenge hover tooltips on solution code blocks via
  solution-highlights.mjs and the annotateSolutionCode UI pipeline. Use when
  fixing, adding, or tuning highlighted tokens in Show solution code.
---

# Solution code tooltips

## Pipeline

1. **Build highlights:** `scripts/challenges/solution-highlights.mjs` → `buildCodeHighlights(c)` from `concepts`, `walkthrough`, `solutionApproach`, and `c.solution` string.
2. **Inject into markdown:** `scripts/generate-challenges.mjs` adds hidden `## Code highlights` JSON block in each `SOLUTION.md`.
3. **Parse in app:** `src/lib/solutionHighlights.ts`
4. **Render:** `src/utils/annotateSolutionCode.tsx`, `SolutionCodeTerm.tsx`, `SolutionCodeLegend.tsx` via `MarkdownView` on challenge pages.

## Workflow

1. Change challenge `solution`, `concepts`, or `walkthrough` in `scripts/challenges/*.mjs`, **or** extend heuristics in `solution-highlights.mjs`.
2. `npm run generate`
3. Open challenge detail → expand solution → hover highlighted tokens.

## Tip copy rules

- Start tips directly (e.g. `` `n` is the value the UI shows... ``)—**no** `In "Challenge Title",` prefix.
- `match` must appear literally in the solution code string.
- Avoid duplicate `match` strings; `add()` dedupes via `seen`.
- Quote safety: in `.mjs`, do not put `'` inside single-quoted strings (use double quotes or escape).

## Debugging weak highlights

- If a token should highlight but does not, check `findInCode(code, match)`—snippet must match solution exactly.
- Add explicit `add('exactSnippet', 'Label', 'tip')` in `buildCodeHighlights` for important tokens the heuristics miss.

## Related

Challenge source edits: [edit-challenge-content](../edit-challenge-content/SKILL.md)
