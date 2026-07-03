# Form Validation

**Difficulty:** medium  
**Topics:** forms, validation

## Learning goals

- Validate on blur and submit
- Show field-level errors

## Challenge

Registration form: username (3+ chars), email, password (8+ with number), confirm password match. Disable submit until valid.

## Requirements

1. Touched state per field
2. Errors only after blur or submit
3. Confirm password match rule

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/05-form-validation/`. Reference write-ups in this repo live under `challenges/medium/05-form-validation/` (not loaded by the app).

```tsx
type Errors = Partial<Record<'username' | 'email' | 'password' | 'confirm', string>>;
```

## Hints

1. validate(values) returns errors object
2. onBlur sets touched[field]=true

## Acceptance criteria

- [ ] **Errors accurate**
  Submit or blur fields with bad values and confirm each error message matches the rule (required, min length, email format, etc.). Errors should appear next to the right field.

- [ ] **Submit blocked when invalid**
  Try submitting with errors present and confirm the form does not call onSuccess or reset valid-looking data. Invalid forms should stay on screen until fixed.

## Resources

- [Forms – React DOM](https://react.dev/reference/react-dom/components/form)
- [Controlled inputs](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
- [Managing State](https://react.dev/learn/managing-state)
