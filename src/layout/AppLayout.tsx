import { useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SITE_NAME } from '../config/brand';
import { ScrollToTop } from '../components/ScrollToTop';
import { MainScrollContext } from '../context/MainScrollContext';

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  const isSystemDesignActive =
    location.pathname === '/system-design' || location.pathname.startsWith('/system-design/');
  const isPythonPatternsActive =
    location.pathname === '/python-patterns' || location.pathname.startsWith('/python-patterns/');

  return (
    <MainScrollContext.Provider value={mainRef}>
      <div className="app-shell">
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
          <Link to="/get-started" className="sidebar-brand" aria-label={`${SITE_NAME} home`}>
            <img
              src="/mascot.png"
              alt=""
              className="sidebar-brand-mascot"
              width={36}
              height={36}
              decoding="async"
            />
            <span className="sidebar-brand-title">{SITE_NAME}</span>
          </Link>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/get-started" end className={({ isActive }) => (isActive ? 'active' : '')}>
                <span className="nav-icon" aria-hidden>
                  ✦
                </span>
                <span className="nav-label">Get Started</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/python-basics" className={({ isActive }) => (isActive ? 'active' : '')}>
                <span className="nav-icon" aria-hidden>
                  {'{ }'}
                </span>
                <span className="nav-label">Python Basics</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/challenges" className={({ isActive }) => (isActive ? 'active' : '')}>
                <span className="nav-icon" aria-hidden>
                  &lt;&gt;
                </span>
                <span className="nav-label">Python Challenges</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/flashcards" className={({ isActive }) => (isActive ? 'active' : '')}>
                <span className="nav-icon" aria-hidden>
                  🗂
                </span>
                <span className="nav-label">Flashcards</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/python-patterns" className={isPythonPatternsActive ? 'active' : ''}>
                <span className="nav-icon" aria-hidden>
                  ◈
                </span>
                <span className="nav-label">Python Patterns</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/system-design" className={isSystemDesignActive ? 'active' : ''}>
                <span className="nav-icon" aria-hidden>
                  ⎇
                </span>
                <span className="nav-label">System Design</span>
              </NavLink>
            </li>
          </ul>
          <button
            type="button"
            className="collapse-btn"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
          >
            {collapsed ? '→' : '← Collapse Menu'}
          </button>
        </aside>
        <main ref={mainRef} className="main-content">
          <ScrollToTop />
          <Outlet />
        </main>
      </div>
    </MainScrollContext.Provider>
  );
}
