# useReducer Implementation

**Difficulty:** medium  
**Topics:** useReducer

## Learning goals

- Model complex transitions
- Keep reducers pure

## Challenge

Shopping checkout flow: cart items, step (cart → shipping → payment), and discounts. All transitions via reducer.

## Requirements

1. Actions: ADD_ITEM, SET_STEP, APPLY_COUPON
2. Reducer is pure
3. useReducer with optional init

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/medium/10-use-reducer-implementation/`. Reference write-ups in this repo live under `challenges/medium/10-use-reducer-implementation/` (not loaded by the app).

```tsx
type State = { step: number; items: Item[]; coupon: string | null };
```

## Hints

1. switch(action.type)
2. Keep side effects outside reducer

## Acceptance criteria

- [ ] **All transitions via dispatch**
  Every state change should go through dispatch with a typed action, not setState scattered in components. Search your code for direct state assignment on reducer state and remove it.

- [ ] **State consistent**
  Run through add, toggle, delete, and filter flows and confirm counts and lists always match what actions imply. Reducer returns should be predictable for the same action sequence.

## Resources

- [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [useReducer – Reference](https://react.dev/reference/react/useReducer)
- [Typing useReducer (TypeScript)](https://react.dev/learn/typescript#typing-usereducer)
