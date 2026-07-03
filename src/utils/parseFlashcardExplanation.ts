export type ExplanationBlock =
  | { key: string; type: 'paragraph'; text: string }
  | { key: string; type: 'code'; code: string };

const FENCE_RE = /```(?:\w+)?\n([\s\S]*?)```/g;

function pushParagraphs(blocks: ExplanationBlock[], text: string, keyPrefix: string) {
  for (const para of text.split(/\n\n+/).filter((p) => p.trim())) {
    const trimmed = para.trim();
    blocks.push({
      key: `${keyPrefix}-p-${trimmed.slice(0, 48)}-${blocks.length}`,
      type: 'paragraph',
      text: trimmed,
    });
  }
}

/** Split flashcard explanation text into prose paragraphs and fenced code blocks. */
export function parseFlashcardExplanation(text: string): ExplanationBlock[] {
  const blocks: ExplanationBlock[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(FENCE_RE)) {
    const index = match.index ?? 0;
    pushParagraphs(blocks, text.slice(lastIndex, index), `pre-${index}`);
    const code = match[1].trimEnd();
    blocks.push({
      key: `code-${index}-${code.slice(0, 48)}-${code.length}`,
      type: 'code',
      code,
    });
    lastIndex = index + match[0].length;
  }

  pushParagraphs(blocks, text.slice(lastIndex), `tail-${lastIndex}`);
  return blocks;
}
