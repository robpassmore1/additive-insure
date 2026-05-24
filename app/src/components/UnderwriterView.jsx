import React from 'react';
import { useSimulation } from '../SimulationContext';
import siteData from '../../../fixtures/site.json';
import eventData from '../../../fixtures/event.json';

const fmt = (n) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);

export default function UnderwriterView() {
  const { phase } = useSimulation();
  const policy = siteData.policy;
  const site = siteData.site;
  const ev = eventData.event;
  const resolved = phase === 'RESOLVED';

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Underwriter / Broker View</div>
        <div className="page-subtitle">
          {site.name} · Commercial resilience summary · Survey-informed · Subject to validation
        </div>
      </div>

      {/* ─── RESOLVED: full meeting moment ─── */}
      {resolved ? (
        <>
          {/* Hero card — Probable Avoided Retained Loss */}
          <div className="card card--hero" style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
              <div className="card-label" style={{ color: 'var(--accent-blue-light)' }}>
                Probable Avoided Retained Loss — Simulated · Subject to Validation
              </div>
              <div className="metric-value metric-value--hero" style={{ color: 'var(--text-primary)' }}>
                {fmt(ev.retainedLossAvoided)}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '560px', lineHeight: '1.6' }}>
                Simulated probable avoided loss within the insured's retained deductible layer.
                Not operationally validated. Hydrological uncertainty applies.
                This is not a guaranteed outcome or a claims avoidance figure.
              </div>
            </div>

            {/* Supporting commercial metrics */}
            <div className="metric-grid">
              <div className="metric-box">
                <div className="metric-label">Flood Excess (Retained)</div>
                <div className="metric-value">{fmt(policy.floodExcess)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Coverage Position</div>
                <div className="metric-value metric-value--blue metric-value--sm">{ev.coveragePosition}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Action Cost</div>
                <div className="metric-value">{fmt(ev.actionCost)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Probable Loss — No Action</div>
                <div className="metric-value metric-value--amber">{fmt(ev.predictedLossWithoutAction)}</div>
              </div>
            </div>

            {/* Evidence quality strip */}
            <div className="evidence-row">
              <div className="evidence-item">
                <div className="evidence-item__label">Hydrological Causality</div>
                <div className="evidence-item__value evidence-item__value--blue">{ev.hydrologicalCausality}</div>
              </div>
              <div className="evidence-item">
                <div className="evidence-item__label">Evidence Confidence</div>
                <div className="evidence-item__value evidence-item__value--green">{ev.evidenceConfidence}</div>
              </div>
              <div className="evidence-item">
                <div className="evidence-item__label">Validation Status</div>
                <div className="evidence-item__value evidence-item__value--amber">Not operationally validated</div>
              </div>
              <div className="evidence-item">
                <div className="evidence-item__label">Hydrological Uncertainty</div>
                <div className="evidence-item__value" style={{ color: 'var(--text-muted)' }}>Applies</div>
              </div>
            </div>
          </div>

          {/* Policy exposure summary */}
          <div className="card">
            <div className="card-label">Full Policy Exposure</div>
            <div className="metric-grid">
              <div className="metric-box">
                <div className="metric-label">Property Sum Insured</div>
                <div className="metric-value">{fmt(policy.propertySumInsured)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">BI Sum Insured</div>
                <div className="metric-value">{fmt(policy.businessInterruptionSumInsured)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Gross Avoided Loss</div>
                <div className="metric-value metric-value--green">{fmt(ev.grossAvoidedLoss)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Predicted Loss — With Action</div>
                <div className="metric-value">{fmt(ev.predictedLossWithAction)}</div>
              </div>
            </div>
          </div>

          {/* Evidence gaps */}
          <div className="card">
            <div className="card-label">Evidence Gaps — Sprint 001 / Version 1.1</div>
            <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Simulated event only — no live sensor data',
                'Survey-informed flood pathway — not field-validated sensor placement',
                'No live flood model or NWP forecast integration',
                'Lead time distributions illustrative — not calibrated to historical data',
                'No claims workflow or premium/pricing engine connected',
              ].map((gap, i) => (
                <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{gap}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        /* ─── CONTRAST: no-action / pre-event state ─── */
        <>
          {/* No-action exposure card */}
          <div className="card card--alert" style={{ marginBottom: '16px' }}>
            <div style={{ marginBottom: '20px' }}>
              <div className="card-label" style={{ color: 'var(--color-warning-text)' }}>
                No Resilience Action on Record — Unmitigated Retained Exposure
              </div>
              <div className="metric-value metric-value--hero metric-value--amber">
                {fmt(ev.predictedLossWithoutAction)}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '560px', lineHeight: '1.6', marginTop: '6px' }}>
                Probable retained loss if no action is deployed. Estimated from survey-informed flood pathway.
                Without a recorded and evidenced action, this exposure sits within the deductible layer with no evidence of mitigation.
              </div>
            </div>

            <div className="metric-grid">
              <div className="metric-box">
                <div className="metric-label">Flood Excess (Retained)</div>
                <div className="metric-value">{fmt(policy.floodExcess)}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Coverage Position</div>
                <div className="metric-value metric-value--blue metric-value--sm">{ev.coveragePosition}</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Probable Avoided Retained Loss</div>
                <div className="metric-value metric-value--muted metric-value--sm">Awaiting event outcome</div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Action Available</div>
                <div className="metric-value metric-value--sm" style={{ color: 'var(--color-warning-text)' }}>
                  Not yet recorded
                </div>
              </div>
            </div>

            {/* Evidence quality — inconclusive */}
            <div className="evidence-row">
              <div className="evidence-item">
                <div className="evidence-item__label">Hydrological Causality</div>
                <div className="evidence-item__value" style={{ color: 'var(--text-muted)' }}>No event recorded</div>
              </div>
              <div className="evidence-item">
                <div className="evidence-item__label">Evidence Confidence</div>
                <div className="evidence-item__value evidence-item__value--amber">No action recorded</div>
              </div>
              <div className="evidence-item">
                <div className="evidence-item__label">Validation Status</div>
                <div className="evidence-item__value" style={{ color: 'var(--text-muted)' }}>Not applicable</div>
              </div>
              <div className="evidence-item">
                <div className="evidence-item__label">Probable Retained Exposure</div>
                <div className="evidence-item__value evidence-item__value--amber">{fmt(ev.predictedLossWithoutAction)}</div>
              </div>
            </div>
          </div>

          {/* Context card */}
          <div className="card card--muted">
            <div className="card-label">What this view shows without an action</div>
            <p className="card-body" style={{ margin: 0, lineHeight: '1.7' }}>
              When no resilience action is recorded and evidenced, the Underwriter / Broker View shows only the unmitigated probable retained exposure.
              The probable avoided retained loss of <strong style={{ color: 'var(--text-primary)' }}>{fmt(ev.retainedLossAvoided)}</strong> is not available until an action is completed.
              Run the simulation on <strong style={{ color: 'var(--text-primary)' }}>Site Event View</strong> to see the full meeting moment.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
