export const nextExtras = {
  'App Router vs Pages': {
    detail:
      'App Router uses app/ with layouts and RSC by default; Pages router keeps getServerSideProps/getStaticProps patterns—new apps should start on App Router.',
    code: `// app/page.tsx — App Router entry
export default function Home() {
  return <main>Welcome</main>;
}`,
  },
  'layout.tsx': {
    detail:
      'Layouts wrap child segments and persist client state across navigations within the segment—Server Component layouts re-fetch unless cached.',
    code: `export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <Sidebar />
      {children}
    </div>
  );
}`,
  },
  'loading.tsx': {
    detail:
      'Instant fallback UI via Suspense for the route segment—shows while async server components or slow client children resolve.',
    code: `export default function Loading() {
  return <div className="skeleton" aria-busy="true" />;
}`,
  },
  'error.tsx': {
    detail:
      'Must be a client component—acts as an error boundary for the segment; reset() retries rendering after a failed server or client render.',
    code: `'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}`,
  },
  'Metadata API': {
    detail:
      'export const metadata or generateMetadata sets title/description/Open Graph without manual head management in client effects.',
    code: `export const metadata = {
  title: 'Products',
  description: 'Browse our catalog',
  openGraph: { title: 'Products' },
};`,
  },
  'Route handlers': {
    detail:
      'app/api/**/route.ts exports GET/POST handlers—use for webhooks and BFF endpoints; keep secrets server-side.',
    code: `export async function GET() {
  return Response.json({ ok: true });
}

export async function POST(req: Request) {
  const body = await req.json();
  return Response.json({ received: body });
}`,
  },
  Middleware: {
    detail:
      'middleware.ts runs before routes—auth redirects, geo headers, A/B flags; check current Next docs for Edge vs Node runtime support per version.',
    code: `export function middleware(req: NextRequest) {
  if (!req.cookies.get('session')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}`,
  },
  'Image component': {
    detail:
      'next/image serves responsive srcset, lazy loading, and blur placeholders—always set width/height or fill to prevent CLS.',
    code: `<Image src="/hero.png" alt="Team" width={1200} height={630} priority />`,
  },
  'Font optimization': {
    detail:
      'next/font self-hosts Google fonts at build time—eliminates layout shift from FOIT and extra DNS round trips.',
    code: `const inter = Inter({ subsets: ['latin'], display: 'swap' });

<body className={inter.className}>{children}</body>`,
  },
  'Dynamic routes': {
    detail:
      '[slug] dynamic segments pair with generateStaticParams for known paths at build and on-demand ISR for the long tail.',
    code: `export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}`,
  },
  'Client navigation': {
    detail:
      'Link prefetches visible routes in production—soft navigation avoids full document reload while updating URL and RSC payload.',
    code: `<Link href="/pricing" prefetch>
  Pricing
</Link>`,
  },
  'Vercel deployment': {
    detail:
      'Git push triggers preview URLs per PR; production env vars differ from preview—test auth callbacks on preview domains explicitly.',
    code: `// vercel.json or dashboard env: NEXT_PUBLIC_API_URL`,
  },
  ISR: {
    detail:
      'revalidate: N seconds regenerates stale pages in the background—users see cached HTML while fresh data builds.',
    code: `export const revalidate = 60;

export default async function Page() {
  const data = await fetchData();
  return <List items={data} />;
}`,
  },
  'Parallel routes': {
    detail:
      '@modal slots render alongside children—open login modal and keep dashboard mounted underneath with independent loading/error UI.',
    code: `// app/@modal/(.)login/page.tsx alongside app/dashboard/page.tsx`,
  },
  'Intercepting routes': {
    detail:
      '(..) segments show a modal over the current page while URL reflects /photos/123—closing modal restores prior context without losing scroll.',
    code: `// app/@modal/(..)photos/[id]/page.tsx intercepts app/photos/[id]`,
  },
};
