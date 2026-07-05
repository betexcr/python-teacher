import { useCallback, useId, useRef, useState } from 'react';
import {
  PYTHON_TERM_LABELS,
  PYTHON_TERM_TIPS,
  type PythonTermId,
} from '../data/pythonTermGlossary';

type PythonTermProps = {
  id: PythonTermId;
  /** Matched text from source (e.g. pathlib, f-string). */
  children: string;
};

const TUTORIAL_TIP_ESTIMATE_PX = 100;
const VIEWPORT_PAD_PX = 12;

export function PythonTerm({ id, children }: PythonTermProps) {
  const tipId = useId();
  const termRef = useRef<HTMLSpanElement>(null);
  const [tipPlacement, setTipPlacement] = useState<'above' | 'below'>('below');

  const syncTipPlacement = useCallback(() => {
    const el = termRef.current;
    if (!el?.closest('.js-basics-tutorial-dialog')) return;

    const rect = el.getBoundingClientRect();
    const spaceAbove = rect.top - VIEWPORT_PAD_PX;
    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_PAD_PX;

    if (spaceAbove >= TUTORIAL_TIP_ESTIMATE_PX && spaceAbove > spaceBelow) {
      setTipPlacement('above');
    } else {
      setTipPlacement('below');
    }
  }, []);

  return (
    <span
      ref={termRef}
      className={`python-term python-term--tip-${tipPlacement}`}
      onMouseEnter={syncTipPlacement}
      onFocus={syncTipPlacement}
    >
      <button
        type="button"
        className="python-term-trigger"
        aria-describedby={tipId}
        aria-label={`${PYTHON_TERM_LABELS[id]}: ${PYTHON_TERM_TIPS[id]}`}
      >
        {children}
      </button>
      <span id={tipId} role="tooltip" className="python-term-tip">
        <strong>{PYTHON_TERM_LABELS[id]}</strong>
        <span>{PYTHON_TERM_TIPS[id]}</span>
      </span>
    </span>
  );
}
