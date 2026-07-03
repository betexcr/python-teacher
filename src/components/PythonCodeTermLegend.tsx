import { collectPythonTermIds, PYTHON_TERM_LABELS } from '../data/pythonTermGlossary';
import { PythonTerm } from './PythonTerm';

type PythonCodeTermLegendProps = {
  code: string;
};

/** Lists Python terms found in a code sample with the same tooltips as prose. */
export function PythonCodeTermLegend({ code }: PythonCodeTermLegendProps) {
  const ids = collectPythonTermIds(code);
  if (ids.length === 0) return null;

  return (
    <div className="python-code-terms" aria-label="Python terms in this example">
      <span className="python-code-terms-label">Python in this snippet:</span>
      <ul className="python-code-terms-list">
        {ids.map((id) => (
          <li key={id}>
            <PythonTerm id={id}>{PYTHON_TERM_LABELS[id]}</PythonTerm>
          </li>
        ))}
      </ul>
    </div>
  );
}
