import React from 'react';
import { MapProvider } from './MapProvider';
import GoogleMapProvider from './GoogleMapProvider';
import LocalFallbackMapProvider from './LocalFallbackMapProvider';
import ProductOverlays from './ProductOverlays';

export default function SiteContextMap({ selectedId, onMarkerClick, phase }) {
  const provider = import.meta.env.VITE_MAP_PROVIDER || 'fallback';
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Use Google Maps only if provider is explicitly set and API key is present
  const useGoogleMaps = provider === 'google' && !!apiKey;

  return (
    <MapProvider selectedId={selectedId} onMarkerClick={onMarkerClick} phase={phase}>
      <ProductOverlays />
      <MapContainer useGoogleMaps={useGoogleMaps} />
    </MapProvider>
  );
}

function MapContainer({ useGoogleMaps }) {
  return useGoogleMaps ? <GoogleMapProvider /> : <LocalFallbackMapProvider />;
}
