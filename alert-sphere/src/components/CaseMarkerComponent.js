import React from "react";
import { useEffect, useState } from "react";
import { Marker } from "@react-google-maps/api";
/*global google*/
// import { getColorForDisease } from "./colorUtils";
import { getColorForDisease } from "../utils/colorUtils";

function deleteCase(caseId) {
  const token = sessionStorage.getItem("token");

  fetch(`${process.env.REACT_APP_API_BASE_URL}/emergency/cases/${caseId}`, {
    method: "DELETE", // Specify the DELETE method
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Case with ID ${caseId} deleted successfully.`);
      } else {
        console.error(`Error deleting case with ID ${caseId}.`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Usage example:
// deleteCase(caseItem.case_id);

function CaseMarkerComponent({ cases, bounds }) {
  return (
    <div>
      {cases.map((caseItem) => {
        const isValidCoordinate =
          typeof caseItem.latitude === "number" &&
          typeof caseItem.longitude === "number";
        if (isValidCoordinate && bounds) {
          const casePosition = new window.google.maps.LatLng(
            caseItem.latitude,
            caseItem.longitude
          );
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
                  scale: 8,
                }}
                onClick={() => deleteCase(caseItem.case_id)}
              />
            );
          }
        }
        return null;
      })}
    </div>
  );
}

export default CaseMarkerComponent;
