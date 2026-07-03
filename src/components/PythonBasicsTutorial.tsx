import {
  useCallback,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { createPortal } from 'react-dom';
import { PYTHON_BASICS_TOPIC_COUNT } from '../data/pythonBasicsTopics';
import { pythonBasicsTutorialSteps, tutorialTargetId } from '../data/pythonBasicsTutorialSteps';
import { useMainScrollRef } from '../context/MainScrollContext';
import { formatPythonBasicsProse } from '../utils/formatPythonBasicsProse';

type SpotlightRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type PythonBasicsTutorialProps = {
  open: boolean;
  stepIndex: number;
  setStepIndex: Dispatch<SetStateAction<number>>;
  onClose: () => void;
};

const TOTAL = pythonBasicsTutorialSteps.length;

export function PythonBasicsTutorial({ open, stepIndex, setStepIndex, onClose }: PythonBasicsTutorialProps) {
  const mainRef = useMainScrollRef();
  const [spotlight, setSpotlight] = useState<SpotlightRect | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const step = pythonBasicsTutorialSteps[stepIndex];

  const measureSpotlight = useCallback(() => {
    const id = tutorialTargetId(step);
    const el = document.querySelector(`[data-tutorial-target="${id}"]`);
    if (!el) {
      setSpotlight(null);
      return;
    }
    const pad = 10;
    const r = el.getBoundingClientRect();
    setSpotlight({
      top: Math.max(8, r.top - pad),
      left: Math.max(8, r.left - pad),
      width: r.width + pad * 2,
      height: r.height + pad * 2,
    });
  }, [step]);

  const onMeasureSpotlight = useEffectEvent(measureSpotlight);

  useLayoutEffect(() => {
    if (!open) return;

    const id = tutorialTargetId(step);
    const el = document.querySelector(`[data-tutorial-target="${id}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

    measureSpotlight();
    const t1 = window.setTimeout(measureSpotlight, 120);
    const t2 = window.setTimeout(measureSpotlight, 450);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [open, stepIndex, step, measureSpotlight]);

  useEffect(() => {
    if (!open) return;

    const onResize = () => onMeasureSpotlight();
    window.addEventListener('resize', onResize);
    const scroller = mainRef?.current;
    scroller?.addEventListener('scroll', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      scroller?.removeEventListener('scroll', onResize);
    };
  }, [open, mainRef]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (stepIndex < TOTAL - 1) {
          e.preventDefault();
          setStepIndex((i) => i + 1);
        }
        return;
      }
      if (e.key === 'ArrowLeft') {
        if (stepIndex > 0) {
          e.preventDefault();
          setStepIndex((i) => i - 1);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, stepIndex, setStepIndex]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    }
  }, [open]);

  const goNext = () => {
    if (stepIndex < TOTAL - 1) setStepIndex((i) => i + 1);
    else onClose();
  };

  const goPrev = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  if (!open) return null;

  const spotlightStyle: CSSProperties | undefined = spotlight
    ? {
        top: spotlight.top,
        left: spotlight.left,
        width: spotlight.width,
        height: spotlight.height,
      }
    : undefined;

  const topicLabel =
    step.topicIndex != null
      ? `Lesson ${step.topicIndex + 1} of ${PYTHON_BASICS_TOPIC_COUNT}`
      : step.focus === 'welcome'
        ? 'Intro'
        : 'Done';

  return createPortal(
    <div className="js-basics-tutorial-root" aria-hidden={false}>
      <div className="js-basics-tutorial-backdrop" onClick={onClose} aria-hidden />

      {spotlight && (
        <div className="js-basics-tutorial-spotlight" style={spotlightStyle} aria-hidden />
      )}

      <dialog
        ref={dialogRef}
        className="js-basics-tutorial-dialog"
        aria-labelledby="python-basics-tutorial-title"
        aria-describedby="python-basics-tutorial-body"
        onClose={onClose}
      >
        <div className="js-basics-tutorial-progress" aria-hidden>
          <div
            className="js-basics-tutorial-progress-fill"
            style={{ width: `${((stepIndex + 1) / TOTAL) * 100}%` }}
          />
        </div>

        <p className="js-basics-tutorial-step-label">
          Step {stepIndex + 1} of {TOTAL} · {topicLabel}
        </p>

        <h2 id="python-basics-tutorial-title" className="js-basics-tutorial-title">
          {step.title}
        </h2>

        <p id="python-basics-tutorial-body" className="js-basics-tutorial-body">
          {formatPythonBasicsProse(step.body, `tutorial-${step.id}`, { interactiveTerms: false })}
        </p>

        {step.tip && (
          <p className="js-basics-tutorial-tip">
            <span className="js-basics-tutorial-tip-label">Tip</span>
            {formatPythonBasicsProse(step.tip, `tutorial-tip-${step.id}`, { interactiveTerms: false })}
          </p>
        )}

        <div className="js-basics-tutorial-actions">
          <button
            type="button"
            className="js-basics-tutorial-btn js-basics-tutorial-btn--ghost"
            onClick={onClose}
          >
            Exit
          </button>
          <div className="js-basics-tutorial-actions-main">
            <button
              type="button"
              className="js-basics-tutorial-btn js-basics-tutorial-btn--ghost"
              onClick={goPrev}
              disabled={stepIndex === 0}
            >
              Back
            </button>
            <button
              type="button"
              className="js-basics-tutorial-btn js-basics-tutorial-btn--primary"
              onClick={goNext}
            >
              {stepIndex < TOTAL - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>

        <p className="js-basics-tutorial-hint">Arrow keys · Enter for next · Esc to exit</p>
      </dialog>
    </div>,
    document.body,
  );
}
