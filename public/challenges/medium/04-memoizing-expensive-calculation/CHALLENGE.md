# Memoizing Expensive Calculation

**Difficulty:** medium  
**Topics:** useMemo

## Learning goals

- Skip recomputation when deps unchanged
- Identify expensive pure functions

## Challenge

Given a slow `fibonacci(n)` and slider input n, display result. Without useMemo UI stutters; with useMemo it is smooth. Compare both modes.

## Requirements

1. useMemo around fib(n)
2. Deps [n]
3. Show elapsed ms optional

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/04-memoizing-expensive-calculation/`. Reference write-ups in this repo live under `challenges/medium/04-memoizing-expensive-calculation/` (not loaded by the app).

```tsx
function fib(n: number): number { /* iterative slow */ }
```

## Hints

1. useMemo(() => fib(n), [n])
2. Do not call fib directly in render without memo

## Acceptance criteria

- [ ] **Memoized path smooth**
  Run the expensive calculation with useMemo and confirm the UI stays responsive when inputs change slowly. You should not see long freezes on every keystroke if only relevant deps changed.

- [ ] **Changing unrelated state does not recompute**
  Update state that does not affect the calculation (for example a unrelated counter) and confirm the heavy work does not run again (log inside the calculation or watch devtools). useMemo should skip work when deps are unchanged.

## Resources

- [useMemo – Reference](https://react.dev/reference/react/useMemo)
- [Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
