# Solution: List Virtualization: Manual Virtual Scrolling

## Approach

Scroll container with inner height spacer; translate visible slice.

## Key concepts

- **Windowing**: Only mount rows in viewport plus overscan buffer.
- **Overscan**: Extra rows above/below reduce blank flashes during fast scroll.

## Code highlights

- `const parentRef = useRef<HTMLDivElement>(null)` — **ref parentRef** — `parentRef` keeps a mutable value across renders without triggering re-renders when .current changes. Total height preserves scrollbar; translateY positions window; slice maps only visible indices.
- `const [scrollTop, setScrollTop] = useState(0)` — **scrollTop state** — `scrollTop` is the value the UI shows. It starts at 0. `setScrollTop` updates it when the user interacts. Total height preserves scrollbar; translateY positions window; slice maps only visible indices.
- `const [height, setHeight] = useState(600)` — **height state** — `height` is the value the UI shows. It starts at 600. `setHeight` updates it when the user interacts. Total height preserves scrollbar; translateY positions window; slice maps only visible indices.
- `key={i}` — **key** — Helps React track each list row — use a stable id (i), not the array index, when items can reorder.

## Solution code

```tsx
import { useMemo, useRef, useState } from 'react';

const ROW = 40;
const OVERSCAN = 5;

export function VirtualList({ count }: { count: number }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [height, setHeight] = useState(600);

  const { start, end, offset } = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / ROW) - OVERSCAN);
    const visible = Math.ceil(height / ROW) + OVERSCAN * 2;
    const endIndex = Math.min(count, startIndex + visible);
    return { start: startIndex, end: endIndex, offset: startIndex * ROW };
  }, [scrollTop, height, count]);

  const items = useMemo(() => {
    const slice = [];
    for (let i = start; i < end; i++) slice.push(i);
    return slice;
  }, [start, end]);

  return (
    <div
      ref={parentRef}
      style={{ height, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: count * ROW, position: 'relative' }}>
        <div style={{ transform: `translateY(${offset}px)` }}>
          {items.map((i) => (
            <div key={i} style={{ height: ROW, lineHeight: `${ROW}px` }}>
              Row {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Walkthrough

Total height preserves scrollbar; translateY positions window; slice maps only visible indices.

## Common mistakes

- Rendering all items with display:none
- Wrong total height breaking scroll

## Stretch goals

- Variable row heights
- react-window comparison
