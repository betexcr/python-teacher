export const react19Extras = {
  'Actions (React 19)': {
    detail:
      'Pass an async function to form action so React handles pending state and transitions—distinct from startTransition, which marks updates non-urgent rather than wiring form submission.',
    code: `async function createTodo(formData: FormData) {
  'use server';
  await db.todo.create({ title: String(formData.get('title')) });
}

export function NewTodoForm() {
  return (
    <form action={createTodo}>
      <input name="title" required />
      <button type="submit">Add</button>
    </form>
  );
}`,
  },
  useActionState: {
    detail:
      'Returns [state, formAction, isPending]—bind formAction to <form action> for progressive enhancement with server-returned validation messages.',
    code: `type State = { ok: boolean; message: string } | null;

const [state, formAction, isPending] = useActionState(saveTodo, null);

return (
  <form action={formAction}>
    <input name="title" />
    <button disabled={isPending}>Save</button>
    {state?.message && <p role="status">{state.message}</p>}
  </form>
);`,
  },
  useOptimistic: {
    detail:
      'Show tentative UI while an action is in flight; React reverts to the real state if the server rejects the update—pairs naturally with Actions and mutations.',
    code: `const [todos, addOptimistic] = useOptimistic(
  serverTodos,
  (current, optimistic: Todo) => [...current, { ...optimistic, pending: true }]
);

async function add(formData: FormData) {
  const draft = { id: crypto.randomUUID(), title: String(formData.get('title')) };
  addOptimistic(draft);
  await createTodo(formData);
}`,
  },
  'use() hook': {
    detail:
      'Reads a promise or context during render and suspends until resolved—must sit under a Suspense boundary; enables promise-as-prop without useEffect + useState.',
    code: `function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  const comments = use(commentsPromise);
  return comments.map((c) => <p key={c.id}>{c.text}</p>);
}`,
  },
  'ref as prop': {
    detail:
      'Parents pass ref like any other prop in React 19—drop forwardRef in new code unless you ship a library that must support React 18 consumers.',
    code: `function TextInput({
  ref,
  ...props
}: React.ComponentProps<'input'> & { ref?: React.Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />;
}`,
  },
  'Document metadata': {
    detail:
      'Render <title> and <meta> in route components; supporting frameworks hoist them to document head without react-helmet for common cases.',
    code: `function BlogPost({ post }: { post: Post }) {
  return (
    <>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
      <article>{post.body}</article>
    </>
  );
}`,
  },
  'Improved hydration errors': {
    detail:
      'React 19 surfaces clearer mismatch diagnostics, but the fix is still aligning server HTML with the first client render—random IDs and Date.now() in SSR are frequent culprits.',
    code: `// Bad on server + client mismatch:
// <span>{Date.now()}</span>

const id = useId();
return <label htmlFor={id}>Name</label>;`,
  },
  'Server Components in frameworks': {
    detail:
      'Next App Router treats route modules as Server Components by default—only "use client" boundaries ship hook/effect code; server logic never enters the client bundle.',
    code: `// app/page.tsx — server by default
export default async function Page() {
  const posts = await fetchPosts();
  return <PostList posts={posts} />;
}`,
  },
  'Form reset behavior': {
    detail:
      'After a successful action, React can reset uncontrolled fields automatically—reduces manual reset() calls when using native form controls with Actions.',
    code: `<form action={submitContact}>
  <input name="email" defaultValue="" />
  <button type="submit">Send</button>
</form>`,
  },
  'Context as provider': {
    detail:
      'Render <ThemeContext value={theme}> directly—Provider shorthand still works in older examples but the element form is the modern JSX style.',
    code: `const ThemeContext = createContext<'light' | 'dark'>('light');

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <ThemeContext value={theme}>
      <Toolbar onToggle={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))} />
    </ThemeContext>
  );
}`,
  },
  'Cleanup ref callbacks': {
    detail:
      'Ref callbacks may return a cleanup function when the node unmounts—mirrors useEffect cleanup for focus traps or measuring observers tied to a DOM node.',
    code: `<div
  ref={(node) => {
    if (!node) return;
    const ro = new ResizeObserver(() => setWidth(node.offsetWidth));
    ro.observe(node);
    return () => ro.disconnect();
  }}
/>`,
  },
  'Automatic batching (React 18+)': {
    detail:
      'Multiple setStates inside promises, timeouts, and native events batch into one render in React 18+—React 19 continues this; do not rely on synchronous intermediate renders.',
    code: `async function save() {
  setSaving(true);
  await api.save();
  setSaving(false);
  setLastSaved(Date.now());
  // One re-render after await in React 18+
}`,
  },
  'Deprecated: defaultProps on FC': {
    detail:
      'Default parameters in the function signature replace defaultProps for function components—defaultProps remains relevant for class components only.',
    code: `function Greeting({ name = 'Guest' }: { name?: string }) {
  return <p>Hello, {name}</p>;
}`,
  },
  'Suspense + streaming': {
    detail:
      'Server streams HTML with Suspense fallbacks first, then fills holes as data resolves—client hydrates incrementally instead of blocking on the slowest query.',
    code: `export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <SlowComments />
    </Suspense>
  );
}`,
  },
  'Activity component (React 19.2+)': {
    detail:
      'Activity hidden mode preserves state/DOM but tears down effects—use for pre-rendered tabs or off-screen panels instead of unmounting expensive trees.',
    code: `<Activity mode={tab === 'settings' ? 'visible' : 'hidden'}>
  <SettingsPanel />
</Activity>`,
  },
};
