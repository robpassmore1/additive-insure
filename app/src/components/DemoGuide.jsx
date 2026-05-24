import React, { useState } from 'react';
import { useSimulation } from '../SimulationContext';

const STEPS = [
  {
    id: 'site',
    screen: 'SITE_EVENT',
    heading: 'Open the site',
    body: 'Navigate to Site Event View. Draw attention to the FMCG hero site, its policy exposure — £50m property, £75m BI, £4m flood excess — and the daily downtime cost of £350k.',
    action: '→ Click "Site Event View" in the sidebar',
    note: 'This is the baseline. Nothing has happened yet. The policy is exposed to flood risk.'
  },
  {
    id: 'rising',
    screen: 'SITE_EVENT',
    heading: 'Advance to water rising',
    body: 'Click "Simulate Time +" once. The status badge changes to RISING. A second timeline entry appears: water rising at the property perimeter, probability of ingress increasing.',
    action: '→ Click "Simulate Time +"',
    note: 'The simulated event is survey-informed. This is not live sensor data.'
  },
  {
    id: 'alert',
    screen: 'SITE_EVENT',
    heading: 'Trigger the Watch / Action Alert',
    body: 'Click "Simulate Time +" again. Status moves to ALERT. The critical threshold entry appears on the timeline, showing a projected loss without action of £3.5m. The amber action banner surfaces.',
    action: '→ Click "Simulate Time +" again',
    note: 'This is the decision window. The action logistics support execution within minimum time.'
  },
  {
    id: 'action',
    screen: 'SITE_EVENT',
    heading: 'Mark the action complete',
    body: 'The action required is: deploy temporary flood barriers at the loading bay. This costs £25k and requires 120 minutes minimum. Click "Mark Action Complete" to record it.',
    action: '→ Click "Mark Action Complete"',
    note: 'The event auto-resolves after 2 seconds. The green Event Resolved banner confirms closure.'
  },
  {
    id: 'ledger',
    screen: 'EVIDENCE',
    heading: 'Review the Evidence / Impact Ledger',
    body: 'Navigate to Evidence / Impact Ledger. The impact ledger is now populated: predicted loss without action £3.5m, with action £500k, gross avoided loss £3m. Hydrological causality is probable. Evidence confidence is probable avoided loss.',
    action: '→ Click "Evidence / Impact Ledger" in sidebar',
    note: 'This is the evidence layer. Draw attention to the lead time model: p50 is 240 minutes — the action was feasible within the window.'
  },
  {
    id: 'underwriter',
    screen: 'UNDERWRITER',
    heading: 'Present the Underwriter / Broker View',
    body: 'Navigate to Underwriter / Broker View. This is the meeting moment. Lead with the £3m probable avoided retained loss. Flood excess is £4m — the entire retained loss sits inside the excess. Action cost is £25k.',
    action: '→ Click "Underwriter / Broker View" in sidebar',
    note: 'Emphasise the evidence quality row: causality probable, confidence probable avoided loss, status not operationally validated. These are explicit qualifiers, not overclaims.'
  },
  {
    id: 'contrast',
    screen: 'UNDERWRITER',
    heading: 'Show the contrast scenario',
    body: 'Click "Reset Simulation" at the bottom of the sidebar. The Underwriter / Broker View now shows the no-action state: £3.5m probable retained exposure in amber, evidence confidence "No action recorded", and "Awaiting event outcome".',
    action: '→ Click "Reset Simulation" in sidebar',
    note: 'This contrast is the product argument: without a recorded and evidenced action, the retained exposure stands. The £3m gap is the demonstrable value of the action.'
  },
  {
    id: 'portfolio',
    screen: 'PORTFOLIO',
    heading: 'Teaser: the portfolio view',
    body: 'Navigate to Portfolio Teaser. Show the four-row portfolio: the FMCG hero site (live), the logistics contrast site (partial survey, inconclusive), and two stub rows — water utility and transport hub.',
    action: '→ Click "Portfolio Teaser" in sidebar',
    note: 'This is a teaser only. The partial and stub rows are scoping-phase indicators, not live scenarios.'
  }
];

export default function DemoGuide({ isOpen, onClose, onNavigate }) {
  const { phase } = useSimulation();

  // Determine which step is contextually active based on simulation phase
  const getActiveStep = () => {
    if (phase === 'IDLE') return 'site';
    if (phase === 'RISING') return 'rising';
    if (phase === 'ALERT') return 'alert';
    if (phase === 'ACTION_TAKEN') return 'action';
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
          <span className="demo-guide__badge">v1.1</span>
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
