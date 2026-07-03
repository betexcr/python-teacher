# Solution: MouseTracker

## Approach

Attach listener to container; compute local x/y from client coords - rect.

## Key concepts

- **Effect cleanup**: removeEventListener in return prevents leaks.
- **Coordinate spaces**: clientX/Y vs offsetX/Y differ when nested.

## Code highlights

- `useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;` — **useEffect** — Runs after render to Global mousemove plus rect math determines inside and local coords.. The returned cleanup function runs on unmount or before the next run.
- `const [local, setLocal] = useState({ x: 0, y: 0 })` — **local state** — `local` is the value the UI shows. It starts at { x: 0, y: 0 }. `setLocal` updates it when the user interacts. Global mousemove plus rect math determines inside and local coords.
- `const [inside, setInside] = useState(false)` — **inside state** — `inside` is the value the UI shows. It starts at false. `setInside` updates it when the user interacts. Global mousemove plus rect math determines inside and local coords.
- `const boxRef = useRef<HTMLDivElement>(null)` — **ref boxRef** — `boxRef` keeps a mutable value across renders without triggering re-renders when .current changes. Global mousemove plus rect math determines inside and local coords.

## Solution code

```tsx
import { useEffect, useRef, useState } from 'react';

export function MouseTracker() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [local, setLocal] = useState({ x: 0, y: 0 });
  const [inside, setInside] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inBox = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      setInside(inBox);
      setLocal({ x: Math.round(x), y: Math.round(y) });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={boxRef} className="tracker-box" style={{ position: 'relative' }}>
      <p>{inside ? 'Inside' : 'Outside'} — {local.x}, {local.y}</p>
      {inside && (
        <span
          className="dot"
          style={{ position: 'absolute', left: local.x, top: local.y }}
        />
      )}
    </div>
  );
}
```

## Walkthrough

Global mousemove plus rect math determines inside and local coords.

## Common mistakes

- No cleanup
- Using state for dot without checking inside

## Stretch goals

- requestAnimationFrame throttle
- Touch support
