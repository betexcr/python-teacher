# Memo Usage: Prevent Unnecessary Re-renders

**Difficulty:** medium  
**Topics:** React.memo, useCallback, useMemo

## Learning goals

- Identify avoidable child re-renders
- Stabilize props

## Challenge

Parent with fast-updating counter and expensive child list. Use React.memo + useCallback so list only rerenders when items change.

## Requirements

1. React.memo on child
2. Stable onItemClick with useCallback
3. Demonstrate with console.log render counts

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/19-memo-prevent-rerenders/`. Reference write-ups in this repo live under `challenges/medium/19-memo-prevent-rerenders/` (not loaded by the app).

```tsx
const List = React.memo(function List(...) {});
```

## Hints

1. Deps [items] for callback
2. Do not inline objects as props

## Acceptance criteria

- [ ] **Counter updates do not rerender list**
  Increment a parent counter while list items are memoized; list rows should not re-render if their props did not change (React DevTools highlight helps). memo skips render when props are shallow-equal.

- [ ] **Item change does rerender**
  Edit one list item and confirm only that row (or rows with changed props) re-renders. memo should not block updates when item data actually changes.

## Resources

- [memo – Reference](https://react.dev/reference/react/memo)
- [useCallback – Reference](https://react.dev/reference/react/useCallback)
- [useMemo – Reference](https://react.dev/reference/react/useMemo)
