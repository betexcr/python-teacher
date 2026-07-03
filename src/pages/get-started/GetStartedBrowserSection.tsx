import { Link } from 'react-router-dom';

export function GetStartedBrowserSection() {
  return (
    <section className="get-started-section">
      <h2>Using PythonTeacher in the browser</h2>
      <ol className="get-started-steps">
        <li>
          Use the sidebar: <Link to="/python-basics">Python Basics</Link>,{' '}
          <Link to="/challenges">Python Challenges</Link>,{' '}
          <Link to="/flashcards">Flashcards</Link>, <Link to="/python-patterns">Python Patterns</Link>,{' '}
          <Link to="/system-design">System Design</Link>.
        </li>
        <li>
          For challenges: read the problem and acceptance criteria here. Check off criteria as you finish
          (saved in this browser). Open the solution only when stuck.
        </li>
        <li>
          For flashcards: study questions and explanations; mark cards complete or filter to uncompleted only.
        </li>
      </ol>
    </section>
  );
}
