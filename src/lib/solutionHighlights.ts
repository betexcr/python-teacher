export type SolutionHighlight = {
  match: string;
  label: string;
  tip: string;
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const HIGHLIGHTS_SECTION = /## Code highlights\n([\s\S]*?)(?=\n## |\n# |$)/;

/** Parse challenge-specific tooltips generated into SOLUTION.md. */
export function parseSolutionHighlights(markdown: string): SolutionHighlight[] {
  const section = markdown.match(HIGHLIGHTS_SECTION);
  if (!section) return [];

  const highlights: SolutionHighlight[] = [];
  for (const line of section[1].split('\n')) {
    if (!line.startsWith('- ')) continue;
    const m = line.match(/^- `((?:\\`|[^`])*)` — \*\*([^*]+)\*\* — (.+)$/);
    if (!m) continue;
    highlights.push({
      match: m[1].replace(/\\`/g, '`'),
      label: m[2].trim(),
      tip: m[3].trim(),
    });
  }

  return highlights.toSorted((a, b) => b.match.length - a.match.length);
}

/** Remove the highlights section so it is not shown as prose. */
export function stripSolutionHighlightsSection(markdown: string): string {
  return markdown.replace(HIGHLIGHTS_SECTION, '').replace(/\n{3,}/g, '\n\n').trim();
}

export function findChallengeHighlightMatches(
  code: string,
  highlights: SolutionHighlight[],
): { start: number; end: number; label: string; tip: string; text: string }[] {
  const byMatch = new Map<string, SolutionHighlight>();
  for (const h of highlights) {
    if (!byMatch.has(h.match)) byMatch.set(h.match, h);
  }
  const terms = [...byMatch.keys()].toSorted((a, b) => b.length - a.length);
  if (terms.length === 0) return [];

  const matches: { start: number; end: number; label: string; tip: string; text: string }[] = [];
  const re = new RegExp(terms.map(escapeRegExp).join('|'), 'g');
  let found: RegExpExecArray | null;
  while ((found = re.exec(code)) !== null) {
    const h = byMatch.get(found[0]);
    if (!h) continue;
    matches.push({
      start: found.index,
      end: found.index + found[0].length,
      label: h.label,
      tip: h.tip,
      text: h.match,
    });
  }

  const sorted = matches.toSorted((a, b) => a.start - b.start || b.end - a.end);

  const taken: typeof matches = [];
  let cursor = 0;
  for (const match of sorted) {
    if (match.start < cursor) continue;
    taken.push(match);
    cursor = match.end;
  }

  return taken;
}
