/** Build interview-style question + multi-paragraph explanation from a topic seed. */
export function interviewCard(question, ...paragraphs) {
  return {
    question,
    explanation: paragraphs.filter(Boolean).join('\n\n'),
  };
}

/** Fenced Python block for study UI. */
export function codeFence(code, lang = 'python') {
  return '```' + lang + '\n' + code.trim() + '\n```';
}

function formatQuestion(front) {
  const trimmed = front.trim();
  if (trimmed.endsWith('?')) return trimmed;
  if (trimmed.endsWith('.')) return trimmed.slice(0, -1) + '?';
  return `What is ${trimmed}?`;
}

/** Turn { front, back, code?, detail? } seeds into study cards. */
export function enrichCard(_deckTitle, _deckId, front, back, cardFields = {}) {
  const question = formatQuestion(front);

  if (back.includes('```')) {
    const detail = cardFields.detail?.trim();
    const parts = [back.trim(), detail].filter(Boolean);
    return interviewCard(question, ...parts);
  }

  const code = cardFields.code?.trim() ?? null;
  const detail = cardFields.detail?.trim() ?? null;
  const parts = [back.trim(), code ? codeFence(code) : null, detail].filter(Boolean);
  return interviewCard(question, ...parts);
}
