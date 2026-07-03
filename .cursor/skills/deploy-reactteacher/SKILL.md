---
name: deploy-reactteacher
description: >-
  Commits, pushes, and deploys ReactTeacher to Vercel production. Use when the
  user asks to push, deploy, ship, or publish changes to reactteacher.vercel.app.
---

# Deploy ReactTeacher

## Preconditions

- Changes committed only when the user explicitly requests push/deploy.
- `npm run build` succeeds locally if you changed generators or TypeScript.

## Git (when user asks to ship)

Run in parallel first:

```powershell
git status
git diff
git log -3 --oneline
```

Then:

1. Stage relevant files (not `.env`, not `.vercel` secrets).
2. Commit with a short message focused on **why** (1–2 sentences).
3. `git push origin main` (or current branch).

**Do not** amend, force-push `main`, or skip hooks unless the user explicitly asks.

## Vercel production

From repo root:

```powershell
npx vercel deploy --prod --yes
```

- Production alias: https://reactteacher.vercel.app
- Build runs `npm run generate` then `tsc` + `vite build` on Vercel.
- Inspector URL is printed in CLI output.

## Windows

Chain commands with `;`, not `&&`.

## After deploy

Tell the user the production URL and commit hash if applicable. Mention the Vercel inspect link from CLI when useful.
