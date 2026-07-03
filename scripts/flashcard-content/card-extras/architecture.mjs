export const architectureExtras = {
  'Container vs presentational': {
    detail:
      'Containers fetch and map data; presentational components are pure functions of props—easier to test UI in Storybook without mocking the network layer.',
    code: `function UserPageContainer() {
  const { data } = useQuery({ queryKey: ['user'], queryFn: fetchUser });
  return <UserProfileView user={data} loading={!data} />;
}

function UserProfileView({ user, loading }: { user?: User; loading: boolean }) {
  if (loading) return <Skeleton />;
  return <h1>{user!.name}</h1>;
}`,
  },
  'Feature folders': {
    detail:
      'Colocate components, hooks, API helpers, and tests under features/billing instead of scattering by file type—onboarding follows product boundaries.',
    code: `// features/checkout/
//   CheckoutPage.tsx
//   useCheckout.ts
//   checkout.api.ts
//   CheckoutPage.test.tsx`,
  },
  'State colocation': {
    detail:
      'Keep state as close as possible to where it is used; lift only when siblings must stay in sync—premature global state complicates refactors.',
    code: `function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <button onClick={() => setOpen((o) => !o)}>{title}</button>
      {open && children}
    </section>
  );
}`,
  },
  'URL as state': {
    detail:
      'Filters, tabs, and pagination in searchParams make views shareable and back-button friendly—treat the URL as serializable UI state, not just routing.',
    code: `const [params, setParams] = useSearchParams();
const tab = params.get('tab') ?? 'overview';

<button onClick={() => setParams({ tab: 'billing' })}>Billing</button>`,
  },
  'Global vs local state': {
    detail:
      'Default to local state; use context or Zustand for cross-route UI; TanStack Query owns server data—avoid duplicating API results in Redux unnecessarily.',
    code: `const { data: user } = useQuery({ queryKey: ['me'], queryFn: fetchMe });
const [sidebarOpen, setSidebarOpen] = useState(false);`,
  },
  'Error boundaries placement': {
    detail:
      'Wrap route segments or risky widgets—not every leaf—so one chart failure does not white-screen the entire app shell.',
    code: `<ErrorBoundary fallback={<BillingError />}>
  <BillingRoutes />
</ErrorBoundary>`,
  },
  'Composition root': {
    detail:
      'Wire router, QueryClient, theme, and i18n once at the app root so feature code assumes providers exist without re-wrapping each page.',
    code: `export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={qc}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}`,
  },
  'Barrel files tradeoff': {
    detail:
      'index.ts re-exports simplify imports but can pull unused modules into bundles if the bundler cannot tree-shake side-effectful barrels—prefer direct imports for heavy libs.',
    code: `// Prefer for hot paths:
import { Button } from '@/components/Button';

// Barrel okay for stable public API:
// export { Button } from './Button';`,
  },
  'API layer separation': {
    detail:
      'Centralize fetch URLs, headers, and error mapping in services/api.ts; hooks call those functions so UI components never embed raw fetch strings.',
    code: `// services/todos.ts
export async function fetchTodos(userId: string) {
  const res = await fetch(\`/api/users/\${userId}/todos\`);
  if (!res.ok) throw new Error('Failed to load todos');
  return res.json();
}`,
  },
  'Env configuration': {
    detail:
      'VITE_ and NEXT_PUBLIC_ vars are public in the client bundle—proxy secrets through server routes and keep API keys off the frontend entirely.',
    code: `const apiBase = import.meta.env.VITE_API_URL;`,
  },
  'Monorepo with React': {
    detail:
      'Shared UI package consumed by web and admin apps—Turborepo caches build outputs so a change in @repo/ui does not rebuild unrelated packages from scratch.',
    code: `// apps/web/package.json depends on "@repo/ui": "workspace:*"`,
  },
  'Micro-frontends': {
    detail:
      'Module federation shares react and react-dom as singletons—version skew across shells causes hook errors and duplicate React instances.',
    code: `// federation config: shared: { react: { singleton: true }, 'react-dom': { singleton: true } }`,
  },
  'DDD in frontend': {
    detail:
      'Model features as bounded contexts (billing, catalog) with explicit public APIs between folders—reduces import spaghetti across domains.',
    code: `// catalog/public.ts — only export what other features may import`,
  },
  'Testing pyramid': {
    detail:
      'Many fast unit tests on hooks and reducers, fewer integration tests on flows, selective Playwright for checkout—balance CI time vs confidence.',
    code: `// Many: useToggle.test.ts
// Some: Checkout.integration.test.tsx
// Few: checkout.spec.ts (Playwright)`,
  },
  Documentation: {
    detail:
      'Storybook documents visual states; ADRs capture why you chose App Router vs SPA—future teammates need decisions, not only API lists.',
    code: `// stories/Button.stories.tsx
export const Primary = { args: { variant: 'primary', label: 'Save' } };`,
  },
};
