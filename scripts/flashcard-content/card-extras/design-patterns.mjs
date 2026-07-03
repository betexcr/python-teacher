export const designPatternsExtras = {
  'Compound components': {
    detail:
      'Tabs.List / Tabs.Panel share implicit context so consumers compose layout without prop drilling ten booleans—API stays flexible like native HTML.',
    code: `const TabsContext = createContext<{ active: number; setActive: (i: number) => void } | null>(null);

function Tabs({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  return <TabsContext value={{ active, setActive }}>{children}</TabsContext>;
}

function Tab({ index, children }: { index: number; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return (
    <button aria-selected={ctx.active === index} onClick={() => ctx.setActive(index)}>
      {children}
    </button>
  );
}`,
  },
  'Render props': {
    detail:
      'Pass a function child to share data-fetching or subscription logic while letting callers own markup—precursor pattern to custom hooks.',
    code: `function MouseTracker({ render }: { render: (pos: { x: number; y: number }) => React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <>{render(pos)}</>;
}`,
  },
  'Higher-order component (HOC)': {
    detail:
      'Wrap components to inject cross-cutting props (auth, analytics)—prefer hooks today unless you need to enhance class components or legacy libraries.',
    code: `function withAuth<P>(Component: React.ComponentType<P & { user: User }>) {
  return function Authed(props: P) {
    const user = useAuth();
    if (!user) return <LoginPrompt />;
    return <Component {...props} user={user} />;
  };
}`,
  },
  'Custom hooks pattern': {
    detail:
      'useForm, useMediaQuery, and usePagination bundle state + effects—multiple components share behavior without inheritance or render-prop nesting.',
    code: `function useForm<T extends Record<string, string>>(initial: T) {
  const [values, setValues] = useState(initial);
  const set = (key: keyof T, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));
  return { values, set };
}`,
  },
  'Provider pattern': {
    detail:
      'Context providers inject theme, locale, or auth without prop drilling—keep provider values stable or memoized to limit subtree re-renders.',
    code: `const I18nContext = createContext<TranslateFn>(defaultT);

function I18nProvider({ children }: { children: React.ReactNode }) {
  const t = useMemo(() => createTranslator(locale), [locale]);
  return <I18nContext value={t}>{children}</I18nContext>;
}`,
  },
  'Controlled component pattern': {
    detail:
      'Parent owns value state; child is a thin input that fires onChange—enables instant validation and dependent fields across the form.',
    code: `function Parent() {
  const [email, setEmail] = useState('');
  return (
    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      aria-invalid={!email.includes('@')}
    />
  );
}`,
  },
  'State reducer pattern': {
    detail:
      'useReducer with typed actions documents every transition—checkout flows and wizards benefit more than a cluster of related useState calls.',
    code: `type Action =
  | { type: 'add'; item: LineItem }
  | { type: 'remove'; id: string };

function cartReducer(state: Cart, action: Action): Cart {
  switch (action.type) {
    case 'add': return { items: [...state.items, action.item] };
    case 'remove': return { items: state.items.filter((i) => i.id !== action.id) };
    default: return state;
  }
}`,
  },
  'Facade pattern': {
    detail:
      'A single useCheckout hook hides cart, tax, and payment modules—UI calls one API while internals can refactor without touching pages.',
    code: `function useCheckout() {
  const cart = useCart();
  const tax = useTaxQuote(cart.items);
  const pay = usePayment();
  return { total: cart.subtotal + tax, submit: pay.charge };
}`,
  },
  'Observer pattern': {
    detail:
      'Subscribe in useEffect to external stores, event buses, or media queries; return unsubscribe on cleanup to avoid leaks under Strict Mode.',
    code: `useEffect(() => {
  const off = bus.on('cart:updated', setCount);
  return off;
}, []);`,
  },
  'Strategy pattern': {
    detail:
      'Swap validation or pricing algorithms via props without branching inside the component—keeps Open/Closed principle for A/B payment providers.',
    code: `function CheckoutForm({ validate }: { validate: (v: Form) => Errors }) {
  const errors = validate(values);
  return <Form errors={errors} />;
}`,
  },
  'Portal pattern': {
    detail:
      'Render modals and tooltips into document.body so overflow:hidden ancestors do not clip them—focus trap logic still belongs in the modal component.',
    code: `return createPortal(
  <div role="dialog" aria-modal="true">{children}</div>,
  document.getElementById('modal-root')!
);`,
  },
  'Slot pattern': {
    detail:
      'Named slots via header/footer props or children composition replace boolean showHeader props—layout components stay predictable.',
    code: `function Card({ header, children, footer }: {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <article>
      {header && <header>{header}</header>}
      <div>{children}</div>
      {footer && <footer>{footer}</footer>}
    </article>
  );
}`,
  },
  'Polymorphic components': {
    detail:
      'An as prop renders Button styles on <a> or <button> while preserving correct props typing via generics—one styled primitive, many semantics.',
    code: `type Props<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

function Text<T extends React.ElementType = 'span'>({ as, ...props }: Props<T>) {
  const Comp = as ?? 'span';
  return <Comp {...props} />;
}`,
  },
  'Headless UI': {
    detail:
      'Radix and React Aria ship behavior and accessibility; you supply CSS—faster than reimplementing focus traps and aria for every design system.',
    code: `import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Content>…</Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`,
  },
  'Anti-pattern: giant components': {
    detail:
      '500-line components mix fetch, form, and layout—extract hooks and subcomponents when you need scroll to understand one responsibility.',
    code: `function CheckoutPage() {
  const checkout = useCheckout();
  return (
    <>
      <CheckoutSummary {...checkout} />
      <PaymentForm onSubmit={checkout.submit} />
    </>
  );
}`,
  },
};
