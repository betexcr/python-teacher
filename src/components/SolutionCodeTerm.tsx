import { useId } from 'react';

type SolutionCodeTermProps = {
  label: string;
  tip: string;
  children: string;
};

export function SolutionCodeTerm({ label, tip, children }: SolutionCodeTermProps) {
  const tipId = useId();

  return (
    <span className="solution-code-term">
      <button
        type="button"
        className="solution-code-term-trigger"
        aria-describedby={tipId}
        aria-label={`${label}: ${tip}`}
      >
        {children}
      </button>
      <span id={tipId} role="tooltip" className="solution-code-term-tip">
        <strong>{label}</strong>
        <span>{tip}</span>
      </span>
    </span>
  );
}
