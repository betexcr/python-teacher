export const internalsExtras = {
  'Fiber architecture': {
    detail:
      'Each component instance is a fiber node—React can pause, resume, and prioritize work units instead of blocking the main thread on large trees.',
    code: `// Conceptual: fiber holds type, props, child, sibling, return pointers
function App() {
  return <Layout><Page /></Layout>;
}`,
  },
  'Reconciliation algorithm': {
    detail:
      'Same element type at a position updates props in place; different types tear down the subtree—why changing component from div to span resets state.',
    code: `// <div key="a" /> → <span key="a" /> remounts
// <Row key={id} /> → <Row key={id} /> updates props`,
  },
  'Commit phase': {
    detail:
      'After render, commit applies DOM mutations, runs useLayoutEffect, paints, then passive useEffect—errors in layout effects block paint.',
    code: `// Order: render → commit DOM → useLayoutEffect → paint → useEffect`,
  },
  'Lanes / priorities': {
    detail:
      'React 18 schedules urgent updates (typing) in higher-priority lanes than transitions—startTransition lowers priority so input stays snappy.',
    code: `startTransition(() => setFiltered(hugeComputation(query)));`,
  },
  'Double buffering': {
    detail:
      'Work-in-progress fiber tree swaps with current on commit—enables interrupted renders without mutating the live tree users see mid-frame.',
    code: `// current ↔ alternate fiber pointers swap at commit`,
  },
  'Hooks linked list': {
    detail:
      'Hooks are stored on the fiber in call order—conditional hooks shift indices and corrupt state, which is why the rules of hooks exist.',
    code: `function Example() {
  const [a] = useState(0);
  useEffect(() => {}, []);
  const theme = useContext(ThemeContext);
  return null;
}`,
  },
  'Synthetic events legacy': {
    detail:
      'React 17+ delegates to the root container, not document—event pooling was removed; native listeners on DOM nodes still fire separately.',
    code: `document.addEventListener('click', onDocClick);
// vs React onClick on elements`,
  },
  Batching: {
    detail:
      'Multiple setStates in the same event or many async contexts batch to one render in React 18+—do not read DOM expecting intermediate renders.',
    code: `function onClick() {
  setA(1);
  setB(2);
  // One re-render
}`,
  },
  'Suspense mechanism': {
    detail:
      'When a child throws a thenable, React walks up to the nearest Suspense boundary and shows fallback until the promise resolves.',
    code: `<Suspense fallback={<Spinner />}>
  <ChildThatSuspends />
</Suspense>`,
  },
  'Concurrent rendering': {
    detail:
      'Render work can be interrupted for higher-priority updates—enables transitions and keeps input responsive during expensive trees.',
    code: `const [isPending, startTransition] = useTransition();
startTransition(() => setTab('heavy'));`,
  },
  useSyncExternalStore: {
    detail:
      'Subscribes to external stores with getServerSnapshot for SSR—prevents tearing when concurrent rendering reads changing external state.',
    code: `const value = useSyncExternalStore(
  subscribeToStore,
  () => store.getState(),
  () => store.getServerState()
);`,
  },
  'Activity component': {
    detail:
      'React 19.2+ Activity hidden mode keeps DOM/state but runs effect cleanup until visible again—alternative to unmounting off-screen tabs.',
    code: `<Activity mode={active ? 'visible' : 'hidden'}>
  <HeavyPanel />
</Activity>`,
  },
  'Compiler (React Forget)': {
    detail:
      'Compile-time auto-memoization reduces hand-written memo/useCallback—adoption is incremental; measure before deleting existing memos blindly.',
    code: `// Compiler may memoize automatically:
function List({ items }: { items: Item[] }) {
  return items.map((i) => <Row key={i.id} item={i} />);
}`,
  },
  DevTools: {
    detail:
      'Profiler flame charts show which components committed slowly—pair with why-did-you-render style debugging only after identifying hot commits.',
    code: `// React DevTools → Profiler → record interaction → inspect commits`,
  },
};
