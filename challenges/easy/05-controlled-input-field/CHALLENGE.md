# Controlled Input Field

**Difficulty:** easy  
**Topics:** controlled components, forms

## Learning goals

- Bind input value to React state
- Handle onChange correctly

## Challenge

Create a profile form with controlled inputs: name, email, and bio (textarea). Show a live preview card as the user types. Include basic validation messages.

## Requirements

1. All fields controlled (value + onChange)
2. Email shows error if missing @
3. Submit logs JSON (preventDefault)

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/05-controlled-input-field/`. Reference write-ups in this repo live under `challenges/easy/05-controlled-input-field/` (not loaded by the app).

```tsx
export function ProfileForm() {
  // name, email, bio state
  return <form onSubmit={...}>...</form>;
}
```

## Hints

1. value={state} onChange={e => setState(e.target.value)}
2. textarea uses same pattern as input

## Acceptance criteria

- [ ] **Preview mirrors inputs**
  Type in the form fields and confirm the live preview updates as you type with the same text. In a controlled input, React state is the single source of truth for what appears on screen.

- [ ] **Validation visible**
  Enter invalid data (for example too short a name or a bad email) and confirm error messages appear near the fields. Users need clear feedback before they can fix mistakes.

- [ ] **Submit prevented default**
  Submit the form with invalid data and confirm the page does not reload and errors stay visible. Call preventDefault on submit so React can handle validation instead of the browser refreshing.

## Resources

- [Controlled inputs](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
- [Textarea & select (controlled)](https://react.dev/reference/react-dom/components/textarea)
- [Forms – React DOM](https://react.dev/reference/react-dom/components/form)
