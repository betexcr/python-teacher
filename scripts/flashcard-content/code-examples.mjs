/** Curated + inferred code snippets for flashcard explanations. */

function isMostlyCode(text) {
  const t = text.trim();
  if (t.length === 0) return false;
  if (/^```/.test(t)) return true;
  if (
    /^(type |const |let |function |import |export |use[A-Z]|<[A-Za-z]|React\.|createContext|ComponentProps|\(\)|\/\/)/.test(
      t
    )
  ) {
    return true;
  }
  if (
    t.includes(';') &&
    !/\.\s+[A-Z]/.test(t) &&
    t.length < 220 &&
    /\b(use[A-Z]|function |const |let |import |export |=>|createContext|ComponentProps)\b/.test(t)
  ) {
    return true;
  }
  const symbols = (t.match(/[{}();=<>]/g) || []).length;
  return symbols / t.length > 0.1 && t.length < 160 && /\b(function|const|use[A-Z]|<[A-Z])/i.test(t);
}

/** Pull a trailing API snippet off prose+code backs. */
export function splitBackIntoProseAndCode(back) {
  const text = back.trim();
  if (!text) return { prose: null, code: null };
  if (isMostlyCode(text)) return { prose: null, code: text };

  const sentences = text.split(/\.\s+/);
  if (sentences.length >= 2) {
    const last = sentences[sentences.length - 1].trim();
    const rest = sentences.slice(0, -1).join('. ').trim();
    if (isMostlyCode(last) || /^use[A-Z]/.test(last) || /^<[A-Z]/.test(last)) {
      const prose = rest.endsWith('.') ? rest : `${rest}.`;
      return { prose, code: last };
    }
  }

  return { prose: text, code: null };
}

export { isMostlyCode };

const REACT_RUNTIME = [
  'useState',
  'useEffect',
  'useContext',
  'createContext',
  'useReducer',
  'useRef',
  'useMemo',
  'useCallback',
  'useImperativeHandle',
  'useLayoutEffect',
  'useId',
  'useDebugValue',
  'useTransition',
  'useDeferredValue',
  'useSyncExternalStore',
  'useActionState',
  'useOptimistic',
  'use',
  'lazy',
  'Suspense',
  'memo',
  'Fragment',
  'StrictMode',
];

const REACT_TYPES = [
  ['React\\.FC\\b', 'FC'],
  ['React\\.ReactNode\\b', 'ReactNode'],
  ['React\\.ChangeEvent\\b', 'ChangeEvent'],
  ['React\\.MouseEvent\\b', 'MouseEvent'],
  ['React\\.Ref\\b', 'Ref'],
  ['React\\.ElementType\\b', 'ElementType'],
  ['React\\.ComponentProps\\b', 'ComponentProps'],
  ['React\\.ComponentType\\b', 'ComponentType'],
  ['React\\.ComponentPropsWithoutRef\\b', 'ComponentPropsWithoutRef'],
  ['\\bRef<HTMLInputElement>', 'Ref'],
];

function hasImportFrom(source, pkg) {
  return new RegExp(`from ['"]${pkg.replace('/', '\\/')}['"]`).test(source);
}

function collectMatches(code, entries) {
  const found = new Set();
  for (const [pattern, name] of entries) {
    if (new RegExp(pattern).test(code)) found.add(name);
  }
  return found;
}

/** Prepend standard imports when a snippet uses APIs but omits import lines. */
export function ensureSnippetImports(code) {
  const trimmed = code.trim();
  if (!trimmed) return trimmed;

  let directivePrefix = '';
  let body = trimmed;
  const directiveMatch = trimmed.match(/^((?:['"]use (?:client|server)['"];\s*\n?)+)/);
  if (directiveMatch) {
    directivePrefix = directiveMatch[1].endsWith('\n') ? directiveMatch[1] : `${directiveMatch[1]}\n`;
    body = trimmed.slice(directiveMatch[0].length).trim();
  }

  const imports = [];

  if (!hasImportFrom(body, 'react')) {
    const runtime = collectMatches(
      body,
      REACT_RUNTIME.map((name) => [`\\b${name}\\b`, name])
    );
    const types = collectMatches(body, REACT_TYPES);
    const usesReactNamespace = /\bReact\./.test(body);

    if (usesReactNamespace) {
      imports.push(`import React from 'react';`);
    } else if (runtime.size > 0) {
      imports.push(`import { ${[...runtime].sort().join(', ')} } from 'react';`);
    } else if (/<[A-Za-z]/.test(body)) {
      imports.push(`import React from 'react';`);
    }

    if (types.size > 0) {
      imports.push(`import type { ${[...types].sort().join(', ')} } from 'react';`);
    }
  }

  if (/\bcreatePortal\b/.test(body) && !hasImportFrom(body, 'react-dom')) {
    imports.push(`import { createPortal } from 'react-dom';`);
  }

  const router = collectMatches(body, [
    ['\\bcreateBrowserRouter\\b', 'createBrowserRouter'],
    ['\\bRouterProvider\\b', 'RouterProvider'],
    ['\\bRoute\\b', 'Route'],
    ['\\bNavigate\\b', 'Navigate'],
    ['\\buseParams\\b', 'useParams'],
    ['\\buseSearchParams\\b', 'useSearchParams'],
    ['\\buseNavigate\\b', 'useNavigate'],
    ['\\bLink\\b', 'Link'],
    ['\\bOutlet\\b', 'Outlet'],
  ]);
  if (router.size > 0 && !hasImportFrom(body, 'react-router-dom')) {
    imports.push(`import { ${[...router].sort().join(', ')} } from 'react-router-dom';`);
  }

  if (/\buseQuery\b/.test(body) && !hasImportFrom(body, '@tanstack/react-query')) {
    imports.push(`import { useQuery } from '@tanstack/react-query';`);
  }
  if (/\buseInfiniteQuery\b/.test(body) && !hasImportFrom(body, '@tanstack/react-query')) {
    imports.push(`import { useInfiniteQuery } from '@tanstack/react-query';`);
  }
  if (/\buseSWR\b/.test(body) && !hasImportFrom(body, 'swr')) {
    imports.push(`import useSWR from 'swr';`);
  }
  if (/\buseMutation\b/.test(body) && !hasImportFrom(body, '@tanstack/react-query')) {
    const parts = ['useMutation'];
    if (/\bqc\.|QueryClient\b/.test(body)) parts.push('useQueryClient');
    if (/\bQueryClientProvider\b/.test(body)) parts.push('QueryClientProvider');
    imports.push(`import { ${parts.join(', ')} } from '@tanstack/react-query';`);
  }

  if (/\brenderHook\b/.test(body) && !hasImportFrom(body, '@testing-library/react')) {
    const rtl = ['renderHook', 'act'];
    if (/\brender\(/.test(body)) rtl.unshift('render');
    if (/\bscreen\b/.test(body)) rtl.push('screen');
    if (/\bwaitFor\b/.test(body)) rtl.push('waitFor');
    imports.push(`import { ${rtl.join(', ')} } from '@testing-library/react';`);
  } else if (/\brender\(/.test(body) && /\bscreen\b/.test(body) && !hasImportFrom(body, '@testing-library/react')) {
    const rtl = ['render', 'screen'];
    if (/\bwaitFor\b/.test(body)) rtl.push('waitFor');
    imports.push(`import { ${rtl.join(', ')} } from '@testing-library/react';`);
  }

  if (/\buserEvent\b/.test(body) && !hasImportFrom(body, '@testing-library/user-event')) {
    imports.push(`import userEvent from '@testing-library/user-event';`);
  }

  if (/\bexpect\(/.test(body) && !hasImportFrom(body, 'vitest') && !hasImportFrom(body, '@jest/globals')) {
    if (/\bdescribe\(/.test(body) || /\bit\(/.test(body)) {
      imports.push(`import { describe, it, expect } from 'vitest';`);
    } else {
      imports.push(`import { expect } from 'vitest';`);
    }
  }

  if (/\buseForm\b/.test(body) && !hasImportFrom(body, 'react-hook-form')) {
    const rhf = ['useForm'];
    if (/\buseFieldArray\b/.test(body)) rhf.push('useFieldArray');
    imports.push(`import { ${rhf.join(', ')} } from 'react-hook-form';`);
  }
  if (/\bzodResolver\b/.test(body) && !hasImportFrom(body, '@hookform/resolvers/zod')) {
    imports.push(`import { zodResolver } from '@hookform/resolvers/zod';`);
  }
  if (/\bz\.object\b/.test(body) && !hasImportFrom(body, 'zod')) {
    imports.push(`import { z } from 'zod';`);
  }

  if (/\bcreateSlice\b/.test(body) && !hasImportFrom(body, '@reduxjs/toolkit')) {
    imports.push(`import { createSlice } from '@reduxjs/toolkit';`);
  }
  if (
    /\bcreate\(\s*\(set\)/.test(body) &&
    !/\bcreateSlice\b/.test(body) &&
    !hasImportFrom(body, 'zustand')
  ) {
    imports.push(`import { create } from 'zustand';`);
  }

  if (/\bdefineConfig\b/.test(body) && !hasImportFrom(body, 'vite')) {
    imports.push(`import { defineConfig } from 'vite';`);
    if (/\breact\(\)/.test(body) && !hasImportFrom(body, '@vitejs/plugin-react')) {
      imports.push(`import react from '@vitejs/plugin-react';`);
    }
  }

  if (/\bcva\(/.test(body) && !hasImportFrom(body, 'class-variance-authority')) {
    imports.push(`import { cva } from 'class-variance-authority';`);
  }

  if (/\bdynamic\(/.test(body) && !hasImportFrom(body, 'next/dynamic')) {
    imports.push(`import dynamic from 'next/dynamic';`);
  }

  if (/\bDOMPurify\b/.test(body) && !hasImportFrom(body, 'dompurify')) {
    imports.push(`import DOMPurify from 'dompurify';`);
  }

  if (imports.length === 0) return trimmed;

  const existingImportBlock = body.match(/^(?:import .+\n)+/);
  if (existingImportBlock) {
    const rest = body.slice(existingImportBlock[0].length).trimStart();
    return `${directivePrefix}${existingImportBlock[0].trimEnd()}\n${imports.join('\n')}\n\n${rest}`.trim();
  }

  return `${directivePrefix}${imports.join('\n')}\n\n${body}`.trim();
}

const BY_DECK = {
  'typescript-in-react': {
    'Typing component props': `type Props = { title: string; count?: number };

function Card({ title, count = 0 }: Props) {
  return <h2>{title} ({count})</h2>;
}`,
    'React.FC vs function signature?': `// Preferred
function Button({ label }: { label: string }) {
  return <button>{label}</button>;
}

// FC rarely needed today
const Legacy: React.FC<{ label: string }> = ({ label }) => <button>{label}</button>;`,
    'Typing useState': `const [user, setUser] = useState<User | null>(null);
const [tags, setTags] = useState<string[]>([]);`,
    'Typing events': `function onChange(e: React.ChangeEvent<HTMLInputElement>) {
  setName(e.target.value);
}

function onClick(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
}`,
    'Typing children': `type Props = { children: React.ReactNode };

function Panel({ children }: Props) {
  return <section>{children}</section>;
}`,
    'Generic components': `function List<T>({
  items,
  render,
}: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) {
  return <ul>{items.map((item) => <li key={String(item)}>{render(item)}</li>)}</ul>;
}`,
    'ComponentProps utility': `import { Button } from './Button';

type ButtonProps = React.ComponentProps<typeof Button>;

function IconButton(props: ButtonProps) {
  return <Button {...props} aria-label="icon" />;
}`,
    'Ref typing': `const inputRef = useRef<HTMLInputElement>(null);

inputRef.current?.focus();`,
    'Discriminated unions in UI': `type State =
  | { status: 'loading' }
  | { status: 'ok'; data: User[] }
  | { status: 'error'; message: string };

if (state.status === 'ok') {
  return <List items={state.data} />;
}`,
    'as const': `const sizes = ['sm', 'md', 'lg'] as const;
type Size = (typeof sizes)[number];`,
    'satisfies operator': `const theme = {
  color: '#863bff',
  radius: 8,
} satisfies Theme;`,
    'Typing context': `const AuthContext = createContext<Auth | null>(null);

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth requires AuthProvider');
  return ctx;
}`,
    'Ref as prop (React 19)': `function TextInput({ ref, ...props }: { ref?: React.Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />;
}`,
    'Module augmentation': `declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}`,
    'strictNullChecks impact': `function Greeting({ name }: { name?: string }) {
  return <p>{name?.toUpperCase() ?? 'Guest'}</p>;
}`,
  },
  hooks: {
    'Rules of Hooks': `function Counter() {
  const [n, setN] = useState(0); // ✓ top level

  if (n > 10) return null;
  // const [x, setX] = useState(0); // ✗ hook after conditional
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}`,
    useState: `const [count, setCount] = useState(0);
setCount((c) => c + 1);

const [data] = useState(() => expensiveInit());`,
    useEffect: `useEffect(() => {
  const ctrl = new AbortController();
  fetch('/api/user', { signal: ctrl.signal })
    .then((r) => r.json())
    .then(setUser);
  return () => ctrl.abort();
}, [userId]);`,
    useContext: `const ThemeContext = createContext<'light' | 'dark'>('light');

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}`,
    useReducer: `const [state, dispatch] = useReducer(reducer, { count: 0 });

dispatch({ type: 'increment' });`,
    useRef: `const inputRef = useRef<HTMLInputElement>(null);
const renderCount = useRef(0);

renderCount.current += 1; // does not re-render`,
    'useMemo / useCallback': `const sorted = useMemo(() => items.sort(compare), [items]);
const onSave = useCallback(() => save(id), [id]);`,
    useImperativeHandle: `useImperativeHandle(ref, () => ({
  focus() {
    inputRef.current?.focus();
  },
}));`,
    useLayoutEffect: `useLayoutEffect(() => {
  const width = ref.current?.getBoundingClientRect().width;
  setTooltipWidth(width);
}, []);`,
    useId: `const id = useId();
<label htmlFor={id}>Email</label>
<input id={id} type="email" />`,
    useDebugValue: `function useOnlineStatus() {
  const online = useSyncExternalStore(subscribe, getSnapshot);
  useDebugValue(online ? 'Online' : 'Offline');
  return online;
}`,
    'Custom hooks': `function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return { on, toggle };
}`,
    useTransition: `const [isPending, startTransition] = useTransition();

startTransition(() => {
  setTab(nextTab);
});`,
    useDeferredValue: `const deferredQuery = useDeferredValue(query);
const filtered = useMemo(() => filter(items, deferredQuery), [items, deferredQuery]);`,
  },
  'react-19': {
    'Actions (React 19)': `async function createTodo(formData: FormData) {
  'use server';
  await db.todo.create({ title: formData.get('title') });
}

<form action={createTodo}>...</form>`,
    useActionState: `const [state, formAction, isPending] = useActionState(saveTodo, null);

<form action={formAction}>
  <button disabled={isPending}>Save</button>
</form>`,
    useOptimistic: `const [optimistic, addOptimistic] = useOptimistic(
  todos,
  (state, newTodo) => [...state, { ...newTodo, pending: true }]
);`,
    'use() hook': `function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  const comments = use(commentsPromise);
  return comments.map((c) => <p key={c.id}>{c.text}</p>);
}`,
    'ref as prop': `function TextInput({ ref, ...props }: { ref?: Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />;
}`,
    'Document metadata': `function Page() {
  return (
    <>
      <title>Dashboard</title>
      <meta name="description" content="User dashboard" />
      <main>...</main>
    </>
  );
}`,
    'Context as provider': `<ThemeContext value={theme}>
  <App />
</ThemeContext>`,
    'Cleanup ref callbacks': `ref={(node) => {
  node?.focus();
  return () => cleanup(node);
}}`,
  },
  'component-lifecycle': {
    'Mount phase (function components)': `// render → commit DOM → useLayoutEffect → paint → useEffect
function Widget() {
  useLayoutEffect(() => measure(), []);
  useEffect(() => subscribe(), []);
  return <div />;
}`,
    'Update phase': `useEffect(() => {
  fetchUser(userId);
}, [userId]); // re-runs when userId changes`,
    'Unmount cleanup': `useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);`,
    'useLayoutEffect vs useEffect': `useLayoutEffect(() => {
  setHeight(ref.current?.offsetHeight ?? 0);
}, []);

useEffect(() => {
  document.title = \`\${count} items\`;
}, [count]);`,
    'shouldComponentUpdate equivalent?': `const Row = React.memo(function Row({ item }: { item: Item }) {
  return <td>{item.name}</td>;
});`,
  },
  'performance-optimization': {
    'React.memo': `const Chart = React.memo(function Chart({ data }: { data: Point[] }) {
  return <svg>...</svg>;
});`,
    useMemo: `const visible = useMemo(() => filterRows(rows, query), [rows, query]);`,
    useCallback: `const handleSelect = useCallback((id: string) => {
  setSelected(id);
}, []);`,
    'Code splitting': `const Settings = lazy(() => import('./Settings'));

<Suspense fallback={<Spinner />}>
  <Settings />
</Suspense>`,
    useDeferredValue: `const deferredItems = useDeferredValue(items);`,
    useTransition: `const [isPending, startTransition] = useTransition();
startTransition(() => setTab('charts'));`,
  },
  'design-patterns': {
    'Compound components': `function Tabs({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  return <TabsContext value={{ active, setActive }}>{children}</TabsContext>;
}
Tabs.List = TabsList;
Tabs.Panel = TabsPanel;`,
    'Render props': `<DataLoader url="/api/users" render={(data) => <UserList users={data} />} />`,
    'Higher-order component (HOC)': `function withAuth<P>(Component: React.ComponentType<P & { user: User }>) {
  return function Authed(props: P) {
    const user = useAuth();
    return <Component {...props} user={user} />;
  };
}`,
    'Custom hooks pattern': `function useForm<T>(initial: T) {
  const [values, setValues] = useState(initial);
  const set = (key: keyof T, value: T[keyof T]) =>
    setValues((v) => ({ ...v, [key]: value }));
  return { values, set };
}`,
    'Portal pattern': `createPortal(
  <Modal>{children}</Modal>,
  document.getElementById('modal-root')!
);`,
    'Polymorphic components': `type Props<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

function Text<T extends React.ElementType = 'span'>({ as, ...props }: Props<T>) {
  const Comp = as ?? 'span';
  return <Comp {...props} />;
}`,
  },
  'routing-navigation': {
    'React Router 7 basics': `const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
]);

<RouterProvider router={router} />`,
    'Nested routes': `<Route path="dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route path="settings" element={<Settings />} />
</Route>`,
    'Dynamic params': `<Route path="users/:id" element={<UserProfile />} />;

const { id } = useParams();`,
    'Search params': `const [params, setParams] = useSearchParams();
const page = Number(params.get('page') ?? '1');`,
    'Programmatic navigation': `const navigate = useNavigate();
navigate('/checkout');
navigate(-1);`,
    'Protected routes': `function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}`,
    'Lazy routes': `const Admin = lazy(() => import('./Admin'));

<Route path="admin" element={
  <Suspense fallback={<Spinner />}><Admin /></Suspense>
} />`,
  },
  'testing-react': {
    'render vs screen': `render(<LoginForm />);
expect(screen.getByRole('button', { name: /sign in/i })).toBeEnabled();`,
    'userEvent vs fireEvent': `await userEvent.click(screen.getByRole('button', { name: /save/i }));
await userEvent.type(screen.getByLabelText(/email/i), 'a@b.com');`,
    'waitFor / findBy': `const row = await screen.findByText(/uploaded/i);
await waitFor(() => expect(mockFetch).toHaveBeenCalled());`,
    'Testing hooks': `const { result } = renderHook(() => useCounter(), { wrapper: Providers });
act(() => result.current.inc());
expect(result.current.count).toBe(1);`,
    'Provider wrappers': `render(<Profile />, {
  wrapper: ({ children }) => <QueryClientProvider client={qc}>{children}</QueryClientProvider>,
});`,
  },
  'data-fetching': {
    'useEffect fetch pitfalls': `useEffect(() => {
  const ctrl = new AbortController();
  fetch(url, { signal: ctrl.signal }).then(setData);
  return () => ctrl.abort();
}, [url]);`,
    'TanStack Query benefits': `const { data, isLoading, error } = useQuery({
  queryKey: ['todos', userId],
  queryFn: () => fetchTodos(userId),
  staleTime: 60_000,
});`,
    'staleTime vs gcTime': `useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 30_000,
  gcTime: 5 * 60_000,
});`,
    'Optimistic updates': `useMutation({
  mutationFn: updateTodo,
  onMutate: async (next) => {
    await qc.cancelQueries({ queryKey: ['todos'] });
    qc.setQueryData(['todos'], (old) => [...old, next]);
  },
});`,
    'useInfiniteQuery': `const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['feed'],
  queryFn: ({ pageParam }) => fetchFeed(pageParam),
  getNextPageParam: (last) => last.cursor,
});`,
  },
  'forms-validation': {
    'Controlled form fields': `const [email, setEmail] = useState('');

<input value={email} onChange={(e) => setEmail(e.target.value)} />`,
    'react-hook-form': `const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});

<input {...register('email')} />`,
    'Zod + forms': `const schema = z.object({ email: z.string().email() });
type FormData = z.infer<typeof schema>;`,
    'useFieldArray': `const { fields, append, remove } = useFieldArray({ control, name: 'items' });`,
    'Server Actions forms': `'use client';
<form action={formAction}>
  <SubmitButton />
</form>`,
  },
  security: {
    'XSS in React': `// Safe by default
<p>{userBio}</p>

// Dangerous — sanitize first
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />`,
    'Auth token storage': `// Prefer httpOnly cookie set by server
// Avoid: localStorage.setItem('token', jwt)`,
  },
  'server-components-ssr': {
    'Server Component': `// app/page.tsx — no 'use client'
export default async function Page() {
  const data = await db.query();
  return <List items={data} />;
}`,
    '"use client"': `'use client';

export function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}`,
    'Server Actions': `async function addItem(formData: FormData) {
  'use server';
  await db.items.create({ name: formData.get('name') });
}`,
    'Client-only libraries': `const Map = dynamic(() => import('./Map'), { ssr: false });`,
  },
  'next-framework': {
    'layout.tsx': `// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <Sidebar />
      {children}
    </div>
  );
}`,
    'loading.tsx': `// app/dashboard/loading.tsx
export default function Loading() {
  return <Skeleton />;
}`,
    'error.tsx': `'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <button onClick={reset}>Try again</button>;
}`,
    'Metadata API': `export const metadata = {
  title: 'Products',
  description: 'Browse our catalog',
};`,
    'Route handlers': `// app/api/health/route.ts
export async function GET() {
  return Response.json({ ok: true });
}`,
    'Image component': `import Image from 'next/image';

<Image src="/hero.png" alt="Hero" width={1200} height={630} priority />`,
  },
  accessibility: {
    'Semantic HTML first': `<nav aria-label="Main">
  <button type="button">Save</button>
</nav>`,
    'Accessible name': `<button aria-label="Close dialog">×</button>`,
    'Focus management': `useEffect(() => {
  dialogRef.current?.focus();
  return () => triggerRef.current?.focus();
}, []);`,
    'aria-live': `<div aria-live="polite" role="status">{toastMessage}</div>`,
    'Form labels': `<label htmlFor="email">Email</label>
<input id="email" name="email" type="email" />`,
  },
  styling: {
    'CSS Modules': `import styles from './Card.module.css';

export function Card() {
  return <article className={styles.card}>...</article>;
}`,
    'Tailwind CSS': `<button className="rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-500">
  Save
</button>`,
    'Inline styles': `<div style={{ transform: \`translateX(\${x}px)\` }} />`,
    'clsx / cn utility': `import { cn } from '@/lib/utils';

<button className={cn('btn', isActive && 'btn-active')} />`,
    'Component variants': `const button = cva('btn', {
  variants: { size: { sm: 'btn-sm', md: 'btn-md' } },
});`,
  },
  'tools-build': {
    Vite: `// vite.config.ts
export default defineConfig({
  plugins: [react()],
});`,
    'Environment variables': `const apiUrl = import.meta.env.VITE_API_URL;`,
    Vitest: `import { describe, it, expect } from 'vitest';

describe('sum', () => {
  it('adds', () => expect(1 + 1).toBe(2));
});`,
  },
  'ecosystem-integration': {
    Zustand: `const useStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}));`,
    'Redux Toolkit': `const slice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: { add(state, action) { state.items.push(action.payload); } },
});`,
  },
  'react-internals': {
    'Hooks linked list': `// Same component, same hook order every render
useState();
useEffect();
useContext(ThemeContext);`,
  },
  'application-architecture': {
    'URL as state': `const [params] = useSearchParams();
const tab = params.get('tab') ?? 'overview';`,
    'Error boundaries placement': `<Route path="billing/*" element={
  <ErrorBoundary fallback={<BillingError />}>
    <BillingRoutes />
  </ErrorBoundary>
} />`,
  },
};

/**
 * @param {string} deckId
 * @param {string} front
 * @param {string} back
 * @returns {string | null}
 */
export function getCodeExample(deckId, front, back) {
  const key = front.trim().replace(/\?$/, '');
  const explicit = BY_DECK[deckId]?.[key] ?? BY_DECK[deckId]?.[front.trim()];
  const raw = explicit ?? splitBackIntoProseAndCode(back).code;
  return raw ? ensureSnippetImports(raw) : null;
}
