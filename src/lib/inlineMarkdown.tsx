import type { ReactNode } from 'react';
import { linkifyRepoPathsInText } from './github';

function formatBoldAndCode(segment: string, keyPrefix: string) {
  const parts = segment.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    const key = `${keyPrefix}-${idx}`;
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    return <span key={key}>{part}</span>;
  });
}

/** Inline markdown: **bold**, `code`, repo paths, and [text](url) links. */
export function inlineFormat(text: string) {
  const segments = linkifyRepoPathsInText(text);
  const nodes: ReactNode[] = [];
  let key = 0;

  for (const seg of segments) {
    if (typeof seg === 'string') {
      const linkMd = /\[([^\]]+)\]\(([^)]+)\)/g;
      let last = 0;
      let match: RegExpExecArray | null;
      while ((match = linkMd.exec(seg)) !== null) {
        if (match.index > last) {
          nodes.push(...formatBoldAndCode(seg.slice(last, match.index), `t${key++}`));
        }
        nodes.push(
          <a key={`l${key++}`} href={match[2]} target="_blank" rel="noopener noreferrer">
            {match[1]}
          </a>
        );
        last = match.index + match[0].length;
      }
      if (last < seg.length) {
        nodes.push(...formatBoldAndCode(seg.slice(last), `t${key++}`));
      }
      continue;
    }

    nodes.push(
      <a
        key={`p${key++}`}
        href={seg.href}
        target="_blank"
        rel="noopener noreferrer"
        title="View on GitHub"
      >
        <code>{seg.label}</code>
      </a>
    );
  }

  return nodes;
}
