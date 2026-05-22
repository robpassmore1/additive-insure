import React from 'react';
import { useSimulation } from '../SimulationContext';
import siteData from '../../../fixtures/site.json';
import eventData from '../../../fixtures/event.json';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(amount);
};

export default function UnderwriterView() {
  const { phase } = useSimulation();
  const policy = siteData.policy;
  const ev = eventData.event;

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Underwriter / Broker View</h2>
      
      <div className="card">
        <div className="card-title">Commercial Summary</div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Overview of policy exposure relative to simulated resilience actions.
        </p>

        <div className="metric-grid" style={{ marginBottom: '30px' }}>
          <div className="metric-box">
            <div className="metric-label">Flood Excess</div>
            <div className="metric-value">{formatCurrency(policy.floodExcess)}</div>
          </div>
          <div className="metric-box">
            <div className="metric-label">Coverage Position</div>
            <div className="metric-value info">{ev.coveragePosition}</div>
          </div>
        </div>

        {phase === 'RESOLVED' ? (
          <div style={{ padding: '20px', backgroundColor: 'rgba(31, 111, 235, 0.1)', border: '1px solid var(--accent-blue)', borderRadius: '6px' }}>
            <h3 style={{ margin: '0 0 15px 0', color: 'var(--accent-blue)' }}>Probable Avoided Retained Loss</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                {formatCurrency(ev.retainedLossAvoided)}
              </div>
              <div style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
                Simulated probable avoided loss within the insured's deductible layer. Subject to validation.
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '20px', border: '1px dashed var(--border-color)', borderRadius: '6px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Awaiting completion of simulated event to generate commercial summary.
          </div>
        )}
      </div>

    </div>
  );
}
