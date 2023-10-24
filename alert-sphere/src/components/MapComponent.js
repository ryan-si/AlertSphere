import React, { useRef, useState } from "react";
import { GoogleMap, Marker } from '@react-google-maps/api';
//import useCases from "../hooks/useCases";

function MapComponent({ center, hospitals, cases, onHospitalChange }) {

  //const cases = useCases();
  const mapRef = useRef(null);

  const [bounds, setBounds] = useState(null);
  const handleBoundsChanged = () => {
    if (mapRef.current) {
      const newBounds = mapRef.current.getBounds();
      if (!bounds || !newBounds.equals(bounds)) {
        setBounds(newBounds);

        const hospitalsCount = hospitals.filter(hospital => {
          const isValidCoordinate = typeof hospital.latitude === 'number' && typeof hospital.longitude === 'number';
          if (isValidCoordinate) {
            const hospitalPosition = new window.google.maps.LatLng(hospital.latitude, hospital.longitude);
            return newBounds.contains(hospitalPosition);
          }
          return false;
        }).length;

        onHospitalChange(hospitalsCount);  // Pass the count to the parent component
      }
    }
  };

  return (
    <GoogleMap
      ref={map => {
        if (map) {
          mapRef.current = map.state.map;
        }
      }}
      onBoundsChanged={handleBoundsChanged}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={15}
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
      {
        <Marker
          position={center}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
        />

      }
      {/*cases.map(caseItem => (
        <Marker
          key={caseItem.case_id}
          position={{ lat: caseItem.latitude, lng: caseItem.longitude }}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 5
          }}
          onClick={() => {
            // Fetch disease_name from the backend and display it
            fetch(`http://10.19.229.4:8080/emergency/disease/${caseItem.disease_id}`)
              .then(response => response.json())
              .then(data => {
                // Display disease_name
                alert(`Case ID: ${caseItem.case_id}, Disease: ${data.data.disease_name}`);
              });
          }}
        />
        ))*/}
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
                  url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                }}
                onClick={() => alert(hospital.reporting_unit_name)}
              />
            );
          }
        }
        return null;
      })}




    </GoogleMap>
  );
}

export default MapComponent;
