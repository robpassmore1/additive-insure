import React from 'react';
import portfolioData from '../../../fixtures/portfolio.json';

const fmt = (n, opts = {}) => {
  if (n === null || n === undefined) return '—';
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0, ...opts }).format(n);
};

const STATUS_CONFIG = {
  live:    { badge: 'badge--live',    icon: '●' },
  partial: { badge: 'badge--partial', icon: '◐' },
  stub:    { badge: 'badge--stub',    icon: '○' }
};

const CONFIDENCE_COLOUR = {
  'Probable avoided loss':          'es-val--green',
  'Inconclusive — survey incomplete': 'es-val--amber',
  null: 'es-val--muted'
};

const CAUSALITY_COLOUR = {
  'Probable':   'evidence-item__value--blue',
  'Uncertain':  'evidence-item__value--amber',
  null: 'evidence-item__value--muted'
};

export default function PortfolioView() {
  const sites = portfolioData.portfolio;

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Portfolio Teaser</div>
        <div className="page-subtitle">
          Survey-informed site register — simulated demonstrator only. Not operationally validated.
        </div>
      </div>

      {/* Summary strip */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="metric-grid">
          <div className="metric-box">
            <div className="metric-label">Sites registered</div>
            <div className="metric-value">{sites.length}</div>
          </div>
          <div className="metric-box">
            <div className="metric-label">Live scenarios</div>
            <div className="metric-value metric-value--green">{sites.filter(s => s.status === 'live').length}</div>
          </div>
          <div className="metric-box">
            <div className="metric-label">Partial surveys</div>
            <div className="metric-value metric-value--amber">{sites.filter(s => s.status === 'partial').length}</div>
          </div>
          <div className="metric-box">
            <div className="metric-label">Scoping only</div>
            <div className="metric-value metric-value--muted">{sites.filter(s => s.status === 'stub').length}</div>
          </div>
        </div>
      </div>

      {/* Site cards */}
      {sites.map(site => {
        const cfg = STATUS_CONFIG[site.status];
        const isStub = site.status === 'stub';
        const isPartial = site.status === 'partial';

        return (
          <div
            key={site.id}
            className={`card ${isStub ? 'card--muted' : ''}`}
            style={site.status === 'live' ? { borderColor: 'var(--accent-blue)', background: 'linear-gradient(135deg,rgba(37,99,235,0.07) 0%,rgba(37,99,235,0.02) 100%)' } : {}}
          >
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '12px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: isStub ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                    {site.name}
                  </span>
                  <span className={`badge ${cfg.badge}`}>{cfg.icon} {site.statusLabel}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {site.sector} · {site.location}
                </div>
              </div>
            </div>

            {/* Metrics grid */}
            <div className={`metric-grid${isStub ? ' metric-grid--tight' : ''}`} style={{ marginBottom: '12px' }}>
              <div className="metric-box">
                <div className="metric-label">Property SI</div>
                <div className={`metric-value metric-value--sm ${isStub ? 'metric-value--muted' : ''}`}>
                  {fmt(site.propertySI)}
                </div>
              </div>
              <div className="metric-box">
                <div className="metric-label">BI Sum Insured</div>
                <div className={`metric-value metric-value--sm ${!site.biSI ? 'metric-value--muted' : ''}`}>
                  {fmt(site.biSI)}
                </div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Flood Excess</div>
                <div className={`metric-value metric-value--sm ${!site.floodExcess ? 'metric-value--muted' : ''}`}>
                  {fmt(site.floodExcess)}
                </div>
              </div>
              <div className="metric-box">
                <div className="metric-label">Probable Avoided Retained Loss</div>
                <div className={`metric-value metric-value--sm ${site.probableAvoidedRetainedLoss ? 'metric-value--green' : 'metric-value--muted'}`}>
                  {fmt(site.probableAvoidedRetainedLoss)}
                </div>
              </div>
            </div>

            {/* Evidence quality strip */}
            {!isStub && (
              <div className="evidence-row" style={{ paddingTop: '12px', marginTop: '12px' }}>
                <div className="evidence-item">
                  <div className="evidence-item__label">Hydrological Causality</div>
                  <div className={`evidence-item__value ${CAUSALITY_COLOUR[site.hydrologicalCausality] || 'evidence-item__value--muted'}`}>
                    {site.hydrologicalCausality || '—'}
                  </div>
                </div>
                <div className="evidence-item">
                  <div className="evidence-item__label">Evidence Confidence</div>
                  <div className={`evidence-item__value ${
                    site.evidenceConfidence === 'Probable avoided loss' ? 'evidence-item__value--green' :
                    site.evidenceConfidence ? 'evidence-item__value--amber' : 'evidence-item__value--muted'
                  }`}>
                    {site.evidenceConfidence || '—'}
                  </div>
                </div>
                <div className="evidence-item">
                  <div className="evidence-item__label">Action Available</div>
                  <div className={`evidence-item__value ${site.actionAvailable ? 'evidence-item__value--green' : 'evidence-item__value--amber'}`}>
                    {site.actionAvailable ? 'Yes' : 'Not confirmed'}
                  </div>
                </div>
              </div>
            )}

            {/* Note */}
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {site.note}
            </div>
          </div>
        );
      })}

      <div className="disclaimer-box" style={{ marginTop: '8px' }}>
        <strong style={{ color: 'var(--text-secondary)' }}>Portfolio teaser — Sprint 002 scope.</strong> This register is a demonstrator view only. All sites are simulated. No live sensor data, flood model, or claims workflow is connected. Values marked — are not yet available at this stage of engagement. This is not an operational portfolio management tool.
      </div>
    </div>
  );
}
