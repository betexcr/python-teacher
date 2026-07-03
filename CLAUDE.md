# Claude Code — ReactTeacher

Read **[AGENTS.md](AGENTS.md)** first for architecture, content pipelines, and conventions.

## Quick reference

- **Dev:** `npm run dev` → http://localhost:5173
- **Regenerate content:** `npm run generate` (required after `scripts/challenges/` or flashcard source changes)
- **Production deploy:** `npx vercel deploy --prod --yes`
- **Git remote:** `origin` → https://github.com/betexcr/react-teacher (`main`)

## Shell (Windows)

Use PowerShell-friendly chaining:

```powershell
cd C:\Users\albmu\react-prep; npm run generate; npm run build
```

Do not assume `&&` works.

## Content rules

1. Edit challenge **source** in `scripts/challenges/*.mjs`, then `npm run generate`.
2. Challenge **solutions** = function components only; error boundaries via `react-error-boundary` in samples.
3. Do not commit or push unless asked.
4. For challenge/solution/tooltip/deploy workflows, use project skills under `.cursor/skills/`.

## Skills

| Skill | Path |
|-------|------|
| Challenges | `.cursor/skills/edit-challenge-content/SKILL.md` |
| Solution tooltips | `.cursor/skills/solution-code-tooltips/SKILL.md` |
| Flashcards | `.cursor/skills/edit-flashcards/SKILL.md` |
| Deploy | `.cursor/skills/deploy-reactteacher/SKILL.md` |
