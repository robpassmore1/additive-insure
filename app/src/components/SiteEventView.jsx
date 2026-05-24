import React, { useState, useEffect, useRef } from 'react';
import { useSimulation } from '../SimulationContext';
import siteData from '../../../fixtures/site.json';
import eventData from '../../../fixtures/event.json';

const fmt = (n) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);

export default function SiteEventView() {
  const { phase, advancePhase, completeAction } = useSimulation();
  const site = siteData.site;
  const policy = siteData.policy;
  const ev = eventData.event;

  // Selected driver card state
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

  // SVG states and classes
  const riverClass = phase === 'IDLE' ? '' : phase === 'RISING' ? 'rising' : phase === 'WATCH' ? 'watch' : (phase === 'ACTION' || phase === 'ACTION_TAKEN') ? 'action' : 'resolved';
  const ditchClass = phase === 'WATCH' ? 'watch' : (phase === 'ACTION' || phase === 'ACTION_TAKEN') ? 'action' : phase === 'RESOLVED' ? 'resolved' : '';
  const yardClass = phase === 'WATCH' ? 'watch' : (phase === 'ACTION' || phase === 'ACTION_TAKEN') ? 'action' : phase === 'RESOLVED' ? 'resolved' : '';
  const assetClass = (phase === 'ACTION') ? 'critical' : (phase === 'ACTION_TAKEN' || phase === 'RESOLVED') ? 'defended' : '';
  const barrierClass = (phase === 'ACTION_TAKEN' || phase === 'RESOLVED') ? 'deployed' : '';

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
        
        {/* Left Pane: Interactive SVG Schematic */}
        <div className="map-pane">
          <div className="schematic-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="card-label" style={{ margin: 0 }}>Interactive Site Schematic (Place-Based)</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Click markers to explore rationale</div>
            </div>
            
            <svg viewBox="0 0 280 180" className="schematic-svg">
              <rect width="280" height="180" className="map-bg" />
              
              {/* Grid overlay */}
              <g stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" strokeDasharray="2 4">
                <line x1="40" y1="0" x2="40" y2="180" />
                <line x1="80" y1="0" x2="80" y2="180" />
                <line x1="120" y1="0" x2="120" y2="180" />
                <line x1="160" y1="0" x2="160" y2="180" />
                <line x1="200" y1="0" x2="200" y2="180" />
                <line x1="240" y1="0" x2="240" y2="180" />
                <line x1="0" y1="30" x2="280" y2="30" />
                <line x1="0" y1="60" x2="280" y2="60" />
                <line x1="0" y1="90" x2="280" y2="90" />
                <line x1="0" y1="120" x2="280" y2="120" />
                <line x1="0" y1="150" x2="280" y2="150" />
              </g>

              {/* 1. River (Flood Source) */}
              <path d="M 25 0 Q 15 90 25 180" className={`map-river ${riverClass}`} />
              <text x="32" y="165" className="map-text label active">River (Flood Source)</text>

              {/* 2. Perimeter Ditch (Pathway Activation) */}
              <path d="M 22 70 L 100 70 L 100 135" className={`map-ditch ${ditchClass}`} />
              <text x="35" y="65" className={`map-text ${phaseIdx >= 2 ? 'active' : ''}`}>Perimeter Ditch (Pathway Activation)</text>

              {/* Yard Low Point (Water accumulation area) */}
              <polygon points="90,75 130,75 130,135 90,135" className={`map-yard-flood ${yardClass}`} />
              <text x="68" y="110" className={`map-text ${phaseIdx >= 2 ? 'active' : ''}`} style={{ fontSize: '6.5px' }}>Yard Low Point</text>

              {/* 3. Factory Asset Outer */}
              <rect x="150" y="30" width="115" height="120" rx="4" className={`map-asset ${assetClass}`} />
              <text x="160" y="42" className="map-text label active">Factory Facility</text>

              {/* Exposure at Risk: Electrical Substation */}
              <rect x="160" y="50" width="30" height="25" rx="2" className={`map-asset ${assetClass}`} />
              <text x="163" y="65" className="map-text" style={{ fontSize: '6px' }}>Substation</text>

              {/* Exposure at Risk: Stock Area */}
              <rect x="160" y="85" width="95" height="55" rx="2" className={`map-asset ${assetClass}`} />
              <text x="165" y="98" className="map-text" style={{ fontSize: '7px' }}>Finished Stock Area</text>
              <text x="165" y="108" className="map-text" style={{ fontSize: '6px', fill: 'var(--text-secondary)' }}>Exposure at Risk</text>

              {/* Asset Impact Point: Loading Bay Threshold */}
              <rect x="135" y="105" width="15" height="30" rx="1" className={`map-asset ${assetClass}`} />
              <text x="138" y="100" className="map-text" style={{ fontSize: '5.5px' }}>Loading Bay</text>

              {/* Mitigation Point: Defensive Barrier Line */}
              <line x1="135" y1="105" x2="135" y2="135" className={`map-barrier ${barrierClass}`} />
              <text x="82" y="152" className="map-text label">Barrier (Mitigation Point)</text>

              {/* Node Marker 1: Upstream Sensor (Lead-Time Signal) */}
              <circle
                cx="21"
                cy="35"
                r="6"
                className={`map-node ${selectedCard === 'river' ? 'selected' : ''} ${activeThreatNode === 'river' ? 'active-threat' : ''}`}
                onClick={() => handleMarkerClick('river')}
              />
              <text x="32" y="32" className="map-text active">Upstream Sensor (Signal)</text>

              {/* Node Marker 2: Rainfall Node (Hazard Driver) */}
              <circle
                cx="80"
                cy="25"
                r="6"
                className={`map-node ${selectedCard === 'rainfall' ? 'selected' : ''}`}
                onClick={() => handleMarkerClick('rainfall')}
              />
              <text x="90" y="22" className="map-text active">Rainfall Gauge (Driver)</text>

              {/* Node Marker 3: Drainage Ditch Sensor */}
              <circle
                cx="100"
                cy="90"
                r="6"
                className={`map-node ${selectedCard === 'drainage' ? 'selected' : ''} ${activeThreatNode === 'drainage' ? 'active-threat' : ''}`}
                onClick={() => handleMarkerClick('drainage')}
              />
              <text x="108" y="88" className={`map-text ${phaseIdx >= 2 ? 'active' : ''}`}>Ditch Sensor</text>

              {/* Node Marker 4: Loading Bay Threshold (Asset Impact Point) */}
              <circle
                cx="128"
                cy="120"
                r="6"
                className={`map-node ${selectedCard === 'loadingBay' ? 'selected' : ''} ${activeThreatNode === 'loadingBay' ? (phase === 'ACTION' ? 'critical-threat' : 'active-threat') : ''}`}
                onClick={() => handleMarkerClick('loadingBay')}
              />
              <text x="70" y="123" className={`map-text ${phaseIdx >= 3 ? 'active' : ''}`}>Loading Bay Ingress Sensor</text>
            </svg>
          </div>
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
