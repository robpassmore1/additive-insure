import React, { useEffect } from 'react';
import { useMap } from './MapProvider';
import mapLayers from '../../../fixtures/map_layers.json';

export default function LocalFallbackMapProvider() {
  const { setMapInstance, setProviderType, overlays, selectedId, onMarkerClick, phase } = useMap();
  const { map, mockRoads } = mapLayers;
  const { siteBoundary, riverLine, floodPathway, objects } = overlays;

  useEffect(() => {
    setProviderType('fallback');
    setMapInstance('fallback-canvas');
  }, [setProviderType, setMapInstance]);

  // Simple Mercator-like linear projection for a micro-region
  const project = (coord) => {
    const latDiff = coord.lat - map.centre.lat;
    const lngDiff = coord.lng - map.centre.lng;
    
    // Scale factors to map lat/lng differences onto a 280x180 SVG canvas
    const scaleX = 27000;
    const scaleY = 32000;
    
    const x = 140 + (lngDiff * scaleX);
    const y = 90 - (latDiff * scaleY);
    return { x, y };
  };

  const getPointsStr = (coords) => {
    if (!coords || coords.length === 0) return '';
    return coords.map(c => {
      const { x, y } = project(c);
      return `${x},${y}`;
    }).join(' ');
  };

  const getPathD = (coords) => {
    if (!coords || coords.length === 0) return '';
    return coords.reduce((acc, c, idx) => {
      const { x, y } = project(c);
      return acc + (idx === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    }, '');
  };

  // State index for visual progress
  const phases = ['IDLE', 'RISING', 'WATCH', 'ACTION', 'ACTION_TAKEN', 'RESOLVED'];
  const phaseIdx = phases.indexOf(phase);

  // SVG states and classes
  const riverClass = phase === 'IDLE' ? '' : phase === 'RISING' ? 'rising' : phase === 'WATCH' ? 'watch' : (phase === 'ACTION' || phase === 'ACTION_TAKEN') ? 'action' : 'resolved';
  const ditchClass = phase === 'WATCH' ? 'watch' : (phase === 'ACTION' || phase === 'ACTION_TAKEN') ? 'action' : phase === 'RESOLVED' ? 'resolved' : '';
  const yardClass = phase === 'WATCH' ? 'watch' : (phase === 'ACTION' || phase === 'ACTION_TAKEN') ? 'action' : phase === 'RESOLVED' ? 'resolved' : '';
  const assetClass = (phase === 'ACTION') ? 'critical' : (phase === 'ACTION_TAKEN' || phase === 'RESOLVED') ? 'defended' : '';
  const barrierClass = (phase === 'ACTION_TAKEN' || phase === 'RESOLVED') ? 'deployed' : '';

  // Get active threat indicator node
  const activeThreatNode = {
    RISING: 'river',
    WATCH: 'drainage',
    ACTION: 'loadingBay',
    ACTION_TAKEN: 'loadingBay'
  }[phase] || null;

  return (
    <div className="schematic-box">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="card-label" style={{ margin: 0 }}>Local Fallback Renderer</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Real coordinates · Projected SVG</div>
      </div>
      
      <svg viewBox="0 0 280 180" className="schematic-svg">
        <rect width="280" height="180" className="map-bg" />
        
        {/* Mock background roads for geographic context */}
        {mockRoads.map((road, i) => (
          <path
            key={i}
            d={getPathD(road.points)}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="2 3"
          />
        ))}

        {/* 1. River (Flood Source) */}
        {riverLine && riverLine.length > 0 && (
          <>
            <path d={getPathD(riverLine)} className={`map-river ${riverClass}`} />
            <text x="32" y="165" className="map-text label active">River (Flood Source)</text>
          </>
        )}

        {/* 2. Perimeter Ditch (Pathway Activation) & Yard Low Point */}
        {floodPathway && floodPathway.length > 0 && (
          <>
            <path d={getPathD(floodPathway.slice(0, 3))} className={`map-ditch ${ditchClass}`} />
            <text x="35" y="65" className={`map-text ${phaseIdx >= 2 ? 'active' : ''}`}>Perimeter Ditch (Pathway Activation)</text>

            {/* Yard Low Point flood overlay polygon (uses the pathway nodes boundary) */}
            {(() => {
              const p1 = project(floodPathway[1]);
              const p2 = project(floodPathway[2]);
              return (
                <polygon
                  points={`${p1.x - 15},${p1.y} ${p1.x + 20},${p1.y} ${p2.x + 10},${p2.y} ${p2.x - 20},${p2.y}`}
                  className={`map-yard-flood ${yardClass}`}
                />
              );
            })()}
            <text x="68" y="110" className={`map-text ${phaseIdx >= 2 ? 'active' : ''}`} style={{ fontSize: '6.5px' }}>Yard Low Point</text>
          </>
        )}

        {/* 3. Site/Factory Boundary Polygon */}
        {siteBoundary && siteBoundary.length > 0 && (
          <>
            <polygon points={getPointsStr(siteBoundary)} className={`map-asset ${assetClass}`} style={{ strokeWidth: '1px', fillOpacity: 0.02 }} />
            <text x="160" y="42" className="map-text label active">Factory Site Boundary</text>
          </>
        )}

        {/* 4. Substation (Exposure) */}
        {(() => {
          const substationObj = objects.find(o => o.id === 'substation');
          if (!substationObj) return null;
          const { x, y } = project(substationObj.coord);
          return (
            <g key="substation-group">
              <rect x={x - 12} y={y - 10} width="24" height="20" rx="1.5" className={`map-asset ${assetClass}`} />
              <text x={x - 10} y={y + 3} className="map-text" style={{ fontSize: '5px' }}>Substation</text>
            </g>
          );
        })()}

        {/* 5. Stock Area (Exposure) */}
        {(() => {
          const stockObj = objects.find(o => o.id === 'stockArea');
          if (!stockObj) return null;
          const { x, y } = project(stockObj.coord);
          return (
            <g key="stock-group">
              <rect x={x - 25} y={y - 20} width="50" height="40" rx="2" className={`map-asset ${assetClass}`} />
              <text x={x - 22} y={y - 2} className="map-text" style={{ fontSize: '6px' }}>Finished Stock</text>
              <text x={x - 22} y={y + 8} className="map-text" style={{ fontSize: '5px', fill: 'var(--text-secondary)' }}>Exposure at Risk</text>
            </g>
          );
        })()}

        {/* 6. Loading Bay (Asset Impact Point) */}
        {(() => {
          const loadingBayObj = objects.find(o => o.id === 'loadingBay');
          if (!loadingBayObj) return null;
          const { x, y } = project(loadingBayObj.coord);
          return (
            <g key="loading-bay-group">
              <rect x={x - 8} y={y - 12} width="16" height="24" rx="1" className={`map-asset ${assetClass}`} />
              <text x={x - 7} y={y - 16} className="map-text" style={{ fontSize: '5.5px' }}>Loading Bay</text>
            </g>
          );
        })()}

        {/* 7. Barrier Defensive Line (Mitigation Point) */}
        {(() => {
          const barrierObj = objects.find(o => o.id === 'barrier');
          if (!barrierObj) return null;
          const { x, y } = project(barrierObj.coord);
          return (
            <g key="barrier-group">
              <line x1={x - 8} y1={y - 12} x2={x - 8} y2={y + 12} className={`map-barrier ${barrierClass}`} />
              <text x={x - 55} y={y + 20} className="map-text label">Barrier (Mitigation Point)</text>
            </g>
          );
        })()}

        {/* 8. Interactive Node Markers */}
        {objects.map(obj => {
          if (obj.id === 'substation' || obj.id === 'stockArea' || obj.id === 'barrier') return null;
          const { x, y } = project(obj.coord);
          const isSelected = selectedId === obj.id;
          
          let threatClass = '';
          if (activeThreatNode === obj.id) {
            threatClass = phase === 'ACTION' ? 'critical-threat' : 'active-threat';
          }

          return (
            <g key={obj.id} onClick={() => onMarkerClick(obj.id)}>
              <circle
                cx={x}
                cy={y}
                r="6"
                className={`map-node ${isSelected ? 'selected' : ''} ${threatClass}`}
              />
              <text x={x + 9} y={y + 3} className={`map-text ${isSelected || activeThreatNode === obj.id ? 'active' : ''}`}>
                {obj.name.split(' ')[0]} {obj.type === 'sensor' ? 'Gauge' : 'Node'}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
