import React, { useEffect } from 'react';
import { useMap } from './MapProvider';
import mapLayers from '../../../fixtures/map_layers.json';
import spatialObjects from '../../../fixtures/spatial_objects.json';

export default function ProductOverlays() {
  const { setOverlays } = useMap();

  useEffect(() => {
    setOverlays({
      siteBoundary: mapLayers.siteBoundary,
      riverLine: mapLayers.riverLine,
      floodPathway: mapLayers.floodPathway,
      objects: spatialObjects.objects
    });
  }, [setOverlays]);

  return null;
}
