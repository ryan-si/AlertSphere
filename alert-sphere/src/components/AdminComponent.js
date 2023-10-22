import React, { useState } from "react";
import "./ChatbotComponent.css";

function AdminComponent() {
  const [responses, setResponses] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isReportClicked, setIsReportClicked] = useState(false);
  const [isAnnounceClicked, setIsAnnounceClicked] = useState(false);

  const [caseType, setCaseType] = useState(""); // 新增状态来跟踪caseType的选择

  const handleCaseTypeChange = (e) => {
    setCaseType(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div
      className={`chatbot-container rounded-md flex flex-col ${
        isOpen ? "w-4-5 h-1/2" : "h-auto"
      }`}
      onClick={() => setIsOpen(true)}
    >
      {isOpen && (
        <>
          <button
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full p-1"
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
                    onChange={handleCaseTypeChange}
                  >
                    <option value="covid-19">COVID-19</option>
                    <option value="flu">Flu</option>
                    <option value="ebola">Ebola</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {caseType === "other" && ( // 使用条件渲染
                  <div>
                    <label
                      htmlFor="customCaseType"
                      className="block text-lg font-semibold mb-2"
                    >
                      If other, please specify:
                    </label>
                    <input
                      type="text"
                      id="customCaseType"
                      className="block w-full p-2 border rounded"
                      placeholder="Type the disease name"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="location"
                    className="block text-lg font-semibold mb-2"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="block w-full p-2 border rounded"
                    placeholder="Type the location"
                  />
                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
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
