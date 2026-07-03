import { DIFFICULTY_LABELS, type Difficulty } from '../lib/challenges';

type DifficultyBadgeProps = {
  difficulty: Difficulty;
  className?: string;
};

export function DifficultyBadge({ difficulty, className = '' }: DifficultyBadgeProps) {
  const classes = ['difficulty-badge', `difficulty-badge--${difficulty}`, className]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{DIFFICULTY_LABELS[difficulty]}</span>;
}
