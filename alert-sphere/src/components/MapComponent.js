import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { getColorForDisease } from "../utils/colorUtils";
//import CenterMarkerComponent from './CenterMarkerComponent';
import HospitalMarkerComponent from "./HospitalMarkerComponent";
import CaseMarkerComponent from "./CaseMarkerComponent";
function MapComponent({
  center,
  hospitals,
  onHospitalChange,
  onCaseChange,
  cases,
}) {
  /*global google*/
  //const cases = useCases();
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      handleBoundsChanged();
    }
  }, [mapRef.current]);

  const [bounds, setBounds] = useState(null);
  const handleBoundsChanged = () => {
    if (mapRef.current) {
      const newBounds = mapRef.current.getBounds();
      if (!bounds || !newBounds.equals(bounds)) {
        setBounds(newBounds);

        const hospitalsCount = hospitals.filter((hospital) => {
          const isValidCoordinate =
            typeof hospital.latitude === "number" &&
            typeof hospital.longitude === "number";
          if (isValidCoordinate) {
            const hospitalPosition = new window.google.maps.LatLng(
              hospital.latitude,
              hospital.longitude
            );
            return newBounds.contains(hospitalPosition);
          }
          return false;
        }).length;
        onHospitalChange(hospitalsCount);
        const casesWithinBounds = cases.filter((caseItem) => {
          const isValidCoordinate =
            typeof caseItem.latitude === "number" &&
            typeof caseItem.longitude === "number";
          if (isValidCoordinate) {
            const casePosition = new window.google.maps.LatLng(
              caseItem.latitude,
              caseItem.longitude
            );
            return newBounds.contains(casePosition);
          }
          return false;
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
      <CaseMarkerComponent cases={cases} bounds={bounds} />
    </GoogleMap>
  );
}

export default MapComponent;
