# Advanced Custom Hooks

**Difficulty:** very-hard  
**Topics:** custom hooks, composition

## Learning goals

- Compose smaller hooks into advanced API
- Handle edge cases and SSR

## Challenge

Build `useMediaQuery`, `useLocalStorage`, and compose them into `usePrefersDarkMode` that syncs theme to localStorage and system preference with zero flash.

## Requirements

1. useMediaQuery(list) with matchMedia + listener
2. useLocalStorage key with JSON parse/stringify
3. Composed hook: system | light | dark with persistence

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/very-hard/02-advanced-custom-hooks/`. Reference write-ups in this repo live under `challenges/very-hard/02-advanced-custom-hooks/` (not loaded by the app).

```tsx
export function useMediaQuery(query: string) {}
```

## Hints

1. SSR: default false until useEffect
2. storage event for cross-tab

## Acceptance criteria

- [ ] **Hooks reusable**
  Use each custom hook in at least two components and confirm behavior is identical without copying effect logic. Hooks should accept clear parameters and return a stable API.

- [ ] **No hydration mismatch**
  If a hook reads window or localStorage, confirm server HTML matches first client render (defer read to useEffect or gate rendering). Mismatches cause React hydration errors in SSR apps.

- [ ] **System changes propagate**
  Change OS theme, online status, or media query (per your hooks) and confirm all subscribers update. Listeners in effects should subscribe and clean up correctly.

## Resources

- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
