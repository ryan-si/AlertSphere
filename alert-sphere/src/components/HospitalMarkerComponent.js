import React from "react";
import { Marker } from "@react-google-maps/api";

function HospitalMarkerComponent({ hospitals, bounds }) {
  return (
    <div>
      {hospitals.map((hospital) => {
        if ( bounds) {
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
                onClick={() => alert(hospital.reporting_unit_name)}
              />
            );
          }
        }
        return null;
      })}
    </div>
  );
}

export default HospitalMarkerComponent;
