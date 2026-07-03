import type { ReactNode } from 'react';
import { explainPythonTerms } from './explainPythonTerms';

/** Renders Python Basics prose: `backticks` → inline code, Python terms → tooltips. */
export function formatPythonBasicsProse(
  text: string,
  keyPrefix = 'p',
  options?: { interactiveTerms?: boolean },
): ReactNode[] {
  const interactiveTerms = options?.interactiveTerms ?? true;
  const parts = text.split('`');
  if (parts.length === 1) {
    return explainPythonTerms(text, keyPrefix, interactiveTerms);
  }

  const nodes: ReactNode[] = [];
  let codeIndex = 0;
  let proseIndex = 0;

  parts.forEach((part, i) => {
    if (!part) return;

    if (i % 2 === 1) {
      nodes.push(<code key={`${keyPrefix}-code-${codeIndex++}`}>{part}</code>);
      return;
    }

    nodes.push(
      ...explainPythonTerms(part, `${keyPrefix}-prose-${proseIndex++}`, interactiveTerms),
    );
  });

  return nodes.length > 0 ? nodes : [text];
}
