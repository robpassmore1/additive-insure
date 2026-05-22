import React from 'react';
import { useSimulation } from '../SimulationContext';
import siteData from '../../../fixtures/site.json';
import eventData from '../../../fixtures/event.json';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(amount);
};

export default function SiteEventView() {
  const { phase, advancePhase, completeAction } = useSimulation();
  
  const site = siteData.site;
  const policy = siteData.policy;
  const ev = eventData.event;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Site Event View</h2>
        <div className="simulation-controls" style={{ position: 'relative', right: 0, top: 0 }}>
          <span className={`badge ${phase.toLowerCase()}`}>
            Status: {phase.replace('_', ' ')}
          </span>
          {phase !== 'RESOLVED' && (
            <button className="btn primary" onClick={advancePhase}>
              Simulate Time +
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Site Overview</div>
        <p style={{ marginTop: 0, color: 'var(--text-secondary)' }}>{site.name} • Survey-informed risk profile</p>
        <div className="metric-grid">
          <div className="metric-box">
            <div className="metric-label">Property Sum Insured</div>
            <div className="metric-value">{formatCurrency(policy.propertySumInsured)}</div>
          </div>
          <div className="metric-box">
            <div className="metric-label">BI Sum Insured</div>
            <div className="metric-value">{formatCurrency(policy.businessInterruptionSumInsured)}</div>
          </div>
          <div className="metric-box">
            <div className="metric-label">Flood Excess</div>
            <div className="metric-value">{formatCurrency(policy.floodExcess)}</div>
          </div>
          <div className="metric-box">
            <div className="metric-label">Daily Downtime Cost</div>
            <div className="metric-value">{formatCurrency(ev.dailyDowntimeCost)}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Flood Pathway & Sensor Simulation</div>
        <p style={{ marginTop: 0, color: 'var(--text-secondary)' }}>
          Hydrological pathway based on site survey. Simulated sensor node active.
        </p>
        
        <div className="timeline">
          <div className="timeline-event">
            <div className="timeline-time">T-Minus 360m</div>
            <div className="timeline-content">Baseline normal. No water ingress detected.</div>
          </div>
          {(phase === 'RISING' || phase === 'ALERT' || phase === 'ACTION_TAKEN' || phase === 'RESOLVED') && (
            <div className="timeline-event">
              <div className="timeline-time" style={{ color: 'var(--accent-blue)' }}>T-Minus 240m</div>
              <div className="timeline-content" style={{ borderColor: 'var(--accent-blue)' }}>
                Water rising at property perimeter. Probability of ingress increasing.
              </div>
            </div>
          )}
          {(phase === 'ALERT' || phase === 'ACTION_TAKEN' || phase === 'RESOLVED') && (
            <div className="timeline-event">
              <div className="timeline-time" style={{ color: 'var(--accent-amber)' }}>T-Minus 150m</div>
              <div className="timeline-content" style={{ borderColor: 'var(--accent-amber)' }}>
                Critical threshold breached. Projected loss without action: {formatCurrency(ev.predictedLossWithoutAction)}.
              </div>
            </div>
          )}
        </div>
      </div>

      {(phase === 'ALERT' || phase === 'ACTION_TAKEN') && (
        <div className="action-banner">
          <div>
            <h3>Watch / Action Alert</h3>
            <p><strong>Action required:</strong> {ev.action}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
              Minimum action time: {ev.minimumActionTime}m
            </p>
          </div>
          {phase === 'ALERT' && (
            <button className="btn primary" onClick={completeAction}>
              Mark Action Complete
            </button>
          )}
          {phase === 'ACTION_TAKEN' && (
            <span className="badge resolved" style={{ fontSize: '1rem', padding: '8px 16px' }}>Action Completed</span>
          )}
        </div>
      )}

      {phase === 'RESOLVED' && (
        <div className="action-banner" style={{ backgroundColor: 'rgba(35, 134, 54, 0.1)', borderColor: 'var(--accent-green)' }}>
          <div>
            <h3 style={{ color: 'var(--accent-green)' }}>Event Resolved</h3>
            <p>Simulated flood peak passed. Action confirmed complete prior to ingress.</p>
          </div>
        </div>
      )}
    </div>
  );
}
