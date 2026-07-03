# Solution: Cache Management

## Approach

Module-level Map + timestamp; hook reads/writes cache.

## Key concepts

- **Stale-while-revalidate**: Show cached data while refreshing in background (stretch).

## Code highlights

- `useEffect(() => {
    const hit = cache.get(key);
    if (hit && Date.now() - hit.ts < TTL) {
      setData(hit.data as T);
      return;
    }
    fetcher().then((d) => {
      cache.set(key, { data:` — **useEffect** — Runs after render to Cache hit short-circuits network; invalidate deletes entry forcing refetch..
- `const [data, setData] = useState<T | null>(null)` — **data state** — `data` is the value the UI shows. It starts at null. `setData` updates it when the user interacts. Cache hit short-circuits network; invalidate deletes entry forcing refetch.

## Solution code

```tsx
const cache = new Map<string, { data: unknown; ts: number }>();
const TTL = 60_000;

export function invalidate(key: string) {
  cache.delete(key);
}

export function useCachedFetch<T>(key: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const hit = cache.get(key);
    if (hit && Date.now() - hit.ts < TTL) {
      setData(hit.data as T);
      return;
    }
    fetcher().then((d) => {
      cache.set(key, { data: d, ts: Date.now() });
      setData(d);
    });
  }, [key]);

  return data;
}
```

## Walkthrough

Cache hit short-circuits network; invalidate deletes entry forcing refetch.

## Common mistakes

- Caching errors forever
- No TTL

## Stretch goals

- LRU eviction
- React Query
