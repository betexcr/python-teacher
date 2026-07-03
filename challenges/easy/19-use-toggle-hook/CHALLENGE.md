# useToggle Hook

**Difficulty:** easy  
**Topics:** custom hooks, useState, useCallback

## Learning goals

- Return stable API for boolean toggling
- Support imperative set/on/off

## Challenge

Implement `useToggle(initial)` returning `[value, { toggle, set, on, off }]`. Use it in a panel show/hide demo.

## Requirements

1. toggle flips boolean
2. on sets true, off sets false
3. set accepts boolean directly
4. Memoize handlers with useCallback

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/19-use-toggle-hook/`. Reference write-ups in this repo live under `challenges/easy/19-use-toggle-hook/` (not loaded by the app).

```tsx
export function useToggle(initial = false) {}
```

## Hints

1. useCallback depends on [] if using functional setState
2. Return tuple or object—document API

## Acceptance criteria

- [ ] **All methods work**
  Test toggle, setTrue, and setFalse (or the API your challenge defines) and confirm the boolean state matches each call. The hook should encapsulate all ways to change the flag.

- [ ] **Handlers stable across renders**
  Log or compare function identity between renders; toggle/set handlers from useToggle should stay the same reference when using useCallback inside the hook. Stable handlers help memoized children avoid extra renders.

## Resources

- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [useCallback – Reference](https://react.dev/reference/react/useCallback)
- [useState – Reference](https://react.dev/reference/react/useState)
