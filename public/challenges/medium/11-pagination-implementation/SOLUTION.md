# Solution: Pagination Implementation

## Approach

Page state drives fetch URL; derive totalPages from total count.

## Key concepts

- **Server pagination**: Only load current slice—essential for large data.

## Code highlights

- `useEffect(() => {
    fetch(\`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}\`)
      .then((r) => {
        setTotal(Number(r.headers.get('X-Total-Count') || 100));
        re` — **useEffect** — Runs after render to Effect refetches when page changes; buttons disabled at edges..
- `fetch(\`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}\`)` — **fetch** — Loads remote data. Effect refetches when page changes; buttons disabled at edges.
- `.map((p: { id: number; title: string }) => <li key={p.id}>{p.title}</li>)` — **.map()** — Turns each item in your data into a JSX row. Effect refetches when page changes; buttons disabled at edges. JSONPlaceholder may omit X-Total-Count—use a sensible fallback total for the demo.
- `const [posts, setPosts] = useState([])` — **posts state** — `posts` is the value the UI shows. It starts at []. `setPosts` updates it when the user interacts. Effect refetches when page changes; buttons disabled at edges. JSONPlaceholder may omit X-Total-Count—use a sensible fallback total for the demo.
- `const [total, setTotal] = useState(0)` — **total state** — `total` is the value the UI shows. It starts at 0. `setTotal` updates it when the user interacts. JSONPlaceholder may omit X-Total-Count—use a sensible fallback total for the demo.
- `onClick={() => setPage((p) => p - 1)}` — **decrement click** — Subtracts 1 using the latest state. Effect refetches when page changes; buttons disabled at edges.
- `onClick={() => setPage((p) => p + 1)}` — **increment click** — Adds 1 using the latest state. Effect refetches when page changes; buttons disabled at edges.
- `const [page, setPage] = useState(1)` — **page state** — `page` is the value the UI shows. It starts at 1. `setPage` updates it when the user interacts. Effect refetches when page changes; buttons disabled at edges.
- `disabled={page >= pages}` — **disabled** — Disabled when page >= pages — UI follows state instead of manual DOM tweaks. Effect refetches when page changes; buttons disabled at edges.
- `disabled={page === 1}` — **disabled** — Disabled when page === 1 — UI follows state instead of manual DOM tweaks. Effect refetches when page changes; buttons disabled at edges.
- `key={p.id}` — **key** — Helps React track each list row — use a stable id (p.id), not the array index, when items can reorder.

## Solution code

```tsx
import { useEffect, useState } from 'react';

export function PaginatedPosts() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
      .then((r) => {
        setTotal(Number(r.headers.get('X-Total-Count') || 100));
        return r.json();
      })
      .then(setPosts);
  }, [page]);

  const pages = Math.ceil(total / limit);

  return (
    <div>
      <ul>{posts.map((p: { id: number; title: string }) => <li key={p.id}>{p.title}</li>)}</ul>
      <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
      <span>{page} / {pages}</span>
      <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
}
```

## Walkthrough

Effect refetches when page changes; buttons disabled at edges. JSONPlaceholder may omit X-Total-Count—use a sensible fallback total for the demo.

## Common mistakes

- Client slicing huge dataset
- Off-by-one on total pages
- Assuming every API sends X-Total-Count

## Stretch goals

- Page size selector
- Cursor-based pagination
