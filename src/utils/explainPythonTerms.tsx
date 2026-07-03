import type { ReactNode } from 'react';
import { PythonTerm } from '../components/PythonTerm';
import { findPythonTermMatches } from '../data/pythonTermGlossary';

/** Wrap Python vocabulary in tooltip highlights for beginner-friendly definitions. */
export function explainPythonTerms(
  text: string,
  keyPrefix = 'pt',
  interactive = true,
): ReactNode[] {
  const matches = findPythonTermMatches(text);
  if (matches.length === 0) return [text];

  const nodes: ReactNode[] = [];
  let last = 0;

  matches.forEach((match, i) => {
    if (match.start > last) {
      nodes.push(text.slice(last, match.start));
    }
    if (interactive) {
      nodes.push(
        <PythonTerm key={`${keyPrefix}-${match.start}-${match.id}-${i}`} id={match.id}>
          {match.text}
        </PythonTerm>,
      );
    } else {
      nodes.push(
        <span key={`${keyPrefix}-${match.start}-${match.id}-${i}`} className="python-term-static">
          {match.text}
        </span>,
      );
    }
    last = match.end;
  });

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes;
}
