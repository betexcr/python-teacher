# Solution: Build a Clock

## Approach

Store Date in state; interval sets new Date(); format derived with options.

## Key concepts

- **Timer in useEffect**: Always return cleanup clearing interval.
- **Derived formatting**: Format from `now` during render, not separate string state.

## Code highlights

- `useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [])` — **useEffect** — Runs after render to Single source of truth `now`. Intl handles padding and AM/PM.. The returned cleanup function runs on unmount or before the next run.
- `const [use24h, setUse24h] = useState(true)` — **use24h state** — `use24h` is the value the UI shows. It starts at true. `setUse24h` updates it when the user interacts. Single source of truth `now`. Intl handles padding and AM/PM.
- `onClick={() => setUse24h((v) => !v)}` — **click handler** — Updates state (). Single source of truth `now`. Intl handles padding and AM/PM.
- `const [now, setNow] = useState(()` — **now state** — `now` is the value the UI shows. It starts at (. `setNow` updates it when the user interacts. Single source of truth `now`.

## Solution code

```tsx
import { useEffect, useState } from 'react';

export function Clock() {
  const [now, setNow] = useState(() => new Date());
  const [use24h, setUse24h] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !use24h,
  }).format(now);

  return (
    <div>
      <time dateTime={now.toISOString()}>{time}</time>
      <button onClick={() => setUse24h((v) => !v)}>{use24h ? '24h' : '12h'}</button>
    </div>
  );
}
```

## Walkthrough

Single source of truth `now`. Intl handles padding and AM/PM.

## Common mistakes

- Storing formatted string in state (drift)
- Not clearing interval

## Stretch goals

- Analog SVG hands
- Timezone selector
