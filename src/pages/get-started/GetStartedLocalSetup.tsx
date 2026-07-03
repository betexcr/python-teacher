import { Link } from 'react-router-dom';
import { CodeBlock } from '../../components/CodeBlock';
import { GITHUB_REPO } from '../../config/brand';

export function GetStartedLocalSetup() {
  return (
    <section className="get-started-section get-started-section--local">
      <h2>Coding challenges on your computer</h2>
      <p className="get-started-section-intro">
        The sections below are only if you want to run and edit code locally. Skip them if you are only studying
        in the browser for now.
      </p>

      <div className="get-started-install-block">
        <h3>What you need to install</h3>
        <p>Install once. Pick the notes for your operating system.</p>

        <h4 className="get-started-install-sub">Python 3.12+</h4>
        <p>
          <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">
            Download Python
          </a>{' '}
          or use <strong>uv</strong> (recommended) to manage versions and virtual environments.
        </p>
        <p className="get-started-install-note">
          <strong>Windows (terminal):</strong>
        </p>
        <CodeBlock code="winget install Python.Python.3.12 -e" />
        <p className="get-started-install-note">
          <strong>Mac (terminal):</strong>
        </p>
        <CodeBlock code="brew install python@3.12" />

        <h4 className="get-started-install-sub">uv (package manager)</h4>
        <p>
          Fast Python package and project manager.{' '}
          <a href="https://docs.astral.sh/uv/" target="_blank" rel="noopener noreferrer">
            uv docs
          </a>
        </p>
        <CodeBlock code="curl -LsSf https://astral.sh/uv/install.sh | sh" />

        <h4 className="get-started-install-sub">Cursor (recommended editor)</h4>
        <p>
          <a href="https://cursor.com/" target="_blank" rel="noopener noreferrer">
            Download Cursor
          </a>{' '}
          — includes AI Chat and Agent to help while you code.
        </p>
        <CodeBlock code="winget install Anysphere.Cursor -e" />
      </div>

      <div className="get-started-install-block">
        <h3>Create a practice project</h3>
        <p>In a folder on your machine (not inside this repo unless you cloned it):</p>
        <CodeBlock
          code={`mkdir python-practice && cd python-practice
uv init
uv add pytest requests pydantic fastapi`}
        />
        <p>
          Or clone{' '}
          <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
            python-teacher
          </a>{' '}
          and use the generated challenge folders under <code>challenges/</code>.
        </p>
      </div>

      <div className="get-started-install-block">
        <h3>Workflow for each challenge</h3>
        <ol className="get-started-steps">
          <li>
            On PythonTeacher: <Link to="/challenges">pick a challenge</Link> and read the problem here.
          </li>
          <li>
            In your editor: create the files described in the challenge (often under <code>src/</code> or{' '}
            <code>tests/</code>).
          </li>
          <li>
            Run tests: <code>uv run pytest -v</code> or <code>python -m pytest</code>.
          </li>
          <li>
            Back on PythonTeacher: check off <strong>Acceptance criteria</strong> when done (saved in this
            browser).
          </li>
        </ol>
        <p className="get-started-install-note">
          PythonTeacher in the browser is separate from your local project — use it to read requirements and
          verify your work; avoid opening solutions too early.
        </p>
      </div>
    </section>
  );
}
