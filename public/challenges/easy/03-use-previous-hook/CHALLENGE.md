# usePrevious Hook

**Difficulty:** easy  
**Topics:** useRef, useEffect, custom hooks

## Learning goals

- Store values across renders without triggering re-renders
- Build a reusable custom hook

## Challenge

Implement `usePrevious(value)` that returns the value from the **previous** render (undefined on first render). Use it to show "was X, now Y" for a changing prop or state.

## Requirements

1. Hook signature: function usePrevious<T>(value: T): T | undefined
2. Return undefined on first render
3. After updates, return the prior value

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/03-use-previous-hook/`. Reference write-ups in this repo live under `challenges/easy/03-use-previous-hook/` (not loaded by the app).

```tsx
export function usePrevious<T>(value: T): T | undefined {
  // useRef + useEffect
}
```

## Hints

1. useRef can hold mutable .current without causing re-renders
2. Update ref.current in useEffect after paint so render still sees old value

## Acceptance criteria

- [ ] **First render shows no previous value**
  On the very first paint, usePrevious has nothing stored yet, so it should return undefined. If your UI has a "before" line, it should show empty, a dash, or "none" — not a number. That is expected, not a bug.

- [ ] **Later renders show the last value**
  Change the count (or whatever value you track), then confirm the "before" line shows the value from the previous render, one step behind the current count. After each change, "before" should lag by exactly one update.

## Resources

- [Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
- [useRef – Reference](https://react.dev/reference/react/useRef)
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
