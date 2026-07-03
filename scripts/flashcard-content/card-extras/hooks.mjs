export const hooksExtras = {
  'Rules of Hooks': {
    detail:
      'Hooks must run in the same order every render—calling them inside loops, conditions, or nested functions breaks the fiber hook list and causes subtle bugs.',
    code: `function Counter() {
  const [n, setN] = useState(0);

  if (n > 99) return <p>Max</p>;
  // Never: if (n > 0) { const [x] = useState(0); }

  return <button onClick={() => setN((c) => c + 1)}>{n}</button>;
}`,
  },
  useState: {
    detail:
      'Functional updates read the latest state when batching multiple setters; lazy init useState(() => …) runs once and avoids expensive work on every render.',
    code: `const [count, setCount] = useState(0);
setCount((c) => c + 1);

const [items] = useState(() => buildInitialItemsFromStorage());`,
  },
  useEffect: {
    detail:
      'Effects run after paint—use them for subscriptions and fetches, not for synchronous DOM reads that must happen before the browser paints.',
    code: `useEffect(() => {
  const ctrl = new AbortController();
  fetch(\`/api/user/\${userId}\`, { signal: ctrl.signal })
    .then((r) => r.json())
    .then(setUser);
  return () => ctrl.abort();
}, [userId]);`,
  },
  useContext: {
    detail:
      'Any consumer re-renders when the provider value changes—split contexts or memoize the value object to avoid broadcasting unrelated updates.',
    code: `const ThemeContext = createContext<'light' | 'dark'>('light');

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <header className={theme === 'dark' ? 'dark' : ''}>…</header>;
}`,
  },
  useReducer: {
    detail:
      'When the next state depends on a typed action, reducers document transitions better than many useState calls—especially for wizards and carts.',
    code: `type Action = { type: 'inc' } | { type: 'dec' };

function reducer(state: number, action: Action) {
  switch (action.type) {
    case 'inc': return state + 1;
    case 'dec': return state - 1;
    default: return state;
  }
}

const [count, dispatch] = useReducer(reducer, 0);`,
  },
  useRef: {
    detail:
      'Updating ref.current does not trigger a re-render—ideal for DOM nodes, timers, and mutable values that should survive renders without appearing in state.',
    code: `const inputRef = useRef<HTMLInputElement>(null);
const renders = useRef(0);
renders.current += 1;

return <input ref={inputRef} onFocus={() => inputRef.current?.select()} />;`,
  },
  'useMemo / useCallback': {
    detail:
      'Stabilize referential equality for memoized children; avoid sprinkling memo everywhere—profile first, and let React Compiler reduce manual memo where adopted.',
    code: `const sorted = useMemo(() => [...items].sort(compare), [items]);
const onSelect = useCallback((id: string) => setSelected(id), []);

return <MemoRow items={sorted} onSelect={onSelect} />;`,
  },
  useImperativeHandle: {
    detail:
      'Expose a narrow imperative API (focus, scrollIntoView) to parents while keeping implementation private—works with ref-as-prop in React 19 or forwardRef for older trees.',
    code: `function TextInput({ ref }: { ref?: React.Ref<{ focus: () => void }> }) {
  const inner = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inner.current?.focus();
    },
  }));

  return <input ref={inner} />;
}`,
  },
  useLayoutEffect: {
    detail:
      'Runs synchronously after DOM updates and before paint—use for measurements and layout that must complete before users see a flash of wrong layout.',
    code: `const ref = useRef<HTMLDivElement>(null);
const [height, setHeight] = useState(0);

useLayoutEffect(() => {
  setHeight(ref.current?.getBoundingClientRect().height ?? 0);
}, [items]);

return <div ref={ref} style={{ minHeight: height }}>{children}</div>;`,
  },
  useId: {
    detail:
      'Generates stable ids across SSR and client hydration—pair label htmlFor with input id without collisions when multiple instances mount.',
    code: `const id = useId();

return (
  <>
    <label htmlFor={id}>Email</label>
    <input id={id} name="email" type="email" />
  </>
);`,
  },
  useDebugValue: {
    detail:
      'Labels custom hook state in React DevTools—only runs in development and should stay cheap because it executes on every render of consuming components.',
    code: `function useOnlineStatus() {
  const online = useSyncExternalStore(subscribeOnline, () => navigator.onLine);
  useDebugValue(online ? 'Online' : 'Offline');
  return online;
}`,
  },
  'Custom hooks': {
    detail:
      'Extract stateful logic into use* functions so components stay presentational—compose smaller hooks instead of one mega-hook that knows every feature.',
    code: `function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  const set = useCallback((v: boolean) => setOn(v), []);
  return { on, toggle, set };
}`,
  },
  useTransition: {
    detail:
      'Mark non-urgent updates so typing stays responsive while heavy tab switches or filters re-render in the background with isPending feedback.',
    code: `const [tab, setTab] = useState('home');
const [isPending, startTransition] = useTransition();

function selectTab(next: string) {
  startTransition(() => setTab(next));
}

return (
  <>
    <TabBar active={tab} onSelect={selectTab} />
    {isPending && <Spinner />}
    <TabPanel id={tab} />
  </>
);`,
  },
  useDeferredValue: {
    detail:
      'Keeps the UI responsive by letting expensive derived UI lag one frame behind fast-changing input—pair with memoized filtering of large lists.',
    code: `const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);
const filtered = useMemo(
  () => filterProducts(products, deferredQuery),
  [products, deferredQuery]
);

return (
  <>
    <input value={query} onChange={(e) => setQuery(e.target.value)} />
    <List items={filtered} stale={deferredQuery !== query} />
  </>
);`,
  },
};
