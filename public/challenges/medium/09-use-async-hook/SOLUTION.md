# Solution: useAsync Hook

## Approach

Request id or AbortController discards outdated results.

## Key concepts

- **Stale closure**: Async responses may arrive after newer request—guard with id.

## Code highlights

- `const [error, setError] = useState<Error | null>(null)` — **error state** — `error` is the value the UI shows. It starts at null. `setError` updates it when the user interacts. Each execute bumps id; only matching id may commit results.
- `const [status, setStatus] = useState<Status>('idle')` — **status state** — `status` is the value the UI shows. It starts at 'idle'. `setStatus` updates it when the user interacts. Each execute bumps id; only matching id may commit results.
- `const [data, setData] = useState<T | null>(null)` — **data state** — `data` is the value the UI shows. It starts at null. `setData` updates it when the user interacts. Each execute bumps id; only matching id may commit results.
- `const idRef = useRef(0)` — **ref idRef** — `idRef` keeps a mutable value across renders without triggering re-renders when .current changes. Each execute bumps id; only matching id may commit results.

## Solution code

```tsx
import { useCallback, useEffect, useRef, useState } from 'react';

type Status = 'idle' | 'pending' | 'success' | 'error';

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [status, setStatus] = useState<Status>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const idRef = useRef(0);

  const execute = useCallback(async () => {
    const id = ++idRef.current;
    setStatus('pending');
    setError(null);
    try {
      const result = await fn();
      if (id === idRef.current) {
        setData(result);
        setStatus('success');
      }
    } catch (e) {
      if (id === idRef.current) {
        setError(e as Error);
        setStatus('error');
      }
    }
  }, deps);

  useEffect(() => { execute(); }, [execute]);

  const reset = () => {
    idRef.current++;
    setStatus('idle');
    setData(null);
    setError(null);
  };

  return { status, data, error, execute, reset };
}
```

## Walkthrough

Each execute bumps id; only matching id may commit results.

## Common mistakes

- No stale guard
- Missing error state

## Stretch goals

- AbortController
- React Query comparison
