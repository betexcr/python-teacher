export const typescriptExtras = {
  'Typing component props': {
    detail:
      'A named Props type documents the public API and enables reuse in wrappers; default optional props in the destructuring pattern instead of defaultProps on function components.',
    code: `type CardProps = {
  title: string;
  count?: number;
};

function Card({ title, count = 0 }: CardProps) {
  return <h2>{title} ({count})</h2>;
}`,
  },
  'React.FC vs function signature': {
    detail:
      'Plain function components with explicit props types are the modern default—React.FC adds little today and historically implied children you might not want.',
    code: `function Button({ label }: { label: string }) {
  return <button type="button">{label}</button>;
}

// Rarely needed:
const Legacy: React.FC<{ label: string }> = ({ label }) => (
  <button type="button">{label}</button>
);`,
  },
  'Typing useState': {
    detail:
      'Pass a generic when the initial value is ambiguous—useState([]) infers never[] unless you write useState<string[]>([]) or useState<User | null>(null).',
    code: `const [user, setUser] = useState<User | null>(null);
const [tags, setTags] = useState<string[]>([]);
const [status, setStatus] = useState<'idle' | 'busy'>('idle');`,
  },
  'Typing events': {
    detail:
      'Use React.ChangeEvent for inputs, MouseEvent for buttons, and FormEvent for onSubmit—generic element types catch target mistakes at compile time.',
    code: `function onChange(e: React.ChangeEvent<HTMLInputElement>) {
  setName(e.currentTarget.value);
}

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
}`,
  },
  'Typing children': {
    detail:
      'React.ReactNode accepts strings, numbers, fragments, and portals; React.ReactElement is stricter when you only want a single element child.',
    code: `type PanelProps = { title: string; children: React.ReactNode };

function Panel({ title, children }: PanelProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}`,
  },
  'Generic components': {
    detail:
      'Generic list/table components preserve item type through render props—callers get autocomplete on item without casting from unknown.',
    code: `function List<T>({
  items,
  render,
}: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) {
  return <ul>{items.map((item, i) => <li key={i}>{render(item)}</li>)}</ul>;
}`,
  },
  'ComponentProps utility': {
    detail:
      'ComponentProps<typeof Button> stays in sync when the base component props change—ideal for styled wrappers that forward most props.',
    code: `type IconButtonProps = React.ComponentProps<typeof Button> & {
  icon: React.ReactNode;
};

function IconButton({ icon, children, ...props }: IconButtonProps) {
  return (
    <Button {...props}>
      {icon}
      {children}
    </Button>
  );
}`,
  },
  'Ref typing': {
    detail:
      'useRef<HTMLInputElement>(null) for DOM nodes; MutableRefObject when you assign .current yourself; RefObject when React owns updates via ref prop.',
    code: `const inputRef = useRef<HTMLInputElement>(null);

function focus() {
  inputRef.current?.focus();
}

return <input ref={inputRef} />;`,
  },
  'Discriminated unions in UI': {
    detail:
      'A status field narrows the whole object in if/switch—TypeScript knows data exists only when status is "ok", eliminating optional chaining soup.',
    code: `type LoadState =
  | { status: 'loading' }
  | { status: 'ok'; data: User[] }
  | { status: 'error'; message: string };

function Users({ state }: { state: LoadState }) {
  if (state.status === 'loading') return <Spinner />;
  if (state.status === 'error') return <p>{state.message}</p>;
  return <List users={state.data} />;
}`,
  },
  'as const': {
    detail:
      'Literal arrays and objects become readonly unions—perfect for variant props like size="sm" | "md" derived from a single source of truth.',
    code: `const sizes = ['sm', 'md', 'lg'] as const;
type Size = (typeof sizes)[number];

function Badge({ size }: { size: Size }) {
  return <span className={\`badge-\${size}\`} />;
}`,
  },
  'satisfies operator': {
    detail:
      'Validates an object against Theme (or similar) while preserving literal types for keys—better than annotating with Theme which widens literals.',
    code: `type Theme = { color: string; radius: number };

const theme = {
  color: '#863bff',
  radius: 8,
} satisfies Theme;`,
  },
  'Typing context': {
    detail:
      'Nullable context plus a throwing useAuth hook forces consumers to handle the provider boundary explicitly instead of sprinkling non-null assertions.',
    code: `const AuthContext = createContext<Auth | null>(null);

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}`,
  },
  'Ref as prop (React 19)': {
    detail:
      'Function components can accept ref in props without forwardRef—libraries supporting React 18 may still export forwardRef wrappers for compatibility.',
    code: `type InputProps = React.ComponentProps<'input'> & {
  ref?: React.Ref<HTMLInputElement>;
};

function TextInput({ ref, ...props }: InputProps) {
  return <input ref={ref} {...props} />;
}`,
  },
  'Module augmentation': {
    detail:
      'Extend third-party or asset modules in a .d.ts file so imports like *.module.css or untyped packages get proper typings project-wide.',
    code: `declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}`,
  },
  'strictNullChecks impact': {
    detail:
      'With strictNullChecks, optional props and nullable API fields must be narrowed before use—optional chaining and early returns keep render paths safe.',
    code: `function Greeting({ name }: { name?: string }) {
  if (!name) return <p>Hello, guest</p>;
  return <p>Hello, {name.toUpperCase()}</p>;
}`,
  },
};
