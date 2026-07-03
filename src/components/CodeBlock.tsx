import { useCallback, useRef, useState } from 'react';
import { highlightCodePhrases } from '../utils/highlightCodePhrases';

type CodeBlockProps = {
  /** Raw text to display and copy (trimmed for copy, preserved for display). */
  code: string;
  className?: string;
  /** Substrings to pulse-highlight (e.g. guided tutorial). */
  highlightPhrases?: string[];
};

export function CodeBlock({ code, className = '', highlightPhrases }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const text = code.trimEnd();

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <div className={`code-block ${className}`.trim()}>
      <button
        type="button"
        className="code-block-copy"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy code'}
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? (
          <span className="code-block-copy-feedback" aria-hidden>
            ✓
          </span>
        ) : (
          <svg
            className="code-block-copy-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
        <span className="code-block-copy-label">{copied ? 'Copied!' : 'Copy'}</span>
      </button>
      <pre className={`code-block-pre${highlightPhrases?.length ? ' code-block-pre--highlighted' : ''}`}>
        <code>{highlightCodePhrases(text, highlightPhrases)}</code>
      </pre>
    </div>
  );
}
