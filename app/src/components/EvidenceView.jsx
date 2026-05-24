import React from 'react';
import { useSimulation } from '../SimulationContext';
import eventData from '../../../fixtures/event.json';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(amount);
};

export default function EvidenceView() {
  const { phase } = useSimulation();
  const ev = eventData.event;

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Evidence / Impact Ledger</h2>

      <div className="card">
        <div className="card-title">Impact Ledger</div>
        {phase !== 'RESOLVED' ? (
          <p style={{ color: 'var(--text-secondary)' }}>Awaiting event resolution to finalize ledger.</p>
        ) : (
          <div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Immutable record of simulated actions and probable impact.
            </p>
            <div className="metric-grid">
              <div className="metric-box">
                <div className="metric-label">Predicted Loss (No Action)</div>
                <div className="metric-value">{formatCurrency(ev.predictedLossWithoutAction)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Predicted Loss (With Action)</div>
                <div className="metric-value">{formatCurrency(ev.predictedLossWithAction)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Gross Avoided Loss</div>
                <div className="metric-value good">{formatCurrency(ev.grossAvoidedLoss)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Action Cost</div>
                <div className="metric-value danger">{formatCurrency(ev.actionCost)}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">Driver & Model Cards</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-secondary)' }}>Lead Time Logistics</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-primary)' }}>
              <li><strong>p10 lead time:</strong> {ev.leadTimes.p10} minutes</li>
              <li><strong>p50 lead time:</strong> {ev.leadTimes.p50} minutes</li>
              <li><strong>p90 lead time:</strong> {ev.leadTimes.p90} minutes</li>
              <li><strong>Required execution time:</strong> {ev.minimumActionTime} minutes</li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-secondary)' }}>Causality & Confidence</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-primary)' }}>
              <li><strong>Hydrological causality:</strong> <span style={{ color: 'var(--accent-blue)' }}>{ev.hydrologicalCausality}</span></li>
              <li><strong>Evidence confidence:</strong> <span style={{ color: 'var(--accent-green)' }}>{ev.evidenceConfidence}</span></li>
              <li><strong>Validation status:</strong> Not operationally validated</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
