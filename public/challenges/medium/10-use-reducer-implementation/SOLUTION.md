# Solution: useReducer Implementation

## Approach

Finite steps encoded in state; dispatch events.

## Key concepts

- **Reducer**: (state, action) => newState — predictable updates.

## Code highlights

- `const [state, dispatch] = useReducer(` — **useReducer** — `state` is updated by dispatching actions instead of many separate setters. (state, action) => newState — predictable updates.

## Solution code

```tsx
import { useReducer } from 'react';

type State = { step: 'cart' | 'shipping' | 'payment'; total: number; coupon: string | null };
type Action =
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'COUPON'; code: string }
  | { type: 'SET_TOTAL'; total: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT':
      if (state.step === 'cart') return { ...state, step: 'shipping' };
      if (state.step === 'shipping') return { ...state, step: 'payment' };
      return state;
    case 'BACK':
      if (state.step === 'payment') return { ...state, step: 'shipping' };
      if (state.step === 'shipping') return { ...state, step: 'cart' };
      return state;
    case 'COUPON':
      return { ...state, coupon: action.code };
    case 'SET_TOTAL':
      return { ...state, total: action.total };
    default:
      return state;
  }
}

export function Checkout() {
  const [state, dispatch] = useReducer(reducer, { step: 'cart', total: 0, coupon: null });
  return (
    <div>
      <p>Step: {state.step}</p>
      <button onClick={() => dispatch({ type: 'BACK' })}>Back</button>
      <button onClick={() => dispatch({ type: 'NEXT' })}>Next</button>
    </div>
  );
}
```

## Walkthrough

Reducer centralizes step transitions; UI only dispatches intentions.

## Common mistakes

- Side effects inside reducer
- Mutating state

## Stretch goals

- Redux DevTools
- Middleware logging
