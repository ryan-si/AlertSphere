import React from "react";
import { useEffect, useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
/*global google*/
// import { getColorForDisease } from "./colorUtils";
import { getColorForDisease } from "../utils/colorUtils";
import { type } from "@testing-library/user-event/dist/type";

function deleteCase(caseId, cases) {
  const token = sessionStorage.getItem("token");
  const url = `${process.env.REACT_APP_API_BASE_URL}/emergency/cases/${caseId}`;
  fetch(url, {
    method: "DELETE", // Specify the DELETE method
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert(`Case with ID ${caseId} deleted successfully.`);
        window.location.reload();
      } else {
        console.error(`Error deleting case with ID ${caseId}.`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function CaseMarkerComponent({ cases, bounds }) {
  const [selectedCase, setSelectedCase] = useState(null);
  const isAdmin = sessionStorage.getItem("is_admin");
  const token = sessionStorage.getItem("token");

  return (
    <div>
      {cases.map((caseItem) => {
        if (bounds) {
          const casePosition = new window.google.maps.LatLng(
            caseItem.latitude,
            caseItem.longitude
          );
          if (bounds.contains(casePosition)) {
            const color = getColorForDisease(caseItem.disease_name);
            return (
              <div key={caseItem.case_id}>
                <Marker
                  position={casePosition}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    fillColor: color,
                    fillOpacity: 1,
                    strokeWeight: 0,
                    scale: 5,
                  }}
                  onClick={() => setSelectedCase(caseItem)}
                />
                {selectedCase &&
                  token &&
                  selectedCase.case_id === caseItem.case_id && (
                    <InfoWindow
                      position={{
                        lat: selectedCase.latitude,
                        lng: selectedCase.longitude,
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
                        {isAdmin && isAdmin === "1" && (
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
                                deleteCase(caseItem.case_id, cases);
                              }
                            }}
                          >
                            Delete
                          </button>
                        )}
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
