import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AcceptanceChecklist } from '../components/AcceptanceChecklist';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { MarkdownView } from '../components/MarkdownView';
import { ResourceList } from '../components/ResourceList';
import { useChallengeProgress } from '../hooks/useChallengeProgress';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';
import { stripInteractiveSections } from '../lib/challengeBody';
import {
  findChallenge,
  getChallengeMarkdown,
  getSolutionMarkdown,
  type Difficulty,
} from '../lib/challenges';
import {
  parseSolutionHighlights,
  stripSolutionHighlightsSection,
} from '../lib/solutionHighlights';

export function ChallengeDetailPage() {
  useRouteScrollTop();
  const { difficulty = 'easy', slug = '' } = useParams<{
    difficulty: Difficulty;
    slug: string;
  }>();
  const meta = findChallenge(difficulty, slug);
  const acceptanceCount = meta?.acceptance.length ?? 0;
  const { progress, toggleCriterion, isChecked, isComplete } = useChallengeProgress(
    difficulty,
    slug,
    acceptanceCount
  );

  const challengeMd = useMemo(
    () => stripInteractiveSections(getChallengeMarkdown(difficulty, slug)),
    [difficulty, slug]
  );
  const solutionMdRaw = useMemo(
    () => getSolutionMarkdown(difficulty, slug),
    [difficulty, slug]
  );
  const solutionHighlights = useMemo(
    () => parseSolutionHighlights(solutionMdRaw),
    [solutionMdRaw]
  );
  const solutionMd = useMemo(
    () => stripSolutionHighlightsSection(solutionMdRaw),
    [solutionMdRaw]
  );
  const [showSolution, setShowSolution] = useState(false);

  if (!meta) {
    return (
      <div className="challenge-detail">
        <p>Challenge not found.</p>
        <Link to="/challenges">Back to challenges</Link>
      </div>
    );
  }

  return (
    <div className="challenge-detail">
      <nav className="challenge-breadcrumbs">
        <Link to="/challenges">Challenges</Link>
        <span aria-hidden> / </span>
        <DifficultyBadge difficulty={difficulty} />
        <span aria-hidden> / </span>
        <span>{meta.title}</span>
      </nav>

      <header className="challenge-detail-header">
        <div className="challenge-detail-title-row">
          <h1 className="page-title">{meta.title}</h1>
          <DifficultyBadge difficulty={difficulty} className="difficulty-badge--detail" />
        </div>
        {isComplete && (
          <span className="challenge-completed-badge" aria-label="Challenge completed">
            Completed
          </span>
        )}
      </header>

      <MarkdownView source={challengeMd} />

      <AcceptanceChecklist
        criteria={meta.acceptance}
        progress={progress}
        isChecked={isChecked}
        onToggle={toggleCriterion}
        isComplete={isComplete}
      />

      <ResourceList resources={meta.resources} />

      <div className="solution-panel">
        <button
          type="button"
          className="solution-toggle"
          aria-expanded={showSolution}
          onClick={() => setShowSolution((v) => !v)}
        >
          {showSolution ? 'Hide solution' : 'Show solution & explanation'}
        </button>
        {showSolution && (
          <div className="solution-content">
            <p className="solution-code-hint">
              <span className="solution-code-term-inline-sample">Teal</span> highlights are explained for{' '}
              <strong>this challenge only</strong> — hover or focus each mark in the code.
            </p>
            <MarkdownView source={solutionMd} solutionHighlights={solutionHighlights} />
          </div>
        )}
      </div>

      <footer className="challenge-nav">
        <Link to="/challenges">← All challenges</Link>
      </footer>
    </div>
  );
}
