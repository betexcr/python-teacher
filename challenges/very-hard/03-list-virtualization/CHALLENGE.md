# List Virtualization: Manual Virtual Scrolling

**Difficulty:** very-hard  
**Topics:** performance, DOM

## Learning goals

- Render only visible rows
- Maintain scroll height
- Handle variable heights optional

## Challenge

Virtual list of 100,000 items (fixed row height 40px). Compute visible start/end from scrollTop. Absolute-position rows inside tall spacer. No react-window—manual implementation.

## Requirements

1. Smooth scroll
2. O(visible) DOM nodes
3. Scroll to index API
4. Overscan 5 rows

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/very-hard/03-list-virtualization/`. Reference write-ups in this repo live under `challenges/very-hard/03-list-virtualization/` (not loaded by the app).

```tsx
const itemHeight = 40; const totalHeight = items.length * itemHeight;
```

## Hints

1. startIndex = floor(scrollTop / itemHeight)
2. transform translateY(startIndex * itemHeight)

## Acceptance criteria

- [ ] **Large list scrolls without lag**
  Render on the order of 100k items and scroll quickly; the UI should stay smooth with no multi-second freezes. Only visible rows should do heavy work each frame.

- [ ] **DOM node count stays small**
  Inspect the list container in devtools while scrolling and confirm only roughly viewport plus overscan rows exist, not one node per item in the full dataset. Virtualization trades a few DOM nodes for huge lists.

## Resources

- [Rendering large lists (react-window)](https://github.com/bvaughn/react-window)
- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [useMemo – Reference](https://react.dev/reference/react/useMemo)
