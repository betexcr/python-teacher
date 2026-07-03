export const serverComponentsExtras = {
  'Server Component': {
    detail:
      'Async server components fetch with secrets and DB drivers that never ship to the client—output streams as RSC payload; interactivity lives in child client islands.',
    code: `export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.find(params.id);
  return <ProductDetails product={product} />;
}`,
  },
  '"use client"': {
    detail:
      'The directive marks a module and its imports as client-bundled—use for useState, useEffect, and browser APIs; keep the boundary as leaf nodes as possible.',
    code: `'use client';

export function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}`,
  },
  'SSR vs SSG': {
    detail:
      'SSR builds HTML per request (personalized); SSG at build time is cheaper at scale—ISR blends static speed with timed revalidation.',
    code: `// SSG: generateStaticParams + fetch at build
// SSR: dynamic = 'force-dynamic' or no cache`,
  },
  Hydration: {
    detail:
      'Client React attaches listeners to server HTML—mismatched markup forces recovery work and warnings; use useId and consistent data sources across server/client.',
    code: `const id = useId();
return (
  <>
    <label htmlFor={id}>Name</label>
    <input id={id} defaultValue={initialName} />
  </>
);`,
  },
  'Streaming SSR': {
    detail:
      'Send the shell HTML immediately and stream Suspense fallbacks as slow queries finish—improves TTFB vs waiting for every query before bytes leave the server.',
    code: `export default function Page() {
  return (
    <main>
      <Header />
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments />
      </Suspense>
    </main>
  );
}`,
  },
  'serialize RSC payload': {
    detail:
      'The Flight protocol streams a compact component tree reference—not a JSON dump of your source—client reconciles against serialized server output.',
    code: `// Server renders <Row />, client receives flight refs + props
<Row userId={user.id} />`,
  },
  'When to use client components': {
    detail:
      'Need hooks, effects, subscriptions, or most npm UI kits? Client boundary. Pure data display and static markup stay on the server.',
    code: `// Server: async function List() { … }
// Client: 'use client' + useState for filters`,
  },
  'Passing data RSC → client': {
    detail:
      'Props crossing the boundary must be JSON-serializable—pass IDs and fetch on server; do not pass functions except Server Actions with proper marking.',
    code: `export default async function Page() {
  const user = await getUser();
  return <ProfileClient name={user.name} avatarUrl={user.avatarUrl} />;
}`,
  },
  'Server Actions': {
    detail:
      'Async functions with "use server" run on the server when invoked from forms or startTransition—validate auth inside every action, not only UI.',
    code: `async function addTodo(formData: FormData) {
  'use server';
  const title = String(formData.get('title'));
  await db.todo.create({ title });
}`,
  },
  'Caching in Next': {
    detail:
      'fetch cache options, segment config, and Next 15+ Cache Components ("use cache", cacheTag) control staleness—explicit opt-out when data must be realtime.',
    code: `const res = await fetch('https://api.example.com/posts', {
  next: { revalidate: 60 },
});`,
  },
  'SEO benefit': {
    detail:
      'Crawlers and link previews get meaningful HTML from SSR/SSG—CSR-only SPAs can be indexed but are slower and less reliable for content-heavy pages.',
    code: `export const metadata = {
  title: 'Pricing',
  description: 'Plans for teams of every size',
};`,
  },
  'Environment secrets': {
    detail:
      'Only server modules read DATABASE_URL without NEXT_PUBLIC_—client bundles must never import files that reference private env vars.',
    code: `// server-only.ts
const dbUrl = process.env.DATABASE_URL;`,
  },
  'Client-only libraries': {
    detail:
      'Charts and maps that touch window need dynamic(..., { ssr: false }) or a client-only import so SSR does not reference document.',
    code: `const Map = dynamic(() => import('./Map'), { ssr: false });

export function StoreLocator() {
  return <Map stores={stores} />;
}`,
  },
  'Partial Prerendering': {
    detail:
      'Static shell prerendered with dynamic Suspense holes streamed at request time—evolving toward Cache Components in newer Next releases.',
    code: `<Suspense fallback={<DynamicSkeleton />}>
  <RealtimeWidget />
</Suspense>`,
  },
  Waterfalls: {
    detail:
      'Sequential await in nested client useEffects multiplies latency—parallelize fetches in one RSC parent or Promise.all on the server.',
    code: `export default async function Page() {
  const [user, posts] = await Promise.all([getUser(), getPosts()]);
  return <Dashboard user={user} posts={posts} />;
}`,
  },
};
