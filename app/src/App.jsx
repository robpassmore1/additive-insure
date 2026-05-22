import React, { useState } from 'react';
import { SimulationProvider, useSimulation } from './SimulationContext';
import SiteEventView from './components/SiteEventView';
import EvidenceView from './components/EvidenceView';
import UnderwriterView from './components/UnderwriterView';
import './index.css';

function MainLayout() {
  const [activeTab, setActiveTab] = useState('SITE_EVENT');
  const { phase, resetSimulation } = useSimulation();

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-title">Additive Insure</div>
        <div 
          className={`nav-item ${activeTab === 'SITE_EVENT' ? 'active' : ''}`}
          onClick={() => setActiveTab('SITE_EVENT')}
        >
          Site Event View
        </div>
        <div 
          className={`nav-item ${activeTab === 'EVIDENCE' ? 'active' : ''}`}
          onClick={() => setActiveTab('EVIDENCE')}
        >
          Evidence / Impact Ledger
        </div>
        <div 
          className={`nav-item ${activeTab === 'UNDERWRITER' ? 'active' : ''}`}
          onClick={() => setActiveTab('UNDERWRITER')}
        >
          Underwriter / Broker View
        </div>

        <div style={{ marginTop: 'auto', padding: '20px' }}>
          <button className="btn" onClick={resetSimulation} style={{ width: '100%' }}>
            Reset Simulation
          </button>
        </div>
      </div>
      <div className="main-content">
        {activeTab === 'SITE_EVENT' && <SiteEventView />}
        {activeTab === 'EVIDENCE' && <EvidenceView />}
        {activeTab === 'UNDERWRITER' && <UnderwriterView />}
      </div>
    </>
  );
}

function App() {
  return (
    <SimulationProvider>
      <MainLayout />
    </SimulationProvider>
  );
}

export default App;
