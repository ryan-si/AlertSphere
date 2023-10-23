import React, { useRef } from "react";
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

/* global google */
function MapComponent({ center, markerPosition, hospitals }) {

  const mapRef = useRef(null);
  const mapStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ];
  return (
    <GoogleMap
      defaultOptions={{ styles: mapStyles }}
      ref={map => {
        if (map) {
          mapRef.current = map.state.map;
        }
      }}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={12}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_BOTTOM,
        },
      }}
    >
      {hospitals.map(hospital => {
        const isValidCoordinate = typeof hospital.latitude === 'number' && typeof hospital.longitude === 'number';

        if (isValidCoordinate && mapRef.current) {
          const bounds = mapRef.current.getBounds();
          const hospitalPosition = new window.google.maps.LatLng(hospital.latitude, hospital.longitude);

          if (bounds && bounds.contains(hospitalPosition)) {
            return (
              <Marker
                key={hospital.reporting_unit_name}
                position={{ lat: hospital.latitude, lng: hospital.longitude }}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  fillColor: 'green',
                  fillOpacity: 1,
                  strokeWeight: 0,
                  scale: 10
                }}
                onClick={() => alert(hospital.reporting_unit_name)}
              />
            );
          }
        }
        return null;
      })}

      {markerPosition && (
        <Marker
          position={markerPosition}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'green',
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 5
          }}
        />
      )}
    </GoogleMap>
  );
}

export default MapComponent;
