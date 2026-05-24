import React from 'react';
import GoogleMapProvider from './GoogleMapProvider';
import LocalFallbackMapProvider from './LocalFallbackMapProvider';

export default function SiteContextMap({ selectedId, onMarkerClick, phase }) {
  const provider = import.meta.env.VITE_MAP_PROVIDER || 'fallback';
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Use Google Maps only if provider is explicitly set and API key is present
  const useGoogleMaps = provider === 'google' && !!apiKey;

  if (useGoogleMaps) {
    return (
      <GoogleMapProvider
        selectedId={selectedId}
        onMarkerClick={onMarkerClick}
        phase={phase}
      />
    );
  }

  return (
    <LocalFallbackMapProvider
      selectedId={selectedId}
      onMarkerClick={onMarkerClick}
      phase={phase}
    />
  );
}
