# Solution: Advanced Custom Hooks

## Approach

Layered hooks; effects subscribe to external systems; lazy init for storage.

## Key concepts

- **Hook composition**: Small hooks combine into higher-level behavior.
- **Hydration safety**: Defer browser-only reads to useEffect.

## Code highlights

- `useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const fn = () => setMatches(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEve` — **useEffect** — Runs after render to Media query hook listens to changes; storage hook persists setting; composed hook resolves effective theme.. The returned cleanup function runs on unmount or before the next run.
- `const [matches, setMatches] = useState(false)` — **matches state** — `matches` is the value the UI shows. It starts at false. `setMatches` updates it when the user interacts. Media query hook listens to changes; storage hook persists setting; composed hook resolves effective theme.
- `const [value, setValue] = useState<T>(()` — **value state** — `value` is the value the UI shows. It starts at (. `setValue` updates it when the user interacts. Media query hook listens to changes; storage hook persists setting; composed hook resolves effective theme.

## Solution code

```tsx
import { useCallback, useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const fn = () => setMatches(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [query]);

  return matches;
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

type ThemeSetting = 'system' | 'light' | 'dark';

export function usePrefersDarkMode() {
  const [setting, setSetting] = useLocalStorage<ThemeSetting>('theme-setting', 'system');
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)');
  const resolved = setting === 'system' ? (systemDark ? 'dark' : 'light') : setting;

  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
  }, [resolved]);

  const set = useCallback((s: ThemeSetting) => setSetting(s), [setSetting]);

  return { setting, resolved, set };
}
```

## Walkthrough

Media query hook listens to changes; storage hook persists setting; composed hook resolves effective theme.

## Common mistakes

- Reading localStorage during SSR render
- Not removing matchMedia listeners

## Stretch goals

- useEventCallback
- Subscription hook with useSyncExternalStore
