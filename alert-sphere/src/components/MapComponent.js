import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { getColorForDisease } from "../utils/colorUtils";
//import CenterMarkerComponent from './CenterMarkerComponent';
import HospitalMarkerComponent from "./HospitalMarkerComponent";
import CaseMarkerComponent from "./CaseMarkerComponent";
/*global google*/
function MapComponent({
  center,
  hospitals,
  onHospitalChange,
  onCaseChange,
  cases,
}) {
  const mapRef = useRef(null);
  const [setCases] = useState([]);
  const [bounds, setBounds] = useState(null);
  // let mapzoom = 15;
  useEffect(() => {
    if (mapRef.current) {
      handleBoundsChanged();
    }
  }, [mapRef.current]);

  const handleMapLoad = (map) => {
    mapRef.current = map;
    // mapzoom = 15;
    handleBoundsChanged();
  };

  const handleBoundsChanged = () => {
    if (mapRef.current) {
      const newBounds = mapRef.current.getBounds();
      if (!bounds || !newBounds.equals(bounds)) {
        setBounds(newBounds);
        const hospitalsCount = hospitals.filter((hospital) => {
          const hospitalPosition = new window.google.maps.LatLng(
            hospital.latitude,
            hospital.longitude
          );
          return newBounds.contains(hospitalPosition);
        }).length;
        onHospitalChange(hospitalsCount);

        const casesWithinBounds = cases.filter((caseItem) => {
          caseItem.latitude = parseFloat(caseItem.latitude);
          caseItem.longitude = parseFloat(caseItem.longitude);
          const casePosition = new window.google.maps.LatLng(
            caseItem.latitude,
            caseItem.longitude
          );
          return newBounds.contains(casePosition);
        });

        // Group by disease name and count
        const casesCount = casesWithinBounds.reduce((acc, caseItem) => {
          acc[caseItem.disease_name] = (acc[caseItem.disease_name] || 0) + 1;
          return acc;
        }, {});
        onCaseChange(casesCount);
      }
    }
  };
  return (
    <GoogleMap
      ref={(map) => {
        if (map) {
          mapRef.current = map.state.map;
        }
      }}
      onLoad={handleMapLoad}
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
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      }
      <HospitalMarkerComponent hospitals={hospitals} bounds={bounds} />
      <CaseMarkerComponent
        cases={cases}
        bounds={bounds}
        onBoundsChanged={handleBoundsChanged}
      />
    </GoogleMap>
  );
}

export default MapComponent;
