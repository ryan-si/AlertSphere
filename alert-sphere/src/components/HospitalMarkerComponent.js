import React from 'react';
import { Marker } from '@react-google-maps/api';

function HospitalMarkers({ hospitals, bounds }) {
    return (
      <>
        {hospitals.map(hospital => {
          const isValidCoordinate = typeof hospital.latitude === 'number' && typeof hospital.longitude === 'number';
          if (isValidCoordinate && bounds) {
            const hospitalPosition = new window.google.maps.LatLng(hospital.latitude, hospital.longitude);
            if (bounds.contains(hospitalPosition)) {
              return (
                <Marker
                  key={hospital.reporting_unit_name}
                  position={{ lat: hospital.latitude, lng: hospital.longitude }}
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                  }}
                  onClick={() => alert(hospital.reporting_unit_name)}
                />
              );
            }
          }
          return null;
        })}
      </>
    );
  }
  
  export default HospitalMarkers;