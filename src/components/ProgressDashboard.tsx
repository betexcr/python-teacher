import { Link } from 'react-router-dom';
import { useTrackProgress } from '../hooks/useTrackProgress';

export function ProgressDashboard() {
  const tracks = useTrackProgress();

  return (
    <section className="get-started-section progress-dashboard">
      <h2>Your progress</h2>
      <p className="get-started-section-intro">
        Progress is saved in this browser. Complete challenges, flashcard decks, and read guides to fill
        each bar.
      </p>
      <div className="progress-dashboard-grid">
        {tracks.map((track) => (
          <Link key={track.label} to={track.href} className="progress-dashboard-card">
            <div className="progress-dashboard-card-header">
              <h3>{track.label}</h3>
              <span className="progress-dashboard-count">
                {track.completed}/{track.total}
              </span>
            </div>
            <div className="progress-dashboard-bar" aria-hidden>
              <div
                className="progress-dashboard-bar-fill"
                style={{ width: `${track.percent}%` }}
              />
            </div>
            <p className="progress-dashboard-percent">{track.percent}% complete</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
