import React, { useEffect, useRef } from 'react';
import { useMap } from './MapProvider';
import mapLayers from '../../../fixtures/map_layers.json';

export default function GoogleMapProvider() {
  const mapRef = useRef(null);
  const { setMapInstance, setProviderType, overlays, selectedId, onMarkerClick, phase } = useMap();
  const { map: mapConfig } = mapLayers;
  const { siteBoundary, riverLine, floodPathway, objects } = overlays;

  useEffect(() => {
    setProviderType('google');
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    // Load Google Maps API script
    const scriptId = 'google-maps-script';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else {
      // Script already loaded, trigger initMap directly if SDK loaded
      if (window.google && window.google.maps) {
        setTimeout(() => {
          if (window.initGoogleMap) window.initGoogleMap();
        }, 100);
      }
    }

    window.initGoogleMap = () => {
      if (!mapRef.current || !window.google || !window.google.maps) return;
      
      const mapOptions = {
        center: mapConfig.centre,
        zoom: mapConfig.zoom,
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#090d13' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#090d13' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#8892a4' }] },
          { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#1c2230' }] },
          { featureType: 'poi', stylers: [{ visibility: 'off' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#161b22' }] },
          { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#4a5568' }] },
          { featureType: 'transit', stylers: [{ visibility: 'off' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0b0f16' }] }
        ]
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      setMapInstance(map);

      // 1. Site Boundary Polygon
      if (siteBoundary && siteBoundary.length > 0) {
        new window.google.maps.Polygon({
          paths: siteBoundary,
          strokeColor: '#3d4f66',
          strokeOpacity: 0.8,
          strokeWeight: 1.5,
          fillColor: phase === 'ACTION' ? '#dc2626' : (phase === 'ACTION_TAKEN' || phase === 'RESOLVED') ? '#059669' : '#2563eb',
          fillOpacity: 0.08,
          map: map
        });
      }

      // 2. River Line
      if (riverLine && riverLine.length > 0) {
        let riverColor = '#161b22';
        if (phase === 'RISING') riverColor = '#2563eb';
        if (phase === 'WATCH') riverColor = '#1d4ed8';
        if (phase === 'ACTION' || phase === 'ACTION_TAKEN') riverColor = '#1e40af';

        new window.google.maps.Polyline({
          path: riverLine,
          geodesic: true,
          strokeColor: riverColor,
          strokeOpacity: 1.0,
          strokeWeight: 6,
          map: map
        });
      }

      // 3. Flood Pathway Polyline
      if (floodPathway && floodPathway.length > 0) {
        let pathwayColor = 'transparent';
        let pathwayWeight = 0;
        if (phase === 'WATCH') {
          pathwayColor = '#d97706';
          pathwayWeight = 3;
        } else if (phase === 'ACTION' || phase === 'ACTION_TAKEN') {
          pathwayColor = '#b45309';
          pathwayWeight = 4;
        } else if (phase === 'RESOLVED') {
          pathwayColor = '#047857';
          pathwayWeight = 3;
        }

        if (pathwayWeight > 0) {
          new window.google.maps.Polyline({
            path: floodPathway,
            geodesic: true,
            strokeColor: pathwayColor,
            strokeOpacity: 0.8,
            strokeWeight: pathwayWeight,
            map: map
          });
        }
      }

      // 4. Object Markers
      if (objects && objects.length > 0) {
        objects.forEach(obj => {
          const isSelected = selectedId === obj.id;
          
          let markerColor = '#1e293b';
          let scale = 6;
          
          const activeThreatNode = {
            RISING: 'river',
            WATCH: 'drainage',
            ACTION: 'loadingBay',
            ACTION_TAKEN: 'loadingBay'
          }[phase] || null;

          if (isSelected) {
            markerColor = '#3b82f6';
            scale = 8;
          } else if (activeThreatNode === obj.id) {
            markerColor = phase === 'ACTION' ? '#f87171' : '#fbbf24';
            scale = 7;
          }

          const marker = new window.google.maps.Marker({
            position: obj.coord,
            map: map,
            title: `${obj.name} (${obj.role})`,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: scale,
              fillColor: markerColor,
              fillOpacity: 1,
              strokeColor: isSelected ? '#ffffff' : '#8892a4',
              strokeWeight: isSelected ? 2 : 1
            }
          });

          marker.addListener('click', () => {
            onMarkerClick(obj.id);
          });
        });
      }
    };

    return () => {
      delete window.initGoogleMap;
    };
  }, [phase, selectedId, siteBoundary, riverLine, floodPathway, objects, setMapInstance, setProviderType, onMarkerClick]);

  return (
    <div className="schematic-box">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div className="card-label" style={{ margin: 0 }}>Google Maps Interface</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>GIS Overlays Active</div>
      </div>
      <div ref={mapRef} style={{ width: '100%', height: '170px', borderRadius: '6px', background: '#090d13' }}></div>
    </div>
  );
}
