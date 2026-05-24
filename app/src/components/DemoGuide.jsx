import React, { useState } from 'react';
import { useSimulation } from '../SimulationContext';

const STEPS = [
  {
    id: 'site',
    screen: 'SITE_EVENT',
    heading: 'Open the site',
    body: 'Navigate to Site Event View. Draw attention to the map-centered dashboard representing the place, pathway, assets at risk, and active drivers.',
    action: '→ Click "Site Event View" in the sidebar',
    note: 'This is the baseline (Normal/IDLE state). The river flow is normal, and all sensor readings are dry/normal.'
  },
  {
    id: 'rising',
    screen: 'SITE_EVENT',
    heading: 'Advance to water rising',
    body: 'Click "Simulate Time +" once. The state moves to RISING. The river level swells, and the Upstream Sensor (lead-time signal) is highlighted on the map.',
    action: '→ Click "Simulate Time +"',
    note: 'River Level is the active threat driver. The timeline updates to T-240 min.'
  },
  {
    id: 'watch',
    screen: 'SITE_EVENT',
    heading: 'Advance to Watch alert',
    body: 'Click "Simulate Time +" again. The state moves to WATCH. The perimeter drainage ditch fills with water, and the Drainage / Yard Low Point driver card activates.',
    action: '→ Click "Simulate Time +"',
    note: 'This represents pathway activation. Model Card triggers automatically showing active validation basis.'
  },
  {
    id: 'action',
    screen: 'SITE_EVENT',
    heading: 'Trigger the Action alert',
    body: 'Click "Simulate Time +" once more. The state moves to ACTION. Ingress reaches the loading bay asset impact point. Flashing warnings alert the site manager to deploy barriers.',
    action: '→ Click "Simulate Time +"',
    note: 'The Action/Runbook Card details the exact deployment parameters and timeline feasibility.'
  },
  {
    id: 'action_taken',
    screen: 'SITE_EVENT',
    heading: 'Mark the action complete',
    body: 'Click "Mark Action Complete" in the alert banner. The barrier location closes, blocking the pathway to the finished stock area and electrical substation.',
    action: '→ Click "Mark Action Complete"',
    note: 'The event automatically transitions to RESOLVED after 2 seconds.'
  },
  {
    id: 'ledger',
    screen: 'EVIDENCE',
    heading: 'Review the Evidence / Impact Ledger',
    body: 'Navigate to Evidence / Impact Ledger. Verify the complete chronological audit trail and the gross avoided loss calculation of £3,000,000.',
    action: '→ Click "Evidence / Impact Ledger" in sidebar',
    note: 'The verified action successfully protected the asset exposure from the simulated flood.'
  },
  {
    id: 'underwriter',
    screen: 'UNDERWRITER',
    heading: 'Present the Underwriter / Broker View',
    body: 'Navigate to Underwriter / Broker View. Present the £3m probable avoided retained loss. Discuss the 8 commercial metrics, causality status, and evidence gaps.',
    action: '→ Click "Underwriter / Broker View" in sidebar',
    note: 'This is the "meeting moment". All calculations are backed by the verified evidence pack.'
  },
  {
    id: 'contrast',
    screen: 'UNDERWRITER',
    heading: 'Show the contrast scenario',
    body: 'Click "Reset Simulation" at the bottom of the sidebar. The Underwriter / Broker View shifts to show the £3.5m unmitigated exposure state if no action had been recorded.',
    action: '→ Click "Reset Simulation" in sidebar',
    note: 'The £3m gap between the mitigated and unmitigated state demonstrates the value of the place-based mitigation system.'
  },
  {
    id: 'portfolio',
    screen: 'PORTFOLIO',
    heading: 'Teaser: the portfolio view',
    body: 'Navigate to Portfolio Teaser to show how risk mitigation visibility aggregates across a multi-site property portfolio.',
    action: '→ Click "Portfolio Teaser" in sidebar',
    note: 'Different sites exhibit varying survey completeness and confidence scores (Live, Partial, Stub).'
  }
];

export default function DemoGuide({ isOpen, onClose, onNavigate }) {
  const { phase } = useSimulation();

  // Determine which step is contextually active based on simulation phase
  const getActiveStep = () => {
    if (phase === 'IDLE') return 'site';
    if (phase === 'RISING') return 'rising';
    if (phase === 'WATCH') return 'watch';
    if (phase === 'ACTION') return 'action';
    if (phase === 'ACTION_TAKEN') return 'action_taken';
    if (phase === 'RESOLVED') return 'ledger';
    return 'site';
  };

  const activeStep = getActiveStep();

  return (
    <div className={`demo-guide-overlay ${isOpen ? '' : 'hidden'}`}>
      <div className="demo-guide__header">
        <div>
          <div className="demo-guide__title">Demo Guide</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Presenter mode — not for screen share</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="demo-guide__badge">v1.2</span>
          <button className="btn btn--ghost btn--sm" onClick={onClose} style={{ padding: '4px 8px' }}>✕</button>
        </div>
      </div>

      <div className="demo-guide__body">
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: 0, marginBottom: '16px', lineHeight: '1.6' }}>
          Follow these steps in order. The active step is highlighted based on simulation state.
        </p>

        {STEPS.map((step, i) => (
          <div
            key={step.id}
            className={`demo-step ${activeStep === step.id ? 'active' : ''}`}
          >
            <div className="demo-step__num">Step {i + 1}</div>
            <div className="demo-step__heading">{step.heading}</div>
            <div className="demo-step__body">{step.body}</div>
            <div className="demo-step__action">{step.action}</div>
            {step.note && (
              <div style={{
                marginTop: '8px',
                padding: '6px 10px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '4px',
                fontSize: '11.5px',
                color: 'var(--text-muted)',
                lineHeight: '1.5'
              }}>
                💡 {step.note}
              </div>
            )}
          </div>
        ))}

        <div style={{ marginTop: '8px', padding: '14px 16px', background: 'var(--bg-depth-3)', borderRadius: '6px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          <strong style={{ color: 'var(--text-secondary)' }}>Cautious language reminder</strong><br/>
          Use: simulated · survey-informed · probable · potential · subject to validation<br/>
          Avoid: proven · guaranteed · validated prediction · loss prevented · savings achieved
        </div>
      </div>
    </div>
  );
}
