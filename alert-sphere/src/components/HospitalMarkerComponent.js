import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

function HospitalMarkerComponent({ hospitals, bounds }) {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const token = sessionStorage.getItem("token");

  return (
    <div>
      {hospitals.map((hospital) => {
        if (bounds) {
          const hospitalPosition = new window.google.maps.LatLng(
            hospital.latitude,
            hospital.longitude
          );
          if (bounds.contains(hospitalPosition)) {
            return (
              <Marker
                key={hospital.reporting_unit_name}
                position={hospitalPosition}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                }}
                onClick={() => setSelectedHospital(hospital)}
              />
            );
          }
        }
        return null;
      })}

      {/* Display InfoWindow for selected hospital */}
      {selectedHospital && token &&(
        <InfoWindow
          position={{
            lat: selectedHospital.latitude,
            lng: selectedHospital.longitude,
          }}
          onCloseClick={() => setSelectedHospital(null)}
        >
          <div>
            <h2>{selectedHospital.reporting_unit_name}</h2>
            {/* You can add more hospital details here */}
          </div>
        </InfoWindow>
      )}
    </div>
  );
}

export default HospitalMarkerComponent;
