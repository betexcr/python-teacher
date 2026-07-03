import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '../components/CodeBlock';
import { PythonBasicsTutorial } from '../components/PythonBasicsTutorial';
import { PythonCodeTermLegend } from '../components/PythonCodeTermLegend';
import {
  pythonBasicsOptionalTopics,
  pythonBasicsTopics,
  PYTHON_BASICS_TOPIC_COUNT,
  type PythonBasicsTopic,
} from '../data/pythonBasicsTopics';
import { pythonBasicsTutorialSteps, tutorialTargetId } from '../data/pythonBasicsTutorialSteps';
import { useRouteScrollTop } from '../hooks/useRouteScrollTop';
import { useTutorialPersistence } from '../hooks/useTutorialPersistence';
import { formatPythonBasicsProse } from '../utils/formatPythonBasicsProse';

type TopicListProps = {
  topics: readonly PythonBasicsTopic[];
  startNumber: number;
  idPrefix: string;
  activeTargetId: string | null;
  activeTopicIndex: number | undefined;
  codeHighlights: string[] | undefined;
};

function PythonBasicsTopicList({
  topics,
  startNumber,
  idPrefix,
  activeTargetId,
  activeTopicIndex,
  codeHighlights,
}: TopicListProps) {
  return (
    <ol className="js-basics-list">
      {topics.map((topic, i) => {
        const topicTarget = `${idPrefix}-topic-${i}`;
        const isTopicActive =
          activeTargetId === topicTarget ||
          activeTargetId?.startsWith(`${idPrefix}-topic-${i}-`);

        return (
          <li
            key={topic.title}
            className={`js-basics-item${isTopicActive ? ' js-basics-item--tutorial-active' : ''}`}
            data-tutorial-target={topicTarget}
          >
            <h2 className="js-basics-item-title">
              <span className="js-basics-num">{startNumber + i}</span>
              {topic.title}
            </h2>
            {topic.explanation.map((paragraph, pi) => {
              const proseTarget = `${idPrefix}-topic-${i}-prose-${pi}`;
              const isProseActive = activeTargetId === proseTarget;
              return (
                <p
                  key={pi}
                  className={`js-basics-why${isProseActive ? ' js-basics-why--tutorial-active' : ''}`}
                  data-tutorial-target={proseTarget}
                >
                  {formatPythonBasicsProse(paragraph, `${idPrefix}-${topic.title}-${pi}`)}
                </p>
              );
            })}
            <div data-tutorial-target={`${idPrefix}-topic-${i}-code`}>
              <CodeBlock
                code={topic.code}
                highlightPhrases={activeTopicIndex === i ? codeHighlights : undefined}
              />
            </div>
            <div data-tutorial-target={`${idPrefix}-topic-${i}-legend`}>
              <PythonCodeTermLegend code={topic.code} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function PythonBasicsPage() {
  useRouteScrollTop();
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const { stepIndex: tutorialStepIndex, setStepIndex: setTutorialStepIndex } = useTutorialPersistence();

  const activeStep = tutorialOpen ? pythonBasicsTutorialSteps[tutorialStepIndex] : null;
  const activeTargetId = activeStep ? tutorialTargetId(activeStep) : null;
  const codeHighlights = activeStep?.codeHighlights;
  const activeTopicIndex = activeStep?.topicIndex;

  const openTutorial = () => {
    document.body.classList.add('js-basics-tutorial-open');
    setTutorialStepIndex(0);
    setTutorialOpen(true);
  };

  const closeTutorial = () => {
    document.body.classList.remove('js-basics-tutorial-open');
    setTutorialOpen(false);
  };

  return (
    <article className="get-started js-basics">
      <header className="get-started-hero" data-tutorial-target="python-basics-welcome">
        <h1 className="page-title">Python Basics</h1>
        <p className="get-started-lead">
          Start at the top if you have <strong>never written Python</strong> — running scripts, variables,
          types, <code>if</code>/<code>for</code>/<code>while</code>, lists and dicts, functions, venv, files,
          and exceptions. Terms highlighted in{' '}
          <span className="python-term-inline-sample">green</span> are Python ecosystem vocabulary (hover for
          definitions). Inline <code>code</code> in the text matches the examples below.
        </p>
        <div className="js-basics-hero-actions">
          <button type="button" className="js-basics-tutorial-launch" onClick={openTutorial}>
            <span className="js-basics-tutorial-launch-icon" aria-hidden>
              ▶
            </span>
            Start guided tutorial
          </button>
          <p className="get-started-path-cta js-basics-hero-cta">
            <Link to="/challenges">Browse easy challenges →</Link>
          </p>
        </div>
      </header>

      <PythonBasicsTopicList
        topics={pythonBasicsTopics}
        startNumber={1}
        idPrefix="python-basics"
        activeTargetId={activeTargetId}
        activeTopicIndex={activeTopicIndex}
        codeHighlights={codeHighlights}
      />

      <section className="get-started-section js-basics-skip" data-tutorial-target="python-basics-finish">
        <h2>What you can skip for now</h2>
        <p className="get-started-section-intro">
          The topics below are <strong>not required</strong> for easy Python challenges. Learn the{' '}
          {PYTHON_BASICS_TOPIC_COUNT} core topics in the list above first — then come back for classes and
          advanced type hints when you want more depth.
        </p>
      </section>

      <section className="js-basics-optional">
        <h2 className="js-basics-optional-heading">Optional depth</h2>
        <p className="js-basics-optional-intro">
          Classes, dunder methods, dataclasses, and typing Protocols — explained simply if you choose to study
          them now.
        </p>
        <PythonBasicsTopicList
          topics={pythonBasicsOptionalTopics}
          startNumber={pythonBasicsTopics.length + 1}
          idPrefix="python-basics-opt"
          activeTargetId={activeTargetId}
          activeTopicIndex={undefined}
          codeHighlights={undefined}
        />
      </section>

      <section className="get-started-section get-started-section--compact">
        <p className="get-started-path-cta">
          Ready? <Link to="/challenges">Start with easy challenges</Link> or read{' '}
          <Link to="/get-started">Get Started</Link> for local setup.
        </p>
      </section>

      <PythonBasicsTutorial
        open={tutorialOpen}
        stepIndex={tutorialStepIndex}
        setStepIndex={setTutorialStepIndex}
        onClose={closeTutorial}
      />
    </article>
  );
}
