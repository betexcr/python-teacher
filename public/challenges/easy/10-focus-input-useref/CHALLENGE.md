# Focus an Input with useRef

**Difficulty:** easy  
**Topics:** useRef, DOM

## Learning goals

- Access DOM nodes imperatively
- Focus inputs programmatically

## Challenge

Login form: autofocus email on mount; "Forgot password?" focuses email; successful validation focuses password field.

## Requirements

1. useRef<HTMLInputElement>(null)
2. Call .focus() in handlers or useEffect
3. Do not store DOM in useState

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/10-focus-input-useref/`. Reference write-ups in this repo live under `challenges/easy/10-focus-input-useref/` (not loaded by the app).

```tsx
const emailRef = useRef<HTMLInputElement>(null);
```

## Hints

1. ref={emailRef} on input
2. Optional: useEffect(() => emailRef.current?.focus(), [])

## Acceptance criteria

- [ ] **Mount focus works**
  When the page first loads, the intended input should already have focus (cursor blinking inside it). useRef lets you call focus on the real DOM node after mount.

- [ ] **Button focuses correct field**
  Click a "focus name" or "focus email" button and confirm the matching field receives focus, not the other one. Each button should target the ref you wired to that input.

## Resources

- [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)
- [useRef – Reference](https://react.dev/reference/react/useRef)
- [Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
