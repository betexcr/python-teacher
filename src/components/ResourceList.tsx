import type { ChallengeResource } from '../lib/challenges';

export function ResourceList({ resources }: { resources: ChallengeResource[] }) {
  if (!resources.length) return null;

  return (
    <section className="challenge-resources" aria-labelledby="challenge-resources-heading">
      <h2 id="challenge-resources-heading">Resources</h2>
      <ul className="challenge-resource-list">
        {resources.map((r) => (
          <li key={r.url}>
            <a href={r.url} target="_blank" rel="noopener noreferrer">
              {r.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
