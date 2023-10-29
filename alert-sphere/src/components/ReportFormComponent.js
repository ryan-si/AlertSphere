import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import LoadingSpinner from "./LoadingSpinnerComponent";
import useDiseases from "../hooks/useDiseases";
const token = sessionStorage.getItem("token");
function ReportFormComponent() {
  const [selectedDiseaseID, setSelectedDiseaseID] = useState(undefined);
  const [location, setLocation] = useState("");
  const [msg, setMsg] = useState("");
  const diseases = useDiseases();

  const handleDiseaseSelect = (event) => {
    setSelectedDiseaseID(event.target.value);
  };

  const handleSelect = (value) => {
    setLocation(value);
  };

  const handleSubmit = async () => {
    if (!selectedDiseaseID || !location) {
      alert("Please select a disease type and location first.");
      return;
    }

    const url = `${process.env.REACT_APP_API_BASE_URL}/emergency/cases`;

    // console.log("selectedDiseaseID", location);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disease_id: selectedDiseaseID,
          location: location,
        }),
      });

      if (!response.ok) {
        setMsg("Network response was not ok");
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      setMsg(responseData.msg);
      window.location.reload();
      // console.log("Data updated successfully:", responseData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="p-6 bg-e5e7eb rounded space-y-4">
      <div>
        <label htmlFor="caseType" className="block text-lg font-semibold mb-2">
          Case Type
        </label>
        <select
          id="caseType"
          className="block w-full p-2 border rounded"
          value={selectedDiseaseID}
          onChange={handleDiseaseSelect}
          defaultValue=""
        >
          <option value="" disabled>
            Select a disease
          </option>
          {diseases &&
            diseases.map((disease) => (
              <option key={disease.disease_id} value={disease.disease_id}>
                {disease.disease_name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="location" className="block text-lg font-semibold mb-2">
          Location
        </label>
        <PlacesAutocomplete
          value={location}
          onChange={setLocation}
          onSelect={handleSelect}
          searchOptions={{
            componentRestrictions: { country: "au" },
          }}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="relative">
              <input
                {...getInputProps({
                  id: "location",
                  className: "block w-full p-2 border rounded",
                  placeholder: "Type the location",
                })}
              />
              {suggestions.length > 0 && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-md">
                  {loading && (
                    <div className="h-screen flex flex-col relative">
                      <LoadingSpinner />
                    </div>
                  )}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "p-4 cursor-pointer bg-gray-100"
                      : "p-4 cursor-pointer";
                    return (
                      <div
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </PlacesAutocomplete>
      </div>
      {/* {console.log(location)} */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleSubmit}
        >
          Report
        </button>
        <div className="mt-4 text-center text-gray-600">{msg}</div>
      </div>
    </div>
  );
}

export default ReportFormComponent;
