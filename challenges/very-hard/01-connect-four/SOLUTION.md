# Solution: Connect Four

## Approach

Immutable board updates; win check radiates from last placed cell.

## Key concepts

- **Last-move win check**: O(1) amortized per move instead of scanning full board.

## Code highlights

- `const [winner, setWinner] = useState<Cell | 'draw' | null>(null)` — **winner state** — `winner` is the value the UI shows. It starts at null. `setWinner` updates it when the user interacts. Drop finds lowest empty row; win scans 4 directions from last move only.
- `.map((c, ci) => (ri === r && ci === col ? player : c)` — **.map()** — Turns each item in your data into a JSX row. Drop finds lowest empty row; win scans 4 directions from last move only.
- `const [player, setPlayer] = useState<'R' | 'Y'>('R')` — **player state** — `player` is the value the UI shows. It starts at 'R'. `setPlayer` updates it when the user interacts. Drop finds lowest empty row; win scans 4 directions from last move only.
- `const [board, setBoard] = useState(createBoard)` — **board state** — `board` is the value the UI shows. It starts at createBoard. `setBoard` updates it when the user interacts. Drop finds lowest empty row; win scans 4 directions from last move only.
- `onClick={() => play(col)}` — **onClick** — Runs when the user clicks this button. Drop finds lowest empty row; win scans 4 directions from last move only.
- `key={col}` — **key** — Helps React track each list row — use a stable id (col), not the array index, when items can reorder.
- `key={r}` — **key** — Helps React track each list row — use a stable id (r), not the array index, when items can reorder.
- `key={c}` — **key** — Helps React track each list row — use a stable id (c), not the array index, when items can reorder.

## Solution code

```tsx
import { useState } from 'react';

const ROWS = 6;
const COLS = 7;
type Cell = 'R' | 'Y' | null;
type Board = Cell[][];

function createBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function drop(board: Board, col: number, player: 'R' | 'Y'): { board: Board; row: number } | null {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (!board[r][col]) {
      const next = board.map((row, ri) =>
        row.map((c, ci) => (ri === r && ci === col ? player : c))
      );
      return { board: next, row: r };
    }
  }
  return null;
}

function countDir(board: Board, r: number, c: number, dr: number, dc: number, p: Cell) {
  let n = 0;
  while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === p) {
    n++;
    r += dr;
    c += dc;
  }
  return n;
}

function checkWin(board: Board, r: number, c: number, p: Cell) {
  const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
  return dirs.some(([dr, dc]) => {
    const line =
      countDir(board, r, c, dr, dc, p) +
      countDir(board, r - dr, c - dc, -dr, -dc, p) -
      1;
    return line >= 4;
  });
}

export function ConnectFour() {
  const [board, setBoard] = useState(createBoard);
  const [player, setPlayer] = useState<'R' | 'Y'>('R');
  const [winner, setWinner] = useState<Cell | 'draw' | null>(null);

  const play = (col: number) => {
    if (winner) return;
    const res = drop(board, col, player);
    if (!res) return;
    setBoard(res.board);
    if (checkWin(res.board, res.row, col, player)) setWinner(player);
    else if (res.board.every((row) => row.every(Boolean))) setWinner('draw');
    else setPlayer((p) => (p === 'R' ? 'Y' : 'R'));
  };

  return (
    <div>
      <p>{winner ? (winner === 'draw' ? 'Draw' : `Winner: ${winner}`) : `Turn: ${player}`}</p>
      <div className="board">
        {Array.from({ length: COLS }, (_, col) => (
          <button key={col} onClick={() => play(col)} aria-label={`Column ${col + 1}`}>↓</button>
        ))}
        {board.map((row, r) => (
          <div key={r} className="row">
            {row.map((cell, c) => (
              <div key={c} className={`cell ${cell ?? ''}`} />
            ))}
          </div>
        ))}
      </div>
      <button onClick={() => { setBoard(createBoard()); setPlayer('R'); setWinner(null); }}>Reset</button>
    </div>
  );
}
```

## Walkthrough

Drop finds lowest empty row; win scans 4 directions from last move only.

## Common mistakes

- Cloning board shallowly mutating rows
- Full board scan each move unnecessarily

## Stretch goals

- Minimax AI
- Animated disc drop
