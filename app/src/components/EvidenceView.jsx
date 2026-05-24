import React from 'react';
import { useSimulation } from '../SimulationContext';
import eventData from '../../../fixtures/event.json';

const fmt = (n) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);

export default function EvidenceView() {
  const { phase } = useSimulation();
  const ev = eventData.event;
  const resolved = phase === 'RESOLVED';

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Evidence / Impact Ledger</div>
        <div className="page-subtitle">
          Immutable record of simulated actions and probable impact — subject to validation
        </div>
      </div>

      {/* Impact Ledger */}
      <div className="card">
        <div className="card-label">Impact Ledger</div>
        {!resolved ? (
          <p className="card-body" style={{ marginTop: 0 }}>
            Awaiting event resolution. Complete the simulated action on Site Event View to unlock the ledger.
          </p>
        ) : (
          <>
            <p className="card-body" style={{ marginTop: 0, marginBottom: '16px' }}>
              Simulated actions and probable impact. Not operationally validated. Hydrological uncertainty applies.
            </p>
            <div className="metric-grid">
              <div className="metric-box">
                <div className="metric-label">Predicted Loss — No Action</div>
                <div className="metric-value metric-value--amber">{fmt(ev.predictedLossWithoutAction)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Predicted Loss — With Action</div>
                <div className="metric-value">{fmt(ev.predictedLossWithAction)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Gross Avoided Loss</div>
                <div className="metric-value metric-value--green">{fmt(ev.grossAvoidedLoss)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Action Cost</div>
                <div className="metric-value">{fmt(ev.actionCost)}</div>
              </div>
            </div>

            {/* Probable avoided retained loss callout */}
            <div style={{
              marginTop: '16px',
              padding: '16px 20px',
              background: 'var(--accent-blue-glow)',
              border: '1px solid var(--accent-blue)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div>
                <div className="metric-label" style={{ color: 'var(--accent-blue-light)', marginBottom: '4px' }}>
                  Probable Avoided Retained Loss
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                  {fmt(ev.retainedLossAvoided)}
                </div>
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', maxWidth: '320px', lineHeight: '1.6' }}>
                Simulated probable avoided retained loss within the insured's deductible layer.
                Subject to validation. Not operationally validated.
              </div>
            </div>
          </>
        )}
      </div>

      {/* Driver & Model Cards — always visible */}
      <div className="card">
        <div className="card-label">Driver & Model Cards</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Lead Time Model — Survey-Informed
            </div>
            <div className="metric-grid metric-grid--tight">
              {[
                { label: 'p10 (Optimistic)', val: `${ev.leadTimes.p10} min` },
                { label: 'p50 (Central)',    val: `${ev.leadTimes.p50} min` },
                { label: 'p90 (Conservative)', val: `${ev.leadTimes.p90} min` },
                { label: 'Min. action time', val: `${ev.minimumActionTime} min` },
              ].map(({ label, val }) => (
                <div key={label} className="metric-box">
                  <div className="metric-label">{label}</div>
                  <div className="metric-value metric-value--sm">{val}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Causality & Confidence
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Hydrological causality', val: ev.hydrologicalCausality, cls: 'metric-value--blue' },
                { label: 'Evidence confidence', val: ev.evidenceConfidence, cls: 'metric-value--green' },
                { label: 'Validation status', val: 'Not operationally validated', cls: 'metric-value--amber' },
                { label: 'Hydrological uncertainty', val: 'Applies', cls: 'metric-value--muted' },
              ].map(({ label, val, cls }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)', gap: '10px' }}>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600 }} className={cls}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
