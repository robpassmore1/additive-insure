import React from 'react';
import { useSimulation } from '../SimulationContext';
import siteData from '../../../fixtures/site.json';
import eventData from '../../../fixtures/event.json';

const fmt = (n) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);

export default function SiteEventView() {
  const { phase, advancePhase, completeAction } = useSimulation();
  const site = siteData.site;
  const policy = siteData.policy;
  const ev = eventData.event;

  const phases = ['IDLE', 'RISING', 'ALERT', 'ACTION_TAKEN', 'RESOLVED'];
  const phaseIdx = phases.indexOf(phase);

  const badgeClass = {
    IDLE: 'badge--idle', RISING: 'badge--rising',
    ALERT: 'badge--alert', ACTION_TAKEN: 'badge--alert', RESOLVED: 'badge--resolved'
  }[phase];

  const phaseLabel = {
    IDLE: 'Normal', RISING: 'Water Rising',
    ALERT: 'Alert', ACTION_TAKEN: 'Action Taken', RESOLVED: 'Resolved'
  }[phase];

  return (
    <div>
      {/* Page header with sim controls */}
      <div className="sim-bar">
        <div className="sim-bar__left">
          <div className="page-title">Site Event View</div>
          <div className="page-subtitle">{site.name} · Survey-informed risk profile · Simulated event</div>
        </div>
        <div className="sim-bar__right">
          <span className={`badge ${badgeClass}`}>
            {phaseLabel}
          </span>
          {phase !== 'RESOLVED' && phase !== 'ACTION_TAKEN' && (
            <button className="btn btn--primary btn--sm" onClick={advancePhase}>
              Simulate Time +
            </button>
          )}
        </div>
      </div>

      {/* Policy Exposure */}
      <div className="card">
        <div className="card-label">Policy Exposure</div>
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
            <div className="metric-label">Flood Excess</div>
            <div className="metric-value metric-value--blue">{fmt(policy.floodExcess)}</div>
          </div>
          <div className="metric-box">
            <div className="metric-label">Daily Downtime Cost</div>
            <div className="metric-value">{fmt(ev.dailyDowntimeCost)}</div>
          </div>
        </div>
      </div>

      {/* Flood Pathway & Sensor Timeline */}
      <div className="card">
        <div className="card-label">Flood Pathway & Simulated Sensor Timeline</div>
        <p className="card-body" style={{ marginTop: 0, marginBottom: '20px' }}>
          Survey-informed hydrological pathway. Simulated sensor node active. Not operationally validated.
        </p>

        <div className="timeline">
          {/* T-360: always visible */}
          <div className="timeline-event">
            <div className={`timeline-dot ${phaseIdx >= 0 ? 'timeline-dot--resolved' : ''}`}></div>
            <div className="timeline-time">T − 360 min</div>
            <div className="timeline-content">
              Baseline normal. No water ingress detected. Site operating within normal parameters.
            </div>
          </div>

          {/* T-240: RISING+ */}
          {phaseIdx >= 1 && (
            <div className="timeline-event">
              <div className="timeline-dot timeline-dot--active"></div>
              <div className="timeline-time" style={{ color: 'var(--accent-blue-light)' }}>T − 240 min</div>
              <div className="timeline-content" style={{ borderColor: 'var(--accent-blue)' }}>
                <strong style={{ color: 'var(--accent-blue-light)' }}>Water rising at property perimeter.</strong>{' '}
                Simulated sensor reading elevated. Probability of ingress increasing. Survey-informed threshold monitoring active.
              </div>
            </div>
          )}

          {/* T-150: ALERT+ */}
          {phaseIdx >= 2 && (
            <div className="timeline-event">
              <div className="timeline-dot timeline-dot--alert"></div>
              <div className="timeline-time" style={{ color: 'var(--color-warning-text)' }}>T − 150 min</div>
              <div className="timeline-content" style={{ borderColor: 'var(--color-alert-border)' }}>
                <strong style={{ color: 'var(--color-warning-text)' }}>Critical threshold breached.</strong>{' '}
                Simulated ingress probability exceeds actionable level. Projected probable loss without action:{' '}
                <strong>{fmt(ev.predictedLossWithoutAction)}</strong>.
                Lead time window: p50 {ev.leadTimes.p50} min · minimum action time {ev.minimumActionTime} min.
              </div>
            </div>
          )}

          {/* T-0: RESOLVED */}
          {phaseIdx >= 4 && (
            <div className="timeline-event">
              <div className="timeline-dot timeline-dot--resolved"></div>
              <div className="timeline-time" style={{ color: '#34d399' }}>T − 0 min</div>
              <div className="timeline-content" style={{ borderColor: 'var(--color-success-border)' }}>
                <strong style={{ color: '#34d399' }}>Simulated flood peak passed.</strong>{' '}
                Action recorded as complete prior to projected ingress. Event closed.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Watch / Action Alert banner */}
      {(phase === 'ALERT' || phase === 'ACTION_TAKEN') && (
        <div className="action-banner">
          <div style={{ flex: 1 }}>
            <div className="action-banner__title">⚡ Watch / Action Alert</div>
            <div className="action-banner__body">
              <strong>Action required:</strong> {ev.action}
            </div>
            <div className="action-banner__sub">
              Action cost: {fmt(ev.actionCost)} · Minimum execution time: {ev.minimumActionTime} min ·
              Available window (p50): {ev.leadTimes.p50} min
            </div>
          </div>
          <div style={{ flexShrink: 0 }}>
            {phase === 'ALERT' ? (
              <button className="btn btn--primary" onClick={completeAction}>
                Mark Action Complete
              </button>
            ) : (
              <span className="badge badge--resolved" style={{ fontSize: '12px', padding: '6px 14px' }}>
                ✓ Action Completed
              </span>
            )}
          </div>
        </div>
      )}

      {/* Resolved banner */}
      {phase === 'RESOLVED' && (
        <div className="card card--success">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>✓</span>
            <div>
              <div style={{ fontWeight: 700, color: '#34d399', marginBottom: '2px' }}>Event Resolved</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Simulated flood peak passed. Action confirmed complete prior to projected ingress.
                Navigate to <strong>Evidence / Impact Ledger</strong> to review the probable avoided loss.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
