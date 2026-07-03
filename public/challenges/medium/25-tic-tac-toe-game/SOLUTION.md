# Solution: Build a Tic-Tac-Toe Game

## Approach

Board as array; map clicks to new board copies; calculateWinner pure function.

## Key concepts

- **Immutable board**: Enables undo/history by storing past boards.

## Code highlights

- `const [history, setHistory] = useState<(string | null)[][]>([Array(9)` — **history state** — `history` is the value the UI shows. It starts at [Array(9. `setHistory` updates it when the user interacts. History stack stores boards; step indexes into history for time travel.
- `[...history.slice(0, step + 1), next]` — **spread copy** — Copies the old collection then changes it — React sees a new reference and re-renders.
- `const [step, setStep] = useState(0)` — **step state** — `step` is the value the UI shows. It starts at 0. `setStep` updates it when the user interacts. History stack stores boards; step indexes into history for time travel.
- `onClick={() => setStep(i)}` — **click handler** — Updates state (). History stack stores boards; step indexes into history for time travel.
- `onClick={() => play(i)}` — **onClick** — Runs when the user clicks this button. History stack stores boards; step indexes into history for time travel.
- `key={i}` — **key** — Helps React track each list row — use a stable id (i), not the array index, when items can reorder.

## Solution code

```tsx
function calculateWinner(squares: (string | null)[]) {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
  }
  return null;
}

export function TicTacToe() {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const squares = history[step];
  const xIsNext = step % 2 === 0;
  const winner = calculateWinner(squares);

  const play = (i: number) => {
    if (squares[i] || winner) return;
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setHistory([...history.slice(0, step + 1), next]);
    setStep(step + 1);
  };

  return (
    <div>
      <p>{winner ? `Winner: ${winner}` : `Next: ${xIsNext ? 'X' : 'O'}`}</p>
      <div className="board">
        {squares.map((sq, i) => (
          <button key={i} onClick={() => play(i)}>{sq}</button>
        ))}
      </div>
      <ol>{history.map((_, i) => (
        <li key={i}><button onClick={() => setStep(i)}>Go to move {i}</button></li>
      ))}</ol>
    </div>
  );
}
```

## Walkthrough

History stack stores boards; step indexes into history for time travel.

## Common mistakes

- Mutating squares array
- Allowing moves after winner

## Stretch goals

- AI opponent minimax
- Animated moves
