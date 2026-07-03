---
name: edit-challenge-content
description: Edit Python challenge source data and regenerate markdown. Use for new or updated challenges.
---

# Edit Python Challenge Content

1. Edit `scripts/challenges/{easy,medium,hard,very-hard}.mjs`
2. Update `acceptance.mjs` and `resources.mjs` if needed
3. Run `npm run generate`
4. Never hand-edit generated `challenges/**/CHALLENGE.md` long-term

Use `challenge()` factory from `helpers.mjs`. Solutions must be valid Python 3.12+ with type hints.
