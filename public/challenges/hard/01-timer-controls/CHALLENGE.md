# Timer Controls

**Difficulty:** hard  
**Topics:** useReducer, effects, refs

## Learning goals

- Pause/resume/reset timer
- Accurate elapsed time with drift handling

## Challenge

Build a stopwatch with start, pause, reset, and lap recording. Elapsed time must stay accurate when pausing (do not keep interval running while paused).

## Requirements

1. Lap list with timestamps
2. Pause freezes elapsed
3. Reset clears laps
4. Display mm:ss.cs

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/hard/01-timer-controls/`. Reference write-ups in this repo live under `challenges/hard/01-timer-controls/` (not loaded by the app).

```tsx
type State = { running: boolean; elapsed: number; laps: number[] };
```

## Hints

1. Store startTimestamp and accumulated offset
2. requestAnimationFrame or 10ms interval only when running

## Acceptance criteria

- [ ] **Pause accurate**
  Run the timer, pause, wait several seconds, resume, and confirm elapsed time does not include the paused interval. Pause should stop counting without resetting unless reset is pressed.

- [ ] **Laps recorded**
  Record multiple laps while running and confirm each lap time and total elapsed list correctly. Laps are snapshots of elapsed time at the moment you tap lap.

- [ ] **Reset works**
  After running and adding laps, reset should clear elapsed time and lap list back to the starting state. Reset must stop any running interval too.

## Resources

- [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [useReducer – Reference](https://react.dev/reference/react/useReducer)
- [useRef – Reference](https://react.dev/reference/react/useRef)
