import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinnerComponent";
import "./ChatbotComponent.css";
import useDiseases from "../hooks/useDiseases";
import PlacesAutocomplete from "react-places-autocomplete";

function AdminComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReportClicked, setIsReportClicked] = useState(false);
  const [isAnnounceClicked, setIsAnnounceClicked] = useState(false);

  const [selectedDiseaseID, setSelectedDiseaseID] = useState(undefined);
  const [location, setLocation] = useState("");
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
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          diseaseID: selectedDiseaseID,
          location: location
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log("Data updated successfully:", responseData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div
      className={`chatbot-container rounded-md flex flex-col ${isOpen ? "w-4-5 h-1/2" : "h-auto"
        }`}
      onClick={() => setIsOpen(true)}
    >
      {isOpen && (
        <>
          <button
            className="absolute top-2 right-2 w-8 h-8 text-gray-500 rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              setIsAnnounceClicked(false);
              setIsReportClicked(false);
            }}
          >
            X
          </button>

          <div className="animate-fade-in flex-grow">
            {isReportClicked && (
              <div className="p-6 bg-e5e7eb rounded space-y-4">
                <div>
                  <label
                    htmlFor="caseType"
                    className="block text-lg font-semibold mb-2"
                  >
                    Case Type
                  </label>
                  <select
                    id="caseType"
                    className="block w-full p-2 border rounded"
                    value={selectedDiseaseID}
                    onChange={handleDiseaseSelect}
                  >
                    <option value="" disabled>
                      Select a disease
                    </option>
                    {console.log(diseases)}
                    {diseases && diseases.diseases.data.diseases.map((disease) => (
                      <option
                        key={disease.disease_id}
                        value={disease.disease_id}
                      >
                        {disease.disease_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-lg font-semibold mb-2"
                  >
                    Location
                  </label>
                  <PlacesAutocomplete
                    value={location}
                    onChange={setLocation}
                    onSelect={handleSelect}
                    searchOptions={{
                      componentRestrictions: { country: "au" }
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
                {console.log(location)}
                {console.log(selectedDiseaseID)}

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={handleSubmit}
                >
                  Report to system
                </button>
              </div>
            )}
            {isAnnounceClicked && (
              <div className="p-6 bg-e5e7eb rounded space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-lg font-semibold mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="block w-full p-2 border rounded"
                    placeholder="Type the title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-lg font-semibold mb-2"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    className="block w-full p-2 border rounded"
                    rows="5"
                    placeholder="Type the content"
                  ></textarea>
                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Send Notification
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <div className="p-2 border-t flex ">
        <img
          src="Admin.png"
          alt="Company Logo"
          className="max-h-10 object-contain mr-2 mt-2"
        />
        <button
          onClick={() => {
            setIsReportClicked(true);
            setIsAnnounceClicked(false);
          }}
          className="m-2 px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded  font-bold"
        >
          Report
        </button>
        <button
          onClick={() => {
            setIsAnnounceClicked(true);
            setIsReportClicked(false);
          }}
          className="m-2 px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded  font-bold"
        >
          Announce
        </button>
      </div>
    </div>
  );
}

export default AdminComponent;
