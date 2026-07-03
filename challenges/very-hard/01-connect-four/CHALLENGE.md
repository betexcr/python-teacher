# Connect Four

**Difficulty:** very-hard  
**Topics:** game logic, minimax optional

## Learning goals

- Implement 7x6 board
- Win detection
- Two-player or vs AI

## Challenge

Full Connect Four: drop discs in columns, gravity fills lowest slot, detect 4 in a row (horizontal/vertical/diagonal). Optional: minimax AI opponent.

## Requirements

1. Valid move only in non-full column
2. Highlight winning cells
3. Reset game
4. Turn indicator

## Starter hint

Implement in **your own** React project (Vite, Next.js, etc.) or a sandbox—e.g. `src/practice/very-hard/01-connect-four/`. Reference write-ups in this repo live under `challenges/very-hard/01-connect-four/` (not loaded by the app).

```tsx
const ROWS = 6, COLS = 7;
```

## Hints

1. Check win from last move only in 4 directions
2. Board as 2D array or flat with index math

## Acceptance criteria

- [ ] **Win/draw detected**
  Play until four in a row and confirm the winner is announced; fill the board with no winner and confirm a draw message. Game should end in a terminal state.

- [ ] **Illegal moves prevented**
  Try dropping in a full column or clicking after game over and confirm nothing changes. Valid moves only keep game state trustworthy.

## Resources

- [Tutorial: Tic-Tac-Toe (state patterns)](https://react.dev/learn/tutorial-tic-tac-toe)
- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
