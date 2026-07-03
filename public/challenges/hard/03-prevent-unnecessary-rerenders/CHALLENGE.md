# Prevent Unnecessary Re-renders

**Difficulty:** hard  
**Topics:** memo, context, profiling

## Learning goals

- Optimize a intentionally slow tree
- Measure before/after

## Challenge

Parent updates unrelated state every 100ms. Optimize children with memo, useMemo, useCallback, and split contexts so only relevant subtrees rerender.

## Requirements

1. Demonstrate >50% render reduction
2. Document which optimization applied where
3. Use React DevTools Profiler notes in comments

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/hard/03-prevent-unnecessary-rerenders/`. Reference write-ups in this repo live under `challenges/hard/03-prevent-unnecessary-rerenders/` (not loaded by the app).

```tsx
// SlowChild renders 500 divs
```

## Hints

1. Split ThemeContext: value vs dispatch
2. memo list items with stable keys

## Acceptance criteria

- [ ] **Profiler shows fewer child commits**
  Use React Profiler before and after memoization or context splits and confirm expensive children render less often when unrelated parent state changes. Fewer commits means less wasted work.

- [ ] **Functionality unchanged**
  Walk through all user flows and confirm behavior matches the unoptimized version. Performance fixes must not break features users rely on.

## Resources

- [memo – Reference](https://react.dev/reference/react/memo)
- [useContext – Reference](https://react.dev/reference/react/useContext)
- [Profiler – Reference](https://react.dev/reference/react/Profiler)
