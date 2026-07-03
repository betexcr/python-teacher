import type { ReactNode } from 'react';
import { SolutionCodeTerm } from '../components/SolutionCodeTerm';
import {
  findChallengeHighlightMatches,
  type SolutionHighlight,
} from '../lib/solutionHighlights';

/** Wrap challenge-specific solution tokens with hover tooltips. */
export function annotateSolutionCode(
  text: string,
  highlights: SolutionHighlight[],
  keyPrefix = 'sol',
): ReactNode[] {
  const matches = findChallengeHighlightMatches(text, highlights);
  if (matches.length === 0) return [text];

  const nodes: ReactNode[] = [];
  let last = 0;

  matches.forEach((match, i) => {
    if (match.start > last) {
      nodes.push(text.slice(last, match.start));
    }
    nodes.push(
      <SolutionCodeTerm
        key={`${keyPrefix}-${match.start}-${i}`}
        label={match.label}
        tip={match.tip}
      >
        {match.text}
      </SolutionCodeTerm>,
    );
    last = match.end;
  });

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes;
}
