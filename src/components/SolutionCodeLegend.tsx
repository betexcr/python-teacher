import { findChallengeHighlightMatches, type SolutionHighlight } from '../lib/solutionHighlights';
import { SolutionCodeTerm } from './SolutionCodeTerm';

type SolutionCodeLegendProps = {
  code: string;
  highlights: SolutionHighlight[];
  /** Legend heading above term chips. */
  legendLabel?: string;
};

export function SolutionCodeLegend({
  code,
  highlights,
  legendLabel = 'In this solution',
}: SolutionCodeLegendProps) {
  const unique = new Map<string, SolutionHighlight>();
  for (const match of findChallengeHighlightMatches(code, highlights)) {
    if (!unique.has(match.label)) {
      unique.set(match.label, { match: match.text, label: match.label, tip: match.tip });
    }
  }
  const items = [...unique.values()];
  if (items.length === 0) return null;

  return (
    <div className="solution-code-terms">
      <span className="solution-code-terms-label">{legendLabel}</span>
      <ul className="solution-code-terms-list">
        {items.map((h) => (
          <li key={h.label}>
            <SolutionCodeTerm label={h.label} tip={h.tip}>
              {h.label}
            </SolutionCodeTerm>
          </li>
        ))}
      </ul>
    </div>
  );
}
