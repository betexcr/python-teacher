export const lifecycleExtras = {
  'Mount phase (function components)': {
    detail:
      'First render commits DOM, then useLayoutEffect runs before paint, then useEffect after paint—choose layout vs passive effects based on whether users can see intermediate layout.',
    code: `function Widget() {
  useLayoutEffect(() => {
    measure();
  }, []);

  useEffect(() => {
    const unsub = subscribe();
    return unsub;
  }, []);

  return <div ref={boxRef} />;
}`,
  },
  'Update phase': {
    detail:
      'State, prop, or context changes trigger re-render; effects re-run only when dependency values change—stale closures often mean a missing dep, not a broken effect.',
    code: `useEffect(() => {
  document.title = \`\${count} items\`;
}, [count]);`,
  },
  'Unmount cleanup': {
    detail:
      'Return a cleanup function from useEffect to clear timers, abort fetches, and remove listeners—cleanup also runs before re-running the effect when deps change.',
    code: `useEffect(() => {
  const id = window.setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);`,
  },
  'useLayoutEffect vs useEffect': {
    detail:
      'useLayoutEffect blocks paint—use for DOM measurement; useEffect is for work that can wait until after paint without visible flicker.',
    code: `useLayoutEffect(() => {
  setTooltipWidth(ref.current?.offsetWidth ?? 0);
}, [label]);

useEffect(() => {
  analytics.track('view', { id });
}, [id]);`,
  },
  'Class componentDidMount equivalent': {
    detail:
      'useEffect(fn, []) runs after paint on mount; Strict Mode in dev double-invokes setup+cleanup to expose missing teardown—not duplicate production mounts.',
    code: `useEffect(() => {
  const ctrl = new AbortController();
  fetchStats({ signal: ctrl.signal }).then(setStats);
  return () => ctrl.abort();
}, []);`,
  },
  'getDerivedStateFromProps equivalent': {
    detail:
      'Derive display values from props during render; store only user edits in state, or remount with key when you need a full reset—avoid setState in render to mirror props.',
    code: `function SearchResults({ query, results }: { query: string; results: Item[] }) {
  const filtered = useMemo(() => match(results, query), [results, query]);
  return <List items={filtered} />;
}`,
  },
  'shouldComponentUpdate equivalent': {
    detail:
      'React.memo shallow-compares props to skip re-render; custom arePropsEqual helps when parents pass new object literals that are semantically equal.',
    code: `const Row = memo(function Row({ item }: { item: Item }) {
  return <td>{item.name}</td>;
}, (prev, next) => prev.item.id === next.item.id);`,
  },
  'componentWillUnmount equivalent': {
    detail:
      'The function returned from useEffect or useLayoutEffect is the unmount (and pre-re-run) hook—put all teardown there, not in a separate ad-hoc pattern.',
    code: `useEffect(() => {
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, [onResize]);`,
  },
  'Why no componentWillMount': {
    detail:
      'Pre-paint side effects in classes caused SSR mismatches and double-fetch bugs—function components do pure render work, then effects after commit.',
    code: `// Prefer:
useEffect(() => {
  syncExternalStore();
}, []);

// Not: side effects during render`,
  },
  'Strict Mode double mount': {
    detail:
      'Development-only remount simulates navigation away and back—if effects leak listeners without cleanup, you will see duplicated subscriptions in dev.',
    code: `<StrictMode>
  <App />
</StrictMode>`,
  },
};
