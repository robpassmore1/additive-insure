import React, { useState } from 'react';
import { SimulationProvider, useSimulation } from './SimulationContext';
import SiteEventView from './components/SiteEventView';
import EvidenceView from './components/EvidenceView';
import UnderwriterView from './components/UnderwriterView';
import PortfolioView from './components/PortfolioView';
import EvidenceSummary from './components/EvidenceSummary';
import DemoGuide from './components/DemoGuide';
import './index.css';

const NAV_ITEMS = [
  {
    section: 'Hero Journey',
    items: [
      { id: 'SITE_EVENT',   label: 'Site Event View',          icon: '⬡' },
      { id: 'EVIDENCE',     label: 'Evidence / Impact Ledger', icon: '◈' },
      { id: 'UNDERWRITER',  label: 'Underwriter / Broker View',icon: '◎' },
    ]
  },
  {
    section: 'Teaser',
    items: [
      { id: 'PORTFOLIO',        label: 'Portfolio Teaser',    icon: '▤' },
      { id: 'EVIDENCE_SUMMARY', label: 'Evidence Summary',    icon: '⊟' },
    ]
  }
];

function MainLayout() {
  const [activeTab, setActiveTab] = useState('SITE_EVENT');
  const [guideOpen, setGuideOpen] = useState(false);
  const { resetSimulation } = useSimulation();

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-name">Additive Insure</div>
          <div className="sidebar-brand-sub">Version 1.1 · Demonstrator</div>
        </div>

        {NAV_ITEMS.map(group => (
          <div className="sidebar-section" key={group.section}>
            <div className="sidebar-section-label">{group.section}</div>
            {group.items.map(item => (
              <div
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="nav-item-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        ))}

        <div className="sidebar-bottom">
          <button
            className="btn btn--secondary btn--full btn--sm"
            onClick={() => setGuideOpen(prev => !prev)}
          >
            {guideOpen ? '✕ Close Guide' : '▶ Demo Guide'}
          </button>
          <button
            className="btn btn--ghost btn--full btn--sm"
            onClick={resetSimulation}
          >
            ↺ Reset Simulation
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {activeTab === 'SITE_EVENT'        && <SiteEventView />}
        {activeTab === 'EVIDENCE'          && <EvidenceView />}
        {activeTab === 'UNDERWRITER'       && <UnderwriterView />}
        {activeTab === 'PORTFOLIO'         && <PortfolioView />}
        {activeTab === 'EVIDENCE_SUMMARY'  && <EvidenceSummary />}
      </div>

      {/* Demo Guide panel */}
      <DemoGuide
        isOpen={guideOpen}
        onClose={() => setGuideOpen(false)}
        onNavigate={(tab) => { setActiveTab(tab); }}
      />
    </div>
  );
}

export default function App() {
  return (
    <SimulationProvider>
      <MainLayout />
    </SimulationProvider>
  );
}
