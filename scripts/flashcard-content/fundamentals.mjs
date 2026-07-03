import { interviewCard, codeFence } from './enrich.mjs';

export const fundamentalsCards = [
  interviewCard(
    'What is React and why would you use it over other libraries or frameworks?',
    'React is a JavaScript library for building user interfaces. It uses a component-based architecture and a virtual DOM to efficiently update the UI.',
    codeFence(`function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>;
}

createRoot(document.getElementById('root')!).render(<Welcome name="Ada" />);`),
    'Teams pick React for its large ecosystem and composable view layer—you pair it with your own router, data library, and meta-framework rather than adopting one monolithic stack.'
  ),
  interviewCard(
    'What is JSX, and how does it relate to React.createElement?',
    'JSX is a syntax extension that looks like HTML embedded in JavaScript. The compiler (Babel/SWC) transforms JSX into React.createElement(type, props, ...children) calls—or the automatic JSX runtime equivalent—so React receives plain element objects.',
    codeFence(`const element = <h1 className="title">Hello</h1>;
// Compiles to: React.createElement("h1", { className: "title" }, "Hello");`),
    'A component must return one expression: a single element, Fragment (<>...</>), array, or null. Fragments group siblings without an extra DOM node. JSX is optional—you can call createElement directly.',
    'TypeScript adds typing for intrinsic elements (div, input) and your components. JSX is syntactic sugar; reconciliation still works on the element objects JSX produces.'
  ),
  interviewCard(
    'What is the virtual DOM, and why does React use it?',
    'The virtual DOM is a lightweight JavaScript representation of the UI tree. On updates, React builds a new tree, diffs it against the previous one (reconciliation), and applies the minimal set of changes to the real DOM.',
    codeFence(`function Counter() {
  const [n, setN] = useState(0);
  // You describe the whole UI; React diffs and patches the DOM
  return <button onClick={() => setN((c) => c + 1)}>{n}</button>;
}`),
    'Fiber lets React pause and resume diff work—virtual DOM is not "always faster than direct DOM"; it batches declarative updates so you avoid hand-tuning every node.'
  ),
  interviewCard(
    'What is the difference between controlled and uncontrolled components?',
    'A controlled component has its form value driven by React state: you pass value (or checked) and update via onChange/onInput. React is the single source of truth.',
    codeFence(`const [email, setEmail] = useState("");
<input value={email} onChange={(e) => setEmail(e.target.value)} />

const inputRef = useRef<HTMLInputElement>(null);
<input ref={inputRef} defaultValue="" /> // uncontrolled`),
    'An uncontrolled component stores value in the DOM; you read it via a ref when needed (e.g., on submit). Controlled inputs enable live validation and dependent UI; uncontrolled can reduce re-renders for simple forms.',
    'React Hook Form often uses refs internally for performance while still exposing validation APIs—a hybrid pattern worth mentioning when discussing form architecture.'
  ),
  interviewCard(
    'What are props in React, and how are they different from state?',
    'Props are read-only inputs passed from parent to child. They describe how a child should render or behave. Changing props in a parent triggers a child re-render.',
    codeFence(`function Parent() {
  const [count, setCount] = useState(0);
  return <Child count={count} onIncrement={() => setCount((c) => c + 1)} />;
}`),
    'State is owned by the component that declares it and can change over time via setState/useState. Props flow down; state is local unless lifted or shared via context.',
    'For objects and functions passed as props, referential equality matters for memoization—stable references (useCallback/useMemo) prevent unnecessary child renders.'
  ),
  interviewCard(
    'What is state in React, and what happens when you update it?',
    'State is mutable data a component owns. Calling the setter schedules a re-render with the new state.',
    codeFence(`const [count, setCount] = useState(0);

setCount(count + 1);
setCount((c) => c + 1); // preferred when next value depends on previous`),
    'Updates batch in events and many async cases in React 18+, so multiple setters often produce one render. Never mutate objects in place—replace with new references so React detects change.'
  ),
  interviewCard(
    'Why are keys important when rendering lists?',
    'Keys help React identify which items changed, were added, or removed across renders. Stable keys preserve component state and DOM nodes when the list reorders.',
    codeFence(`{todos.map((todo) => (
  <TodoRow key={todo.id} todo={todo} />
))}`),
    'Using array index as key can break when items are inserted, deleted, or reordered—inputs may show wrong values or animations misfire. Prefer stable IDs from your data model.',
    'Keys are hints, not global identifiers—they only need to be unique among siblings. Mention keys in the same breath as reconciliation for a complete interview answer.'
  ),
  interviewCard(
    'What does "lifting state up" mean?',
    'Move shared state to the closest common ancestor, then pass value and callbacks down as props.',
    codeFence(`function App() {
  const [celsius, setCelsius] = useState(0);
  return (
    <>
      <Thermometer value={celsius} onChange={setCelsius} />
      <FahrenheitDisplay celsius={celsius} />
    </>
  );
}`),
    'Use this before context or global stores when only a small subtree needs the same value—keeps data flow easy to follow.'
  ),
  interviewCard(
    'Explain one-way data flow in React.',
    'Data flows parent → child via props. Children communicate upward by calling functions passed as props (event handlers), not by mutating parent data.',
    codeFence(`function Parent() {
  const [text, setText] = useState('');
  return <Child value={text} onChange={setText} />;
}

function Child({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}`),
    'The child never writes to parent state directly—only invokes onChange—so you can trace every update from a single owner.'
  ),
  interviewCard(
    'What is reconciliation?',
    'Reconciliation is React\'s process of comparing the new element tree with the previous one and deciding which DOM nodes to create, update, or remove.',
    codeFence(`// Same type → update props in place
return <input value={name} onChange={onName} />;

// Different type → unmount old subtree, mount new one (state lost)
return showForm ? <Form /> : <Summary />;

// Keys tell React which list item is which after reorder
items.map((item) => <Row key={item.id} item={item} />);`),
    'Changing element type at a slot destroys internal state—stable keys preserve row state when lists reorder.'
  ),
  interviewCard(
    'What is React Strict Mode for?',
    'Strict Mode is a development-only wrapper that double-invokes renders and effects to expose impure side effects.',
    codeFence(`createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`),
    'Production builds mount once—if cleanup is missing, dev double-mount surfaces the bug before release.'
  ),
  interviewCard(
    'What is a React Fragment and when should you use it?',
    'A Fragment lets you group multiple children without adding an extra DOM node—<>...</> or <Fragment key={...}>.',
    codeFence(`return (
  <>
    <Title />
    <Content />
  </>
);`),
    'Use it when a component must return multiple siblings (table rows, list items) or to avoid wrapper divs that break layout/CSS (flex/grid).',
    'Fragments can take a key when mapping lists of groups—unlike the shorthand <> syntax, which cannot accept props.'
  ),
  interviewCard(
    'What are common patterns for conditional rendering?',
    'Early return null for guard clauses; ternary for two branches; && for simple show/hide when the left side is boolean (beware 0 rendering); switch or object maps for many states.',
    codeFence(`if (!user) return null;
return isEditing ? <Form /> : <View />;
{error && <Alert>{error}</Alert>}`),
    'Extract heavy branches into child components so hooks stay valid and trees stay readable. Co-locate loading/error/empty states with data-fetch UI.',
    'For async data, prefer explicit status enums (idle/loading/error/success) over nested ternaries—easier to test and extend.'
  ),
  interviewCard(
    'What is the difference between a React element and a component?',
    'An element is a plain object describing UI: { type, props, key }. It is immutable and cheap to create.',
    codeFence(`// Element: plain object (what JSX compiles to)
const el = { type: 'button', props: { children: 'Save' } };

// Component: function React calls during render
function SaveButton({ label }: { label: string }) {
  return <button>{label}</button>;
}

// <SaveButton label="Save" /> creates an element whose type is SaveButton
const usage = <SaveButton label="Save" />;`),
    'React calls your component function to get elements—it does not store a long-lived "instance" for function components the way class components did.'
  ),
  interviewCard(
    'Why should you avoid mutating state directly?',
    'React compares state by reference for objects and arrays—mutation keeps the same reference, so React may skip rendering.',
    codeFence(`// ❌ mutates in place
items.push(newItem);
setItems(items);

// ✓ new array reference
setItems([...items, newItem]);`),
    'The same rule applies to context values and reducer state—immutable updates keep time-travel debugging and memoization reliable.'
  ),
];
