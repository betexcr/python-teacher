export const routingExtras = {
  'React Router 7 basics': {
    detail:
      'Data routers (createBrowserRouter) support loaders and actions; declarative BrowserRouter + Routes still works for smaller apps—pick one style per app.',
    code: `const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
]);

export function App() {
  return <RouterProvider router={router} />;
}`,
  },
  'Nested routes': {
    detail:
      'Parent routes render a layout with <Outlet />; child paths append without re-mounting the shell—ideal for dashboards with persistent side nav.',
    code: `<Route path="dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route path="settings" element={<Settings />} />
</Route>`,
  },
  'Dynamic params': {
    detail:
      'useParams() reads :id segments—validate and parse IDs before fetching; invalid slugs should hit a 404 or error route, not throw in render.',
    code: `<Route path="users/:userId" element={<UserProfile />} />;

function UserProfile() {
  const { userId } = useParams();
  const { data } = useQuery({ queryKey: ['user', userId], queryFn: () => fetchUser(userId!) });
  return <h1>{data?.name}</h1>;
}`,
  },
  'Search params': {
    detail:
      'useSearchParams syncs filters and page numbers to the URL—users can bookmark ?page=2&sort=price without custom history hacks.',
    code: `const [params, setParams] = useSearchParams();
const page = Number(params.get('page') ?? '1');

function goNext() {
  setParams((p) => { p.set('page', String(page + 1)); return p; });
}`,
  },
  'Programmatic navigation': {
    detail:
      'navigate(path) after mutations; navigate(-1) for back—pass { replace: true } when redirecting after login to avoid stacking history entries.',
    code: `const navigate = useNavigate();

async function onSave() {
  await api.save();
  navigate('/success', { replace: true });
}`,
  },
  'Protected routes': {
    detail:
      'Gate layouts with auth checks and redirect to login while preserving location.state.from for post-login return navigation.',
    code: `function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}`,
  },
  'Lazy routes': {
    detail:
      'lazy(() => import()) per route shrinks the initial bundle—always wrap route elements in Suspense with a meaningful fallback.',
    code: `const Admin = lazy(() => import('./Admin'));

<Route
  path="admin"
  element={
    <Suspense fallback={<Spinner />}>
      <Admin />
    </Suspense>
  }
/>`,
  },
  '404 handling': {
    detail:
      'A catch-all path="*" route at the end of the tree renders NotFound—nested apps may use a splat under a parent prefix instead of global *.',
    code: `<Routes>
  <Route path="/" element={<Home />} />
  <Route path="*" element={<NotFound />} />
</Routes>`,
  },
  'Data routers': {
    detail:
      'Loader functions fetch before render; actions handle form posts—errors can throw to errorElement boundaries per route.',
    code: `{
  path: 'projects/:id',
  loader: ({ params }) => fetchProject(params.id),
  element: <Project />,
  errorElement: <ProjectError />,
}`,
  },
  'Relative links': {
    detail:
      'Link to="settings" resolves relative to the current route URL—portable when nesting under /dashboard without hardcoding full paths.',
    code: `// at /dashboard
<Link to="settings">Settings</Link>
// → /dashboard/settings`,
  },
  'Index routes': {
    detail:
      'An index route renders at the parent path exactly—different from path="" child in some mental models; use for default tab content.',
    code: `<Route path="account" element={<AccountLayout />}>
  <Route index element={<Profile />} />
  <Route path="security" element={<Security />} />
</Route>`,
  },
  'Scroll restoration': {
    detail:
      'SPAs do not reset scroll on navigation by default—scrollTo(0,0) on pathname change or use framework ScrollRestoration for Next.',
    code: `const { pathname } = useLocation();

useEffect(() => {
  window.scrollTo(0, 0);
}, [pathname]);`,
  },
  'Next.js App Router': {
    detail:
      'File-system routes under app/ with layout.tsx and page.tsx; Server Components by default—add "use client" only where interactivity is required.',
    code: `// app/dashboard/page.tsx
export default async function DashboardPage() {
  const stats = await getStats();
  return <StatsGrid stats={stats} />;
}`,
  },
  'Deep linking': {
    detail:
      'Mirror modal open state and selected tab in the URL so shared links reopen the same UI—especially for photo lightboxes and wizard steps.',
    code: `const [params, setParams] = useSearchParams();
const photoId = params.get('photo');

{photoId && <Lightbox id={photoId} onClose={() => setParams({})} />}`,
  },
  'Route-based code splitting': {
    detail:
      'Each route chunk loads on first visit—initial entry only includes the home route graph; monitor chunk count vs cache headers in production.',
    code: `const routes = [
  { path: '/', lazy: () => import('./Home') },
  { path: '/reports', lazy: () => import('./Reports') },
];`,
  },
};
