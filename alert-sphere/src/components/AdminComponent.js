import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinnerComponent";
import "./ChatbotComponent.css";
import useDiseases from "../hooks/useDiseases";
import PlacesAutocomplete from "react-places-autocomplete";
import ReportFormComponent from "./ReportFormComponent";
import AnnounceFormComponent from "./AnnounceForm";
function AdminComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReportClicked, setIsReportClicked] = useState(false);
  const [isAnnounceClicked, setIsAnnounceClicked] = useState(false);

  return (
    <div
      className={`chatbot-container rounded-md flex flex-col ${
        isOpen ? "w-4-5 h-3/5" : "h-auto"
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
            {isReportClicked && <ReportFormComponent />}
            {isAnnounceClicked && <AnnounceFormComponent />}
          </div>
        </>
      )}

      <div className="p-2 border-t flex sticky bottom-0  overflow-hidden">
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
