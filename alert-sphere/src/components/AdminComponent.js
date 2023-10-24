import React, { useState } from "react";
import "./ChatbotComponent.css";
import useDiseases from '../hooks/useDiseases';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
function AdminComponent() {
  const { diseases, submitDiseaseData } = useDiseases();
  const [responses, setResponses] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isReportClicked, setIsReportClicked] = useState(false);
  const [isAnnounceClicked, setIsAnnounceClicked] = useState(false);

  const [selectedDiseaseID, setSelectedDiseaseID] = useState(null);
  const [location, setLocation] = useState('');
  const [caseType, setCaseType] = useState("");


  const [coordinates, setCoordinates] = useState(null);

  const handleDiseaseSelect = (event) => {
    setSelectedDiseaseID(event.target.value);
  };

  const handleSelect = async (value) => {
    setLocation(value);
    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setCoordinates(latLng);
    } catch (error) {
      console.error('Error fetching coordinates for address:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedDiseaseID || !coordinates) {
      alert('Please select a disease type and location first.');
      return;
    }

    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch('http://192.168.50.237:8080/emergency/diseases', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          disease_id: selectedDiseaseID,
          latitude: coordinates.lat,
          longitude: coordinates.lng
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit case data');
      }

      const data = await response.json();
      console.log('Submitted data:', data);
      alert('Reported successfully!');
    } catch (error) {
      console.error('Error reporting the data:', error);
      alert('Failed to report data. Please try again.');
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
                    <option value="" disabled>Select a disease</option>
                    {diseases.map(disease => (
                      <option key={disease.disease_id} value={disease.disease_id}>
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
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div className="relative">
                        <input
                          {...getInputProps({
                            id: 'location',
                            className: 'block w-full p-2 border rounded',
                            placeholder: 'Type the location'
                          })}
                        />
                        {suggestions.length > 0 && (
                          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-md">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                              const className = suggestion.active
                                ? "p-4 cursor-pointer bg-gray-100"
                                : "p-4 cursor-pointer";
                              return (
                                <div
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
          className="m-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 font-bold"
        >
          Report
        </button>
        <button
          onClick={() => {
            setIsAnnounceClicked(true);
            setIsReportClicked(false);
          }}
          className="m-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 font-bold"
        >
          Announce
        </button>
      </div>
    </div>
  );
}

export default AdminComponent;
