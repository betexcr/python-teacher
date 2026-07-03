# Solution: Fetching Data

## Approach

Track status in state; effect triggers fetch; abort on unmount or refetch.

## Key concepts

- **useEffect**: Synchronize with external systems (network).
- **AbortController**: Cancel in-flight fetch when component unmounts.

## Code highlights

- `useEffect(() => {
    const ac = new AbortController();
    load(ac.signal);
    return () => ac.abort();
  }, [load])` — **useEffect** — Runs after render to load centralizes fetch logic.. The returned cleanup function runs on unmount or before the next run. Synchronize with external systems (network).
- `fetch('https://jsonplaceholder.typicode.com/users', { signal })` — **fetch** — Loads remote data. load centralizes fetch logic.
- `const [error, setError] = useState<string | null>(null)` — **error state** — `error` is the value the UI shows. It starts at null. `setError` updates it when the user interacts. load centralizes fetch logic. Effect creates AbortController per mount. Refetch calls load without aborting unless you add that.
- `const [users, setUsers] = useState<User[]>([])` — **users state** — `users` is the value the UI shows. It starts at []. `setUsers` updates it when the user interacts. load centralizes fetch logic. Effect creates AbortController per mount. Refetch calls load without aborting unless you add that.
- `const [loading, setLoading] = useState(true)` — **loading state** — `loading` is the value the UI shows. It starts at true. `setLoading` updates it when the user interacts. load centralizes fetch logic. Effect creates AbortController per mount. Refetch calls load without aborting unless you add that.
- `onClick={() => load()}` — **onClick** — Runs when the user clicks this button. load centralizes fetch logic. Effect creates AbortController per mount. Refetch calls load without aborting unless you add that.
- `AbortController` — **AbortController** — Cancels the request if the user leaves or a new fetch replaces the old one — avoids updating state after unmount. Cancel in-flight fetch when component unmounts.
- `if (loading)` — **early return** — Short-circuits the render to show loading or error UI before the main content. load centralizes fetch logic.
- `role="alert"` — **role="alert"** — Marks an error message so screen readers treat it as urgent.
- `if (error)` — **early return** — Short-circuits the render to show loading or error UI before the main content. load centralizes fetch logic.
- `key={u.id}` — **key** — Helps React track each list row — use a stable id (u.id), not the array index, when items can reorder.
- `.finally(` — **finally** — Runs after success or failure — here it typically turns off the loading flag.

## Solution code

```tsx
import { useEffect, useState, useCallback } from 'react';

type User = { id: number; name: string; email: string };

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback((signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    fetch('https://jsonplaceholder.typicode.com/users', { signal })
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then(setUsers)
      .catch((e) => {
        if (e.name !== 'AbortError') setError(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    load(ac.signal);
    return () => ac.abort();
  }, [load]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <div>
      <button onClick={() => load()}>Refetch</button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Walkthrough

load centralizes fetch logic. Effect creates AbortController per mount. Refetch calls load without aborting unless you add that.

## Common mistakes

- Missing dependency warnings ignored blindly
- No loading state (flash of empty)

## Stretch goals

- React Query / SWR
- Pagination
