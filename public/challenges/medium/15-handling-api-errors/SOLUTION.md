# Solution: Handling API Errors

## Approach

Throw structured errors; component branches on error.kind.

## Key concepts

- **Error taxonomy**: Users need different copy for not-found vs server vs offline.

## Code highlights

- `fetch(\`/api/users/${id}\`)` — **fetch** — Loads remote data. Errors carry status; UI chooses message and whether retry makes sense.
- `onClick={execute}` — **onClick** — Runs when the user clicks this button. Errors carry status; UI chooses message and whether retry makes sense.

## Solution code

```tsx
async function fetchUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  if (res.status === 404) throw Object.assign(new Error('Not found'), { status: 404 });
  if (!res.ok) throw Object.assign(new Error('Server error'), { status: res.status });
  return res.json();
}

export function UserProfile({ id }: { id: string }) {
  const { status, data, error, execute } = useAsync(() => fetchUser(id), [id]);

  if (status === 'error') {
    const e = error as Error & { status?: number };
    if (e.status === 404) return <p>User not found.</p>;
    return (
      <div>
        <p>Server error. Try again.</p>
        <button onClick={execute}>Retry</button>
      </div>
    );
  }
  if (status === 'pending') return <p>Loading…</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

## Walkthrough

Errors carry status; UI chooses message and whether retry makes sense.

## Common mistakes

- Generic "Error" for everything
- Infinite retry loops

## Stretch goals

- Toast notifications
- Error boundary for unexpected
