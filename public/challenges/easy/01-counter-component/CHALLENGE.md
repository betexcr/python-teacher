# Counter Component

**Difficulty:** easy  
**Topics:** useState, events

## Learning goals

- Manage numeric state with useState
- Wire button clicks to state updates

## Challenge

Build a counter that displays a number and has **Increment**, **Decrement**, and **Reset** buttons. The count must never go below zero unless you add an optional "allow negative" mode.

## Requirements

1. Display the current count prominently
2. Increment adds 1; Decrement subtracts 1
3. Reset sets count back to 0
4. Disable Decrement at 0 (default behavior)

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/easy/01-counter-component/`. Reference write-ups in this repo live under `challenges/easy/01-counter-component/` (not loaded by the app).

```tsx
export function Counter() {
  // TODO: useState for count
  return (
    <div>
      <p>Count: ???</p>
      {/* buttons */}
    </div>
  );
}
```

## Hints

1. useState(0) returns [count, setCount]
2. Use functional updates setCount(c => c + 1) when the next state depends on the previous

## Acceptance criteria

- [ ] **Count updates on each click**
  Click the increment button several times and confirm the number on screen goes up by one each time. This shows your state updates correctly when the user interacts with the app.

- [ ] **Reset works from any value**
  Set the count to a non-zero number, then press Reset and confirm it returns to zero. Reset should work no matter how high the count got.

- [ ] **Decrement disabled at 0**
  When the count is 0, the decrement button should be disabled or do nothing so the count never goes below zero. Try clicking it at 0 to confirm it cannot make the number negative.

## Resources

- [Adding Interactivity](https://react.dev/learn/adding-interactivity)
- [useState – Reference](https://react.dev/reference/react/useState)
- [Responding to Events](https://react.dev/learn/responding-to-events)
