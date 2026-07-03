import type { ReactNode } from 'react';

type Span = { start: number; end: number };

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findPhraseSpans(code: string, phrases: string[]): Span[] {
  const unique = [...new Set(phrases.filter(Boolean))].toSorted((a, b) => b.length - a.length);
  if (unique.length === 0) return [];

  const spans: Span[] = [];
  const re = new RegExp(unique.map(escapeRegExp).join('|'), 'g');
  let match: RegExpExecArray | null;
  while ((match = re.exec(code)) !== null) {
    spans.push({ start: match.index, end: match.index + match[0].length });
  }
  return spans;
}

function mergeSpans(spans: Span[]): Span[] {
  if (spans.length === 0) return [];
  const sorted = spans.toSorted((a, b) => a.start - b.start || b.end - a.end);
  const merged: Span[] = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const prev = merged[merged.length - 1];
    const cur = sorted[i];
    if (cur.start <= prev.end) {
      prev.end = Math.max(prev.end, cur.end);
    } else {
      merged.push(cur);
    }
  }
  return merged;
}

/** Wrap matching phrases in <mark> for tutorial code highlights. */
export function highlightCodePhrases(
  code: string,
  phrases: string[] | undefined,
  markClassName = 'tutorial-code-mark',
): ReactNode {
  if (!phrases?.length) return code;

  const merged = mergeSpans(findPhraseSpans(code, phrases));
  if (merged.length === 0) return code;

  const nodes: ReactNode[] = [];
  let cursor = 0;
  merged.forEach((span) => {
    if (span.start > cursor) {
      nodes.push(code.slice(cursor, span.start));
    }
    nodes.push(
      <mark key={`mark-${span.start}-${span.end}`} className={markClassName}>
        {code.slice(span.start, span.end)}
      </mark>,
    );
    cursor = span.end;
  });
  if (cursor < code.length) {
    nodes.push(code.slice(cursor));
  }
  return nodes;
}
