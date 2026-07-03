export const dataFetchingExtras = {
  'useEffect fetch pitfalls': {
    detail:
      'If the user changes filters before the prior fetch finishes, the slower response can overwrite fresher data—AbortController or an ignore flag fixes that race.',
    code: `function UserPanel({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(\`/api/users/\${userId}\`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then(setUser)
      .catch((e) => {
        if (e.name !== 'AbortError') console.error(e);
      });
    return () => ctrl.abort();
  }, [userId]);

  return user ? <p>{user.name}</p> : <p>Loading…</p>;
}`,
  },
  'TanStack Query benefits': {
    detail:
      'Query dedupes in-flight requests, keeps a normalized cache, and refetches in the background so you avoid hand-rolling loading/error/refetch logic in every screen.',
    code: `const qc = new QueryClient();

function Todos({ userId }: { userId: string }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['todos', userId],
    queryFn: () => fetchTodos(userId),
    staleTime: 60_000,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <button onClick={() => refetch()}>Retry</button>;
  return <ul>{data.map((t) => <li key={t.id}>{t.title}</li>)}</ul>;
}`,
  },
  'staleTime vs gcTime': {
    detail:
      'staleTime is how long cached data is treated as fresh (no background refetch); gcTime is how long inactive cache entries stay in memory after the last subscriber unmounts.',
    code: `useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 30_000,
  gcTime: 5 * 60_000,
});`,
  },
  'SWR pattern': {
    detail:
      'Show the last good payload immediately while revalidating in the background—great for dashboards where stale data beats a blank screen.',
    code: `const { data, error, isValidating, mutate } = useSWR('/api/profile', fetcher, {
  revalidateOnFocus: true,
});

return (
  <>
    <Profile user={data} />
    {isValidating && <span aria-hidden>↻</span>}
    {error && <button onClick={() => mutate()}>Retry</button>}
  </>
);`,
  },
  'Server state vs client state': {
    detail:
      'Treat API data as server state (Query/SWR); keep UI toggles, wizard steps, and modal open flags in local state or a small client store—mixing them causes double sources of truth.',
    code: `const { data: cart } = useQuery({ queryKey: ['cart'], queryFn: fetchCart });
const [isCheckoutOpen, setCheckoutOpen] = useState(false);

return (
  <>
    <CartList items={cart} />
    <button onClick={() => setCheckoutOpen(true)}>Checkout</button>
  </>
);`,
  },
  'Optimistic updates': {
    detail:
      'Update the UI before the server confirms, then roll back if the mutation fails—pair onMutate snapshots with onError restore for list UIs.',
    code: `const qc = useQueryClient();

const mutation = useMutation({
  mutationFn: toggleTodo,
  onMutate: async (id) => {
    await qc.cancelQueries({ queryKey: ['todos'] });
    const prev = qc.getQueryData<Todo[]>(['todos']);
    qc.setQueryData(['todos'], (old = []) =>
      old.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
    return { prev };
  },
  onError: (_e, _id, ctx) => qc.setQueryData(['todos'], ctx?.prev),
  onSettled: () => qc.invalidateQueries({ queryKey: ['todos'] }),
});`,
  },
  'Pagination patterns': {
    detail:
      'Offset pagination is simple but drifts when rows are inserted; cursor pages are stable for feeds and pair naturally with useInfiniteQuery.',
    code: `const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ['feed'],
  queryFn: ({ pageParam }) => fetchFeed({ cursor: pageParam }),
  initialPageParam: null as string | null,
  getNextPageParam: (last) => last.nextCursor ?? undefined,
});

return (
  <>
    {data.pages.flatMap((p) => p.items).map((item) => <Card key={item.id} item={item} />)}
    {hasNextPage && (
      <button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
        Load more
      </button>
    )}
  </>
);`,
  },
  Prefetching: {
    detail:
      'Warm the cache on hover or in a route loader so navigation feels instant without blocking the current view on a full fetch.',
    code: `function ProductLink({ id, title }: { id: string; title: string }) {
  const qc = useQueryClient();

  return (
    <Link
      to={\`/products/\${id}\`}
      onMouseEnter={() =>
        qc.prefetchQuery({
          queryKey: ['product', id],
          queryFn: () => fetchProduct(id),
          staleTime: 60_000,
        })
      }
    >
      {title}
    </Link>
  );
}`,
  },
  'Error handling': {
    detail:
      'Surface query errors in UI (isError, error.message), retry transient failures, and reserve error boundaries for unexpected render throws—not for routine 404s.',
    code: `const { data, isError, error, refetch, isFetching } = useQuery({
  queryKey: ['invoice', id],
  queryFn: () => fetchInvoice(id),
  retry: 2,
});

if (isError) {
  return (
    <div role="alert">
      <p>{error.message}</p>
      <button onClick={() => refetch()} disabled={isFetching}>Try again</button>
    </div>
  );
}`,
  },
  Mutations: {
    detail:
      'After a successful mutation, invalidate or update related query keys so lists and detail views stay in sync without manual refetch wiring in every caller.',
    code: `const qc = useQueryClient();

const createPost = useMutation({
  mutationFn: (body: NewPost) => api.createPost(body),
  onSuccess: () => {
    qc.invalidateQueries({ queryKey: ['posts'] });
  },
});`,
  },
  'GraphQL with React': {
    detail:
      'Clients like Apollo normalize entities by __typename + id so list and detail views share one cache; colocate queries with components or use fragments for reusable fields.',
    code: `const { data, loading } = useQuery(gql\`
  query User($id: ID!) {
    user(id: $id) { id name posts { id title } }
  }
\`, { variables: { id } });

if (loading) return <Skeleton />;
return <h1>{data.user.name}</h1>;`,
  },
  WebSockets: {
    detail:
      'Subscribe in useEffect, push messages into Query cache or local state, and always unsubscribe on unmount to avoid duplicate handlers after Fast Refresh.',
    code: `useEffect(() => {
  const ws = new WebSocket(WS_URL);

  ws.onmessage = (evt) => {
    const msg = JSON.parse(evt.data);
    qc.setQueryData<ChatMessage[]>(['chat', roomId], (old = []) => [...old, msg]);
  };

  return () => ws.close();
}, [roomId, qc]);`,
  },
  'Suspense for data': {
    detail:
      'A Suspense boundary shows fallback while children suspend; React 19 use(promise) or library useSuspenseQuery keeps loading UI declarative instead of isLoading branches.',
    code: `function Comments({ promise }: { promise: Promise<Comment[]> }) {
  const comments = use(promise);
  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>{c.text}</li>
      ))}
    </ul>
  );
}

<Suspense fallback={<p>Loading comments…</p>}>
  <Comments promise={fetchComments()} />
</Suspense>`,
  },
  'RSC data fetching': {
    detail:
      'Fetch in an async Server Component on the server so the client never waterfalls through useEffect for initial data—pass serializable results into client children as props.',
    code: `export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.find(params.id);
  return <ProductDetails product={product} />;
}`,
  },
  'Request deduplication': {
    detail:
      'Two components mounting with the same query key should share one network request—TanStack Query and SWR merge in-flight calls automatically.',
    code: `function HeaderBadge() {
  const { data } = useQuery({ queryKey: ['unread'], queryFn: fetchUnread });
  return <span>{data?.count}</span>;
}

function Inbox() {
  const { data } = useQuery({ queryKey: ['unread'], queryFn: fetchUnread });
  return <List items={data?.items} />;
}`,
  },
};
