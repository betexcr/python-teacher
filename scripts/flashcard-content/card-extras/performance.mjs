export const performanceExtras = {
  'React.memo': {
    detail:
      'Memo skips re-render when props are shallow-equal—useless if parents pass inline objects/functions every render unless those deps are stabilized.',
    code: `const Chart = memo(function Chart({ data }: { data: Point[] }) {
  return <svg>{data.map(drawPoint)}</svg>;
});`,
  },
  useMemo: {
    detail:
      'Caches a computed value between renders when deps are unchanged—not for side effects; misuse adds comparison overhead without measurable win.',
    code: `const visible = useMemo(
  () => rows.filter((r) => r.name.includes(query)),
  [rows, query]
);`,
  },
  useCallback: {
    detail:
      'Preserves function identity so memoized children do not re-render solely because a new inline handler was created each parent render.',
    code: `const onSave = useCallback((id: string) => {
  dispatch({ type: 'save', id });
}, [dispatch]);`,
  },
  'Code splitting': {
    detail:
      'Split routes and heavy widgets with lazy + Suspense so initial JS stays small—pair with route-based chunks from your bundler for automatic boundaries.',
    code: `const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Settings />
    </Suspense>
  );
}`,
  },
  Virtualization: {
    detail:
      'Render only visible rows for 10k+ item lists—constant DOM size beats memoizing thousands of mounted nodes you cannot see.',
    code: `import { FixedSizeList } from 'react-window';

<FixedSizeList height={400} itemCount={items.length} itemSize={48} width="100%">
  {({ index, style }) => <Row style={style} item={items[index]} />}
</FixedSizeList>`,
  },
  'Profiler API': {
    detail:
      'onRender logs commit durations in production-capable builds—use DevTools Profiler for interactive flame charts; API helps correlate commits with user actions.',
    code: `<Profiler id="Checkout" onRender={(id, phase, actualDuration) => {
  if (actualDuration > 16) console.warn(id, phase, actualDuration);
}}>
  <Checkout />
</Profiler>`,
  },
  'Avoid premature optimization': {
    detail:
      'Measure with Profiler or Web Vitals before memoizing—unnecessary memo/useCallback adds memory and comparison cost on every render.',
    code: `// Start simple:
function List({ items }: { items: Item[] }) {
  return items.map((i) => <Row key={i.id} item={i} />);
}`,
  },
  'Context performance': {
    detail:
      'A single context value that changes often forces every consumer to re-render—split by domain (theme vs cart) or pass selectors via external store patterns.',
    code: `const ThemeContext = createContext(themeLight);
const CartContext = createContext(cartEmpty);

// Avoid one MegaContext with { theme, cart, user, ... }`,
  },
  useDeferredValue: {
    detail:
      'Defers expensive list filtering so typing stays at full frame rate while the heavy derived view catches up one beat behind.',
    code: `const deferredItems = useDeferredValue(items);
const filtered = useMemo(() => filter(deferredItems, q), [deferredItems, q]);`,
  },
  useTransition: {
    detail:
      'Marks tab switches and chart updates as transitions so urgent input updates preempt long renders—surface isPending for subtle loading affordances.',
    code: `const [isPending, startTransition] = useTransition();

startTransition(() => setView('analytics'));`,
  },
  'Bundle size': {
    detail:
      'Import ESM paths, analyze bundles, and defer heavy chart/editor packages to lazy routes—server components also remove server-only code from client JS.',
    code: `const Editor = lazy(() => import('./RichEditor'));`,
  },
  'Keys and reconciliation cost': {
    detail:
      'Unstable keys (array index on reorder) remount DOM and reset internal state—expensive child trees amplify the cost beyond a simple list item swap.',
    code: `{items.map((item) => (
  <ExpensiveRow key={item.id} item={item} />
))}`,
  },
  'Web Vitals': {
    detail:
      'Optimize LCP (hero image/font), INP (long tasks blocking input), and CLS (layout shift from async content)—React perf tuning should map to these metrics.',
    code: `// Defer non-critical work:
startTransition(() => setShowCharts(true));`,
  },
  'Server Components perf': {
    detail:
      'Server Components never ship their implementation to the browser—client boundaries still pay for hydration and RSC payload size on interactive islands.',
    code: `export default async function Page() {
  const data = await db.query();
  return <ClientChart summary={data.summary} />;
}`,
  },
  'Hydration cost': {
    detail:
      'Mismatch forces client re-render; reduce client-only branches in SSR HTML and stream slow sections behind Suspense to shorten time-to-interactive.',
    code: `<Suspense fallback={<Skeleton />}>
  <ClientWidget />
</Suspense>`,
  },
};
