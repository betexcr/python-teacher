# Dynamic Form Fields

**Difficulty:** hard  
**Topics:** forms, arrays

## Learning goals

- Add/remove field groups
- Validate dynamically

## Challenge

Form builder: users add "field rows" choosing type (text, number, select). Each row has label + validation rules. Submit outputs JSON schema of the form.

## Requirements

1. Add/remove rows
2. Per-row type selector changes control
3. Validate all rows on submit

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/hard/04-dynamic-form-fields/`. Reference write-ups in this repo live under `challenges/hard/04-dynamic-form-fields/` (not loaded by the app).

```tsx
type FieldRow = { id: string; type: 'text' | 'number' | 'select'; label: string; options?: string };
```

## Hints

1. useFieldArray pattern with map
2. validate(rows) returns errors keyed by id

## Acceptance criteria

- [ ] **Dynamic types render correct input**
  Add fields of type text, number, checkbox, or select from your schema and confirm each renders the right HTML control and label. Type in config should drive which component mounts.

- [ ] **Submit blocked if invalid**
  Leave required dynamic fields empty or invalid and confirm submit is blocked with errors. Validation rules should apply per field type, not only on static fields.

## Resources

- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [Forms – React DOM](https://react.dev/reference/react-dom/components/form)
