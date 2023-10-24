import React from 'react';
import { Marker } from '@react-google-maps/api';
import { getColorForDisease } from './colorUtils';
function CaseMarkerComponent({ cases, bounds }) {
  return (
    <>
      {cases.map(caseItem => {
        const isValidCoordinate = typeof caseItem.latitude === 'number' && typeof caseItem.longitude === 'number';
        if (isValidCoordinate && bounds) {
          const casePosition = new window.google.maps.LatLng(caseItem.latitude, caseItem.longitude);
          if (bounds.contains(casePosition)) {
            const color = getColorForDisease(caseItem.disease_name);
            return (
              <Marker
                key={caseItem.case_id}
                position={{ lat: caseItem.latitude, lng: caseItem.longitude }}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: color,
                  fillOpacity: 1,
                  strokeWeight: 0,
                  scale: 6
                }}
              />
            );
          }
        }
        return null;
      })}
    </>
  );
}

export default CaseMarkerComponent;