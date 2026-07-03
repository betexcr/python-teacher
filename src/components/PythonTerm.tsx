import { useId } from 'react';
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

export function PythonTerm({ id, children }: PythonTermProps) {
  const tipId = useId();

  return (
    <span className="python-term">
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
