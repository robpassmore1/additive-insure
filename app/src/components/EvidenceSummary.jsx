import React from 'react';
import siteData from '../../../fixtures/site.json';
import eventData from '../../../fixtures/event.json';
import { useSimulation } from '../SimulationContext';

const fmt = (n) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);
const now = () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

export default function EvidenceSummary() {
  const { phase } = useSimulation();
  const site = siteData.site;
  const policy = siteData.policy;
  const ev = eventData.event;
  const resolved = phase === 'RESOLVED';

  const handlePrint = () => window.print();

  return (
    <div className="evidence-summary">
      {/* Screen-only header with print button */}
      <div className="sim-bar btn--no-print">
        <div className="sim-bar__left">
          <div className="page-title">Evidence Summary</div>
          <div className="page-subtitle">
            Printable resilience action record — survey-informed, simulated, subject to validation
          </div>
        </div>
        <div className="sim-bar__right">
          <button className="btn btn--secondary" onClick={handlePrint}>
            Print / Export HTML
          </button>
        </div>
      </div>

      {/* Print-friendly document */}
      <div id="evidence-print-body">

        {/* Document header */}
        <div className="card" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                Additive Insure — Resilience Action Record
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Version 1.2 · Place-Based ALT Demonstrator · {now()}
              </div>
            </div>
            <div>
              {resolved
                ? <span className="badge badge--resolved">Event Resolved</span>
                : <span className="badge badge--idle">Awaiting resolution</span>
              }
            </div>
          </div>
        </div>

        {/* Site & Policy */}
        <div className="evidence-summary-section">
          <div className="evidence-summary-title">Site & Policy Exposure</div>
          <div className="es-row">
            <span className="es-key">Site</span>
            <span className="es-val">{site.name}</span>
          </div>
          <div className="es-row">
            <span className="es-key">Property Sum Insured</span>
            <span className="es-val">{fmt(policy.propertySumInsured)}</span>
          </div>
          <div className="es-row">
            <span className="es-key">Business Interruption Sum Insured</span>
            <span className="es-val">{fmt(policy.businessInterruptionSumInsured)}</span>
          </div>
          <div className="es-row">
            <span className="es-key">Flood Excess</span>
            <span className="es-val">{fmt(policy.floodExcess)}</span>
          </div>
          <div className="es-row">
            <span className="es-key">Daily Downtime Cost</span>
            <span className="es-val">{fmt(ev.dailyDowntimeCost)}</span>
          </div>
          <div className="es-row">
            <span className="es-key">Coverage Position</span>
            <span className="es-val es-val--blue">{ev.coveragePosition}</span>
          </div>
        </div>

        {/* Resilience Action */}
        <div className="evidence-summary-section">
          <div className="evidence-summary-title">Resilience Action</div>
          <div className="es-row">
            <span className="es-key">Action</span>
            <span className="es-val">{ev.action}</span>
          </div>
          <div className="es-row">
            <span className="es-key">Action Cost</span>
            <span className="es-val">{fmt(ev.actionCost)}</span>
          </div>
          <div className="es-row">
            <span className="es-key">Minimum Execution Time</span>
            <span className="es-val">{ev.minimumActionTime} minutes</span>
          </div>
        </div>

        {/* Lead Time Model */}
        <div className="evidence-summary-section">
          <div className="evidence-summary-title">Lead Time Model — Survey-Informed</div>
          <div className="es-row">
            <span className="es-key">p10 lead time (optimistic)</span>
            <span className="es-val">{ev.leadTimes.p10} minutes</span>
          </div>
          <div className="es-row">
            <span className="es-key">p50 lead time (central estimate)</span>
            <span className="es-val">{ev.leadTimes.p50} minutes</span>
          </div>
          <div className="es-row">
            <span className="es-key">p90 lead time (conservative)</span>
            <span className="es-val">{ev.leadTimes.p90} minutes</span>
          </div>
        </div>

        {/* Loss estimates */}
        <div className="evidence-summary-section">
          <div className="evidence-summary-title">Simulated Loss Estimates</div>
          <div className="es-row">
            <span className="es-key">Predicted loss without action</span>
            <span className="es-val es-val--amber">{fmt(ev.predictedLossWithoutAction)}</span>
          </div>
          <div className="es-row">
            <span className="es-key">Predicted loss with action</span>
            <span className="es-val">{fmt(ev.predictedLossWithAction)}</span>
          </div>
          <div className="es-row">
            <span className="es-key">Gross avoided loss</span>
            <span className="es-val es-val--green">{fmt(ev.grossAvoidedLoss)}</span>
          </div>
          <div className="es-row" style={{ paddingTop: '12px', marginTop: '8px', borderTop: '1px solid var(--border-strong)' }}>
            <span className="es-key" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Probable avoided retained loss</span>
            <span className="es-val es-val--green" style={{ fontSize: '18px' }}>{fmt(ev.retainedLossAvoided)}</span>
          </div>
        </div>

        {/* Evidence quality */}
        <div className="evidence-summary-section">
          <div className="evidence-summary-title">Evidence Quality</div>
          <div className="es-row">
            <span className="es-key">Hydrological causality</span>
            <span className="es-val es-val--blue">{ev.hydrologicalCausality}</span>
          </div>
          <div className="es-row">
            <span className="es-key">Evidence confidence</span>
            <span className="es-val es-val--green">{ev.evidenceConfidence}</span>
          </div>
          <div className="es-row">
            <span className="es-key">Validation status</span>
            <span className="es-val es-val--amber">Not operationally validated</span>
          </div>
          <div className="es-row">
            <span className="es-key">Hydrological uncertainty</span>
            <span className="es-val es-val--muted">Applies</span>
          </div>
        </div>

        {/* Evidence gaps */}
        <div className="evidence-summary-section">
          <div className="evidence-summary-title">Evidence Gaps</div>
          {[
            'Simulated event only — no live sensor data',
            'Survey-informed flood pathway — not field-validated sensor placement',
            'No live flood model or NWP forecast integration',
            'Lead time distributions illustrative — not calibrated to historical data',
            'No claims workflow or premium/pricing engine connected',
          ].map((gap, i) => (
            <div className="es-row" key={i}>
              <span className="es-key">{gap}</span>
              <span className="es-val es-val--muted">Acknowledged</span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="disclaimer-box">
          <strong>Important notice.</strong> This evidence summary is generated from a controlled demonstrator using simulated data and survey-informed assumptions. It does not constitute an operationally validated loss assessment, a claims record, a policy endorsement, or a pricing recommendation. All values are subject to validation. Hydrological uncertainty applies throughout. This document is for internal review and demonstrator purposes only. Version: Additive Insure 1.2 · Sprint 003.
        </div>
      </div>
    </div>
  );
}
