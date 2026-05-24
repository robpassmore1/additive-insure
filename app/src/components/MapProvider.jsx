import React, { createContext, useContext, useState } from 'react';

const MapContext = createContext();

export const MapProvider = ({ children, selectedId, onMarkerClick, phase }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [providerType, setProviderType] = useState('fallback'); // 'google' | 'fallback'
  const [overlays, setOverlays] = useState({
    siteBoundary: [],
    riverLine: [],
    floodPathway: [],
    objects: []
  });

  return (
    <MapContext.Provider value={{
      mapInstance,
      setMapInstance,
      providerType,
      setProviderType,
      overlays,
      setOverlays,
      selectedId,
      onMarkerClick,
      phase
    }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);
