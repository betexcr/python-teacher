# Solution: Multi-step Form with Branching Logic

## Approach

Declarative step graph keyed by prior answers.

## Key concepts

- **State machine**: Transitions depend on state—ideal for branching wizards.

## Code highlights

- `{step === 'review' && <pre>{JSON.stringify(answers, null, 2)}</pre>}` — **&& render** — Only renders the element when the left side is true.
- `const [answers, setAnswers] = useState<Answers>({})` — **answers state** — `answers` is the value the UI shows. It starts at {}. `setAnswers` updates it when the user interacts. nextStep function encodes graph; UI renders step id; answers accumulate.
- `disabled={step === 'type' && !answers.type}` — **disabled** — Disabled when step === 'type' && !answers.type — UI follows state instead of manual DOM tweaks. nextStep function encodes graph; UI renders step id; answers accumulate.
- `const [step, setStep] = useState('type')` — **step state** — `step` is the value the UI shows. It starts at 'type'. `setStep` updates it when the user interacts. nextStep function encodes graph; UI renders step id; answers accumulate.
- `onClick={goNext}` — **onClick** — Runs when the user clicks this button. nextStep function encodes graph; UI renders step id; answers accumulate.

## Solution code

```tsx
import { useState } from 'react';

type Answers = { type?: 'individual' | 'business'; age?: string; size?: string };

const nextStep = (a: Answers, current: string): string | null => {
  if (current === 'type') return a.type === 'business' ? 'size' : 'age';
  if (current === 'age' || current === 'size') return 'review';
  return null;
};

export function BranchingWizard() {
  const [step, setStep] = useState('type');
  const [answers, setAnswers] = useState<Answers>({});

  const goNext = () => {
    const n = nextStep(answers, step);
    if (n) setStep(n);
  };

  return (
    <div>
      {step === 'type' && (
        <select value={answers.type ?? ''} onChange={(e) => setAnswers({ ...answers, type: e.target.value as Answers['type'] })}>
          <option value="">Select…</option>
          <option value="individual">Individual</option>
          <option value="business">Business</option>
        </select>
      )}
      {step === 'age' && (
        <input placeholder="Age band" value={answers.age ?? ''} onChange={(e) => setAnswers({ ...answers, age: e.target.value })} />
      )}
      {step === 'size' && (
        <input placeholder="Company size" value={answers.size ?? ''} onChange={(e) => setAnswers({ ...answers, size: e.target.value })} />
      )}
      {step === 'review' && <pre>{JSON.stringify(answers, null, 2)}</pre>}
      {step !== 'review' && <button onClick={goNext} disabled={step === 'type' && !answers.type}>Next</button>}
    </div>
  );
}
```

## Walkthrough

nextStep function encodes graph; UI renders step id; answers accumulate.

## Common mistakes

- Hardcoded step index (breaks on branch)
- Losing answers on back

## Stretch goals

- XState machine
- Persist partial to server
