import React from "react";
import { useEffect, useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
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
  const [selectedCase, setSelectedCase] = useState(null);

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
              <div key={caseItem.case_id}>
                <Marker
                  position={{ lat: caseItem.latitude, lng: caseItem.longitude }}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: color,
                    fillOpacity: 1,
                    strokeWeight: 0,
                    scale: 8,
                  }}
                  onClick={() => setSelectedCase(caseItem)}
                />
                {selectedCase && selectedCase.case_id === caseItem.case_id && (
                  <InfoWindow
                    position={{
                      lat: caseItem.latitude,
                      lng: caseItem.longitude,
                    }}
                    onCloseClick={() => setSelectedCase(null)}
                  >
                    <div>
                      <h4 className="font-bold text-xl">
                        {caseItem.disease_name}
                      </h4>
                      <p className="text-base">ID: {caseItem.case_id}</p>
                      <p className="text-base">
                        Level: {caseItem.disease_level}
                      </p>
                      <button
                        className="text-sm"
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginTop: "10px",
                        }}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this case?"
                            )
                          ) {
                            deleteCase(caseItem.case_id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </InfoWindow>
                )}
              </div>
            );
          }
        }
        return null;
      })}
    </div>
  );
}

export default CaseMarkerComponent;
