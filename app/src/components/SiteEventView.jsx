import React, { useState, useEffect, useRef } from 'react';
import { useSimulation } from '../SimulationContext';
import SiteContextMap from './SiteContextMap';
import siteData from '../../../fixtures/site.json';
import eventData from '../../../fixtures/event.json';

const fmt = (n) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);

export default function SiteEventView() {
  const { phase, advancePhase, completeAction } = useSimulation();
  const site = siteData.site;
  const policy = siteData.policy;
  const ev = eventData.event;

  // Selected driver card / marker state
  const [selectedCard, setSelectedCard] = useState('rainfall');
  const [userOverride, setUserOverride] = useState(false);
  const prevPhaseRef = useRef(phase);

  // Auto-select logical driver based on phase transitions
  useEffect(() => {
    if (prevPhaseRef.current !== phase) {
      setUserOverride(false);
      if (phase === 'IDLE') setSelectedCard('rainfall');
      else if (phase === 'RISING') setSelectedCard('river');
      else if (phase === 'WATCH') setSelectedCard('drainage');
      else setSelectedCard('loadingBay');
      prevPhaseRef.current = phase;
    }
  }, [phase]);

  const handleCardSelect = (id) => {
    setSelectedCard(id);
    setUserOverride(true);
  };

  const handleMarkerClick = (id) => {
    setSelectedCard(id);
    setUserOverride(true);
  };

  const phases = ['IDLE', 'RISING', 'WATCH', 'ACTION', 'ACTION_TAKEN', 'RESOLVED'];
  const phaseIdx = phases.indexOf(phase);

  const phaseLabel = {
    IDLE: 'Normal',
    RISING: 'Water Rising',
    WATCH: 'Watch Warning',
    ACTION: 'Action Required',
    ACTION_TAKEN: 'Action Completed',
    RESOLVED: 'Event Resolved'
  }[phase];

  const badgeClass = {
    IDLE: 'badge--idle',
    RISING: 'badge--rising',
    WATCH: 'badge--alert',
    ACTION: 'badge--alert',
    ACTION_TAKEN: 'badge--resolved',
    RESOLVED: 'badge--resolved'
  }[phase];

  // Get active driver telemetries from fixture
  const telemetries = ev.driverTelemetries[phase] || ev.driverTelemetries['IDLE'];

  // Identify active threat driver node
  const activeThreatNode = {
    RISING: 'river',
    WATCH: 'drainage',
    ACTION: 'loadingBay',
    ACTION_TAKEN: 'loadingBay'
  }[phase] || null;

  return (
    <div>
      {/* Simulation Header Controls */}
      <div className="sim-bar">
        <div className="sim-bar__left">
          <div className="page-title">Place-Based ALT Demonstrator</div>
          <div className="page-subtitle">{site.name} · Spatial flood chain · Survey-informed</div>
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

      {/* Split-pane Dashboard */}
      <div className="dashboard-split">
        
        {/* Left Pane: Map Provider Switcher */}
        <div className="map-pane">
          <SiteContextMap
            selectedId={selectedCard}
            onMarkerClick={handleMarkerClick}
            phase={phase}
          />
        </div>

        {/* Right Pane: Clickable Driver Cards & Rationale Panels */}
        <div className="details-pane">
          
          {/* Driver Cards Stack */}
          <div className="driver-card-stack">
            
            {/* River Level Card */}
            <div
              className={`driver-card ${selectedCard === 'river' ? 'selected' : ''} ${activeThreatNode === 'river' ? 'active-driver' : ''}`}
              onClick={() => handleCardSelect('river')}
            >
              <div className="driver-card__left">
                <span className="driver-card__role">Lead-Time Signal</span>
                <span className="driver-card__name">River level (Upstream Gauge)</span>
              </div>
              <div className="driver-card__right">
                <span className="driver-card__value">{telemetries.river.value}</span>
                <div className="driver-card__status" style={{ color: telemetries.river.color }}>
                  {telemetries.river.status}
                </div>
              </div>
            </div>

            {/* Rainfall Card */}
            <div
              className={`driver-card ${selectedCard === 'rainfall' ? 'selected' : ''}`}
              onClick={() => handleCardSelect('rainfall')}
            >
              <div className="driver-card__left">
                <span className="driver-card__role">Hazard Driver</span>
                <span className="driver-card__name">Rainfall (Local Node)</span>
              </div>
              <div className="driver-card__right">
                <span className="driver-card__value">{telemetries.rainfall.value}</span>
                <div className="driver-card__status" style={{ color: telemetries.rainfall.color }}>
                  {telemetries.rainfall.status}
                </div>
              </div>
            </div>

            {/* Drainage Card */}
            <div
              className={`driver-card ${selectedCard === 'drainage' ? 'selected' : ''} ${activeThreatNode === 'drainage' ? 'active-driver' : ''}`}
              onClick={() => handleCardSelect('drainage')}
            >
              <div className="driver-card__left">
                <span className="driver-card__role">Pathway Activation</span>
                <span className="driver-card__name">Drainage / Yard Low Point</span>
              </div>
              <div className="driver-card__right">
                <span className="driver-card__value">{telemetries.drainage.value}</span>
                <div className="driver-card__status" style={{ color: telemetries.drainage.color }}>
                  {telemetries.drainage.status}
                </div>
              </div>
            </div>

            {/* Loading Bay Threshold Card */}
            <div
              className={`driver-card ${selectedCard === 'loadingBay' ? 'selected' : ''} ${activeThreatNode === 'loadingBay' ? 'active-driver' : ''}`}
              onClick={() => handleCardSelect('loadingBay')}
            >
              <div className="driver-card__left">
                <span className="driver-card__role">Asset Impact Point</span>
                <span className="driver-card__name">Loading Bay Ingress Sensor</span>
              </div>
              <div className="driver-card__right">
                <span className="driver-card__value">{telemetries.loadingBay.value}</span>
                <div className="driver-card__status" style={{ color: telemetries.loadingBay.color }}>
                  {telemetries.loadingBay.status}
                </div>
              </div>
            </div>

          </div>

          {/* Model Card (Alert-linked/Highlighted in WATCH/ACTION) */}
          <div className={`detail-card ${(phase === 'WATCH' || phase === 'ACTION' || phase === 'ACTION_TAKEN') ? 'active-state' : ''}`}>
            <div className="detail-card__header">
              <div className="detail-card__title">
                📊 Model Rationale Card
              </div>
              {phase === 'WATCH' && <span className="badge badge--alert">Watch Triggered</span>}
              {phase === 'ACTION' && <span className="badge badge--alert">Action Triggered</span>}
            </div>
            <div className="detail-card__row">
              <span className="detail-card__key">Model Basis</span>
              <span className="detail-card__val">{ev.modelCard.modelBasis}</span>
            </div>
            <div className="detail-card__row">
              <span className="detail-card__key">Inputs</span>
              <span className="detail-card__val" style={{ fontSize: '10.5px' }}>{ev.modelCard.inputs}</span>
            </div>
            <div className="detail-card__row">
              <span className="detail-card__key">Confidence</span>
              <span className="detail-card__val">{ev.modelCard.confidence}</span>
            </div>
            <div className="detail-card__row">
              <span className="detail-card__key">Limitations</span>
              <span className="detail-card__val" style={{ fontSize: '10.5px' }}>{ev.modelCard.limitations}</span>
            </div>
            <div className="detail-card__row">
              <span className="detail-card__key">Approved Claim Level</span>
              <span className="detail-card__val" style={{ color: 'var(--accent-blue-light)' }}>{ev.modelCard.approvedClaimLevel}</span>
            </div>
          </div>

          {/* Action / Runbook Card (Highlighted in ACTION/ACTION_TAKEN) */}
          <div className={`detail-card ${phase === 'ACTION' ? 'active-state' : (phase === 'ACTION_TAKEN' || phase === 'RESOLVED') ? 'success-state' : ''}`}>
            <div className="detail-card__header">
              <div className="detail-card__title">
                📋 Action Runbook Card
              </div>
              {(phase === 'ACTION_TAKEN' || phase === 'RESOLVED') && <span className="badge badge--resolved">Mitigation Verified</span>}
            </div>
            <div className="detail-card__row">
              <span className="detail-card__key">Location</span>
              <span className="detail-card__val">{ev.actionCard.location}</span>
            </div>
            <div className="detail-card__row">
              <span className="detail-card__key">Owner</span>
              <span className="detail-card__val">{ev.actionCard.owner}</span>
            </div>
            <div className="detail-card__row">
              <span className="detail-card__key">Required Time</span>
              <span className="detail-card__val">{ev.actionCard.timeRequired} minutes</span>
            </div>
            <div className="detail-card__row">
              <span className="detail-card__key">p10 Actionability</span>
              <span className="detail-card__val" style={{ color: '#34d399' }}>{ev.actionCard.p10Result}</span>
            </div>
            <div className="detail-card__row">
              <span className="detail-card__key">Action Cost</span>
              <span className="detail-card__val">{fmt(ev.actionCard.actionCost)}</span>
            </div>
            <div className="detail-card__row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
              <span className="detail-card__key">Evidence Required</span>
              <span className="detail-card__val" style={{ textAlign: 'left', fontSize: '10px', color: 'var(--text-secondary)' }}>{ev.actionCard.evidenceRequired}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Action / Runbook Warning Banner (surfaces at ACTION phase) */}
      {(phase === 'ACTION' || phase === 'ACTION_TAKEN') && (
        <div className="action-banner">
          <div style={{ flex: 1 }}>
            <div className="action-banner__title">⚡ Action Required Alert</div>
            <div className="action-banner__body">
              <strong>Instructions:</strong> {ev.action}
            </div>
            <div className="action-banner__sub">
              Action cost: {fmt(ev.actionCost)} · Minimum deployment time: {ev.minimumActionTime} min ·
              Central window (p50): {ev.leadTimes.p50} min
            </div>
          </div>
          <div style={{ flexShrink: 0 }}>
            {phase === 'ACTION' ? (
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

      {/* Resolved Banner */}
      {phase === 'RESOLVED' && (
        <div className="card card--success" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px', color: '#34d399' }}>✓</span>
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

      {/* Timeline Status (Horizontal display at bottom) */}
      <div className="card">
        <div className="card-label">Event Timeline & Pathway Status</div>
        <div className="timeline-horizontal" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginTop: '10px', padding: '10px 0' }}>
          {
            [
              { id: 'IDLE', label: 'Normal', time: 'T − 360' },
              { id: 'RISING', label: 'Rising', time: 'T − 240' },
              { id: 'WATCH', label: 'Watch', time: 'T − 180' },
              { id: 'ACTION', label: 'Action', time: 'T − 120' },
              { id: 'ACTION_TAKEN', label: 'Complete', time: 'T − 90' },
              { id: 'RESOLVED', label: 'Resolved', time: 'T − 0' }
            ].map((p, idx) => {
              const isActive = p.id === phase;
              const isCompleted = idx < phaseIdx;
              
              let dotColor = 'var(--border-strong)';
              if (isActive) {
                dotColor = p.id === 'RESOLVED' ? '#34d399' : p.id === 'ACTION' ? 'var(--color-warning-text)' : 'var(--accent-blue-light)';
              } else if (isCompleted) {
                dotColor = 'var(--accent-blue)';
              }
              
              return (
                <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative', zIndex: 2 }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: dotColor,
                    border: '2px solid var(--bg-depth-2)',
                    boxShadow: isActive ? '0 0 8px currentColor' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}></div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    marginTop: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em'
                  }}>{p.label}</span>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{p.time} min</span>
                </div>
              );
            })
          }
          <div style={{
            position: 'absolute',
            top: '15px',
            left: '8.3%',
            right: '8.3%',
            height: '2px',
            backgroundColor: 'var(--border-subtle)',
            zIndex: 1
          }}></div>
        </div>
      </div>

      {/* Policy Exposure metrics at bottom */}
      <div className="card">
        <div className="card-label">Policy Exposure Profile</div>
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
            <div className="metric-label">Flood Excess (Retained)</div>
            <div className="metric-value metric-value--blue">{fmt(policy.floodExcess)}</div>
          </div>
          <div className="metric-box">
            <div className="metric-label">Daily Downtime Cost</div>
            <div className="metric-value">{fmt(ev.dailyDowntimeCost)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
