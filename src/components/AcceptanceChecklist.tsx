import type { ChallengeProgress } from '../hooks/useChallengeProgress';
import type { AcceptanceCriterion } from '../lib/challenges';

type Props = {
  criteria: AcceptanceCriterion[];
  progress: ChallengeProgress;
  isChecked: (index: number) => boolean;
  onToggle: (index: number) => void;
  isComplete: boolean;
};

export function AcceptanceChecklist({
  criteria,
  progress,
  isChecked,
  onToggle,
  isComplete,
}: Props) {
  if (!criteria.length) return null;

  const doneCount = progress.checked.length;

  return (
    <section className="challenge-acceptance" aria-labelledby="challenge-acceptance-heading">
      <div className="challenge-acceptance-header">
        <h2 id="challenge-acceptance-heading">Acceptance criteria</h2>
        {isComplete && (
          <span className="challenge-completed-badge" aria-label="Challenge completed">
            Completed
          </span>
        )}
      </div>
      <p className="challenge-acceptance-intro">
        Check each box when your app behaves as described. The notes explain what to look for.
      </p>
      <p className="challenge-acceptance-progress" aria-live="polite">
        {doneCount}/{criteria.length} complete
      </p>
      <ul className="challenge-acceptance-list">
        {criteria.map((criterion, index) => (
          <li key={`${criterion.summary}-${criterion.detail}`}>
            <label className="challenge-acceptance-item">
              <input
                type="checkbox"
                checked={isChecked(index)}
                onChange={() => onToggle(index)}
              />
              <span className="challenge-acceptance-text">
                <span className="challenge-acceptance-summary">{criterion.summary}</span>
                {criterion.detail ? (
                  <span className="challenge-acceptance-detail">{criterion.detail}</span>
                ) : null}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
