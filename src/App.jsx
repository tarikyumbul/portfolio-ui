import { useState, useEffect, useCallback } from 'react';
import { usePortfolio } from './hooks/usePortfolio';

import BootScreen     from './components/BootScreen';
import PipClock       from './components/PipClock';

import AboutPage      from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage     from './pages/SkillsPage';
import EducationPage  from './pages/EducationPage';
import ProjectsPage   from './pages/ProjectsPage';

import './index.css';

// ── Tab definitions ────────────────────────────────────────
const TABS = [
  { id: 'about',      label: 'ABOUT',      key: '1', icon: '◈' },
  { id: 'experience', label: 'EXP',        key: '2', icon: '◆' },
  { id: 'skills',     label: 'SKILLS',     key: '3', icon: '◉' },
  { id: 'education',  label: 'EDU',        key: '4', icon: '◇' },
  { id: 'projects',   label: 'PROJECTS',   key: '5', icon: '◎' },
];

export default function App() {
  const [booted,      setBooted]      = useState(false);
  const [activeTab,   setActiveTab]   = useState('about');
  const { portfolio, loading, error } = usePortfolio();

  // ── Keyboard navigation — Pip-Boy controls ───────────────
  const handleKeyDown = useCallback((e) => {
    const currentIdx = TABS.findIndex(t => t.id === activeTab);

    // Number keys 1-5 → jump to tab
    const numKey = Number.parseInt(e.key);
    if (numKey >= 1 && numKey <= TABS.length) {
      setActiveTab(TABS[numKey - 1].id);
      return;
    }

    // Left/Right or Q/E → cycle tabs (like the Pip-Boy shoulder buttons)
    if (e.key === 'ArrowLeft' || e.key === 'q' || e.key === 'Q') {
      e.preventDefault();
      setActiveTab(TABS[(currentIdx - 1 + TABS.length) % TABS.length].id);
    }
    if (e.key === 'ArrowRight' || e.key === 'e' || e.key === 'E') {
      e.preventDefault();
      setActiveTab(TABS[(currentIdx + 1) % TABS.length].id);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!booted) return;
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [booted, handleKeyDown]);

  // ── Boot sequence ─────────────────────────────────────────
  if (!booted) return <BootScreen onDone={() => setBooted(true)} />;

  // ── Data ─────────────────────────────────────────────────
  const profile          = portfolio?.profile;
  const experiences      = portfolio?.experiences      ?? [];
  const educations       = portfolio?.educations       ?? [];
  const skillsByCategory = portfolio?.skillsByCategory ?? {};
  const projects         = portfolio?.projects         ?? [];

  // ── Render active page ────────────────────────────────────
  function renderPage() {
    if (loading) return (
      <div style={{ color: 'var(--pip-green-dim)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
        &gt; LOADING_DATA<span className="cursor" />
      </div>
    );
    switch (activeTab) {
      case 'about':      return <AboutPage      profile={profile} />;
      case 'experience': return <ExperiencePage experiences={experiences} />;
      case 'skills':     return <SkillsPage     skillsByCategory={skillsByCategory} />;
      case 'education':  return <EducationPage  educations={educations} />;
      case 'projects':   return <ProjectsPage   projects={projects} />;
      default:           return null;
    }
  }

  // ── UI ────────────────────────────────────────────────────
  return (
    <main className="pip-boy">

      {/* ══ Header ══════════════════════════════════════════ */}
      <header className="pip-header">
        <div className="pip-header__left">
          <div className="pip-header__name">{profile?.name ?? 'H.T. YUMBUL'}</div>
          <div className="pip-header__title">{profile?.title ?? 'FULL-STACK DEVELOPER'}</div>
        </div>
        <div className="pip-header__center">
          <div className="pip-logo" aria-label="Pip-Boy 3000">PIP-BOY</div>
          <div style={{ fontSize: '0.55rem', color: 'var(--pip-green-dim)', letterSpacing: '0.2em' }}>
            3000 MK IV
          </div>
        </div>
        <div className="pip-header__right">
          <PipClock />
          <div className="pip-status">
            <div className="pip-status__dot" aria-hidden="true" />
            <span>{error === 'OFFLINE' ? 'OFFLINE MODE' : 'CONNECTED'}</span>
          </div>
          {profile?.location && (
            <div className="pip-clock">{profile.location.toUpperCase()}</div>
          )}
        </div>
      </header>

      {/* ══ Tab Nav ═════════════════════════════════════════ */}
      <div className="pip-tabs" role="tablist" aria-label="Portfolio sections">
        {TABS.map(tab => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={`pip-tab${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span aria-hidden="true">{tab.icon}</span>
            {tab.label}
            <span className="pip-tab__key">[{tab.key}]</span>
          </button>
        ))}
      </div>

      {/* ══ Content ══════════════════════════════════════════ */}
      <div
        className="pip-content"
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        key={activeTab}   /* forces re-mount → re-triggers screen-enter animation */
      >
        <div className="pip-screen">
          {renderPage()}
        </div>
      </div>

      {/* ══ Status Bar ═══════════════════════════════════════ */}
      <footer className="pip-statusbar">
        <div className="pip-statusbar__hint">
          <span><kbd>◄</kbd><kbd>►</kbd> or <kbd>Q</kbd><kbd>E</kbd> Navigate</span>
          <span><kbd>1</kbd>–<kbd>5</kbd> Jump to tab</span>
        </div>
        <span style={{ color: 'var(--pip-green-dim)' }}>
          {error === 'OFFLINE'
            ? '⚠ RUNNING ON FALLBACK DATA — START BACKEND TO SYNC DB'
            : '● ALL SYSTEMS NOMINAL'}
        </span>
        <span>RobCo OS v7.1 — BUILD {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
