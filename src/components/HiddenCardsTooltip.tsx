import { useCallback, useEffect, useId, useRef, useState } from 'react';

function previewQuestion(text: string, maxLength = 72): string {
  const oneLine = text.replace(/\s+/g, ' ').trim();
  if (oneLine.length <= maxLength) return oneLine;
  return `${oneLine.slice(0, maxLength - 1)}…`;
}

type HiddenCardsTooltipProps = {
  count: number;
  items: { index: number; question: string }[];
  onUncomplete: (cardIndex: number) => void;
  onUncompleteAll?: () => void;
};

export function HiddenCardsTooltip({
  count,
  items,
  onUncomplete,
  onUncompleteAll,
}: HiddenCardsTooltipProps) {
  const tooltipId = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), 120);
  }, [clearCloseTimer]);

  const show = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const handleUncomplete = (cardIndex: number) => {
    onUncomplete(cardIndex);
    if (items.length <= 1) setOpen(false);
  };

  const handleUncompleteAll = () => {
    onUncompleteAll?.();
    setOpen(false);
  };

  return (
    <span
      ref={rootRef}
      className="flashcard-hidden-tooltip"
      data-open={open || undefined}
      onMouseEnter={show}
      onMouseLeave={scheduleClose}
      onFocus={show}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) scheduleClose();
      }}
    >
      <button
        type="button"
        className="flashcard-hidden-tooltip-trigger"
        aria-expanded={open}
        aria-controls={tooltipId}
        aria-label={`${count} completed cards hidden. Hover or focus to see list.`}
      >
        {count} completed hidden
      </button>
      <span
        id={tooltipId}
        role="tooltip"
        className="flashcard-hidden-tooltip-popup"
        onMouseEnter={show}
        onMouseLeave={scheduleClose}
      >
        <div className="flashcard-hidden-tooltip-header">
          <span className="flashcard-hidden-tooltip-heading">Hidden completed cards</span>
          {onUncompleteAll && items.length > 1 && (
            <button
              type="button"
              className="flashcard-hidden-tooltip-uncomplete-all"
              onClick={handleUncompleteAll}
            >
              Uncomplete all
            </button>
          )}
        </div>
        <ul className="flashcard-hidden-tooltip-list">
          {items.map((item) => (
            <li key={item.index}>
              <div className="flashcard-hidden-tooltip-item-text">
                <span className="flashcard-hidden-tooltip-num">#{item.index + 1}</span>
                <span className="flashcard-hidden-tooltip-preview">
                  {previewQuestion(item.question)}
                </span>
              </div>
              <button
                type="button"
                className="flashcard-hidden-tooltip-uncomplete"
                onClick={() => handleUncomplete(item.index)}
              >
                Uncomplete
              </button>
            </li>
          ))}
        </ul>
      </span>
    </span>
  );
}
