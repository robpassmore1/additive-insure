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
  const site = siteData.site;

  return (
    <div>
      <h2 style={{ marginBottom: '4px' }}>Underwriter / Broker View</h2>
      <p style={{ margin: '0 0 24px 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        {site.name} — Commercial resilience summary
      </p>

      {/* Policy Exposure */}
      <div className="card">
        <div className="card-title">Policy Exposure</div>
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
            <div className="metric-label">Coverage Position</div>
            <div className="metric-value info">{ev.coveragePosition}</div>
          </div>
        </div>
      </div>

      {/* Resilience Action Summary */}
      {phase === 'RESOLVED' ? (
        <>
          <div className="card">
            <div className="card-title">Resilience Action — Simulated Outcome</div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 0, marginBottom: '20px', fontSize: '0.85rem' }}>
              Based on survey-informed site data. Subject to validation. Hydrological uncertainty applies.
            </p>
            <div className="metric-grid">
              <div className="metric-box">
                <div className="metric-label">Action</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)', paddingTop: '4px' }}>
                  {ev.action}
                </div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Action Cost</div>
                <div className="metric-value">{formatCurrency(ev.actionCost)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Predicted Loss (No Action)</div>
                <div className="metric-value warning">{formatCurrency(ev.predictedLossWithoutAction)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Predicted Loss (With Action)</div>
                <div className="metric-value">{formatCurrency(ev.predictedLossWithAction)}</div>
              </div>
            </div>
          </div>

          {/* Meeting Moment: Probable Avoided Retained Loss */}
          <div className="card" style={{
            border: '1px solid var(--accent-blue)',
            background: 'linear-gradient(135deg, rgba(31, 111, 235, 0.08) 0%, rgba(31, 111, 235, 0.03) 100%)'
          }}>
            <div className="card-title" style={{ color: 'var(--accent-blue)' }}>
              Probable Avoided Retained Loss
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '30px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {formatCurrency(ev.retainedLossAvoided)}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px', maxWidth: '360px' }}>
                  Simulated probable avoided retained loss within the insured's deductible layer. Not operationally validated. Subject to validation.
                </div>
              </div>
            </div>

            {/* Evidence Quality Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <div>
                <div className="metric-label">Hydrological Causality</div>
                <div style={{ color: 'var(--accent-blue)', fontWeight: 600, marginTop: '4px' }}>
                  {ev.hydrologicalCausality}
                </div>
              </div>
              <div>
                <div className="metric-label">Evidence Confidence</div>
                <div style={{ color: 'var(--accent-green)', fontWeight: 600, marginTop: '4px' }}>
                  {ev.evidenceConfidence}
                </div>
              </div>
              <div>
                <div className="metric-label">Validation Status</div>
                <div style={{ color: 'var(--accent-amber)', fontWeight: 600, marginTop: '4px' }}>
                  Not operationally validated
                </div>
              </div>
              <div>
                <div className="metric-label">Hydrological Uncertainty</div>
                <div style={{ color: 'var(--text-secondary)', fontWeight: 600, marginTop: '4px' }}>
                  Applies
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Gaps */}
          <div className="card" style={{ borderColor: 'var(--border-color)' }}>
            <div className="card-title" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Evidence Gaps — Sprint 001
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.9' }}>
              <li>Simulated event only — no live sensor data</li>
              <li>Survey-informed pathway — not field-validated sensor placement</li>
              <li>No live flood model or NWP forecast integration</li>
              <li>Lead time distributions illustrative — not calibrated</li>
              <li>No claims workflow or premium/pricing engine connected</li>
            </ul>
          </div>
        </>
      ) : (
        /* Contrast scenario: no event resolved yet */
        <>
          <div className="card" style={{
            border: '1px dashed var(--border-color)',
            background: 'rgba(0,0,0,0.1)'
          }}>
            <div className="card-title" style={{ color: 'var(--text-secondary)' }}>
              No Resilience Action on Record
            </div>
            <p style={{ color: 'var(--text-secondary)', margin: '0 0 16px 0', fontSize: '0.9rem' }}>
              Without a recorded and validated resilience action, the probable retained loss exposure remains within the deductible.
            </p>
            <div className="metric-grid">
              <div className="metric-box">
                <div className="metric-label">Probable Retained Loss</div>
                <div className="metric-value warning">{formatCurrency(ev.predictedLossWithoutAction)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Flood Excess</div>
                <div className="metric-value">{formatCurrency(policy.floodExcess)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Evidence Confidence</div>
                <div style={{ color: 'var(--text-secondary)', fontWeight: 600, marginTop: '4px', paddingTop: '4px' }}>
                  No action recorded
                </div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Probable Avoided Retained Loss</div>
                <div style={{ color: 'var(--text-secondary)', fontWeight: 600, marginTop: '4px', paddingTop: '4px' }}>
                  Awaiting event outcome
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
