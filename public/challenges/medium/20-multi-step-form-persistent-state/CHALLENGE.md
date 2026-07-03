# Multi-step Form with Persistent State

**Difficulty:** medium  
**Topics:** forms, state

## Learning goals

- Preserve answers across steps
- Validate per step

## Challenge

3-step wizard (account → profile → review). Back keeps data. Persist draft to sessionStorage.

## Requirements

1. Single form state object
2. Per-step validation gate
3. sessionStorage restore on mount

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/20-multi-step-form-persistent-state/`. Reference write-ups in this repo live under `challenges/medium/20-multi-step-form-persistent-state/` (not loaded by the app).

```tsx
type FormData = { email: string; name: string; plan: string };
```

## Hints

1. useEffect save JSON.stringify(form)
2. step++ only if validateStep(step) empty

## Acceptance criteria

- [ ] **Back preserves**
  Fill step 1, go to step 2, go back, and confirm step 1 fields still have your entries. Step state should live above individual step components.

- [ ] **Refresh restores draft**
  Fill part of the form, refresh the page, and confirm saved draft values return from localStorage (or your storage). Users should not lose long forms on accident.

## Resources

- [Managing State](https://react.dev/learn/managing-state)
- [Forms – React DOM](https://react.dev/reference/react-dom/components/form)
- [Lifting state up](https://react.dev/learn/sharing-state-between-components)
