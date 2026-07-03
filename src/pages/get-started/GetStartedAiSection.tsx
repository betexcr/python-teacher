import { Link } from 'react-router-dom';

const AI_LINKS = [
  { href: '/flashcards/llm-apps', label: 'LLM Applications flashcards' },
  { href: '/flashcards/rag', label: 'RAG flashcards' },
  { href: '/flashcards/agents', label: 'AI Agents flashcards' },
  { href: '/flashcards/mcp', label: 'MCP flashcards' },
  { href: '/system-design/rag-qa-api', label: 'RAG Q&A API system design' },
  { href: '/system-design/llm-agent-tools', label: 'LLM Agent with Tools' },
  { href: '/challenges/hard/04-rag-ingestion', label: 'RAG ingestion challenge' },
  { href: '/challenges/very-hard/01-mcp-server', label: 'MCP server challenge' },
  { href: '/challenges/very-hard/05-llm-agent-memory', label: 'LLM agent with memory' },
  { href: '/python-patterns/clean-architecture', label: 'Clean architecture pattern' },
];

export function GetStartedAiSection() {
  return (
    <section className="get-started-section">
      <h2>AI & LLM learning path</h2>
      <p className="get-started-section-intro">
        After Python fundamentals and web basics, follow this path for production AI systems — from API
        calls through RAG, agents, and MCP.
      </p>
      <ul className="get-started-pointers">
        {AI_LINKS.map((link) => (
          <li key={link.href}>
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
