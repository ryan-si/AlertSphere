import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinnerComponent";
import SideBarComponent from "./SideBarComponent";
import TopBarComponent from "./TopBarComponent";
import "./ChatbotComponent.css";

function ChatbotComponent() {
  const [responses, setResponses] = useState([]); // Use an array to store all messages
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    let data = null;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: inputText,
            },
          ],
        }),
      });

      data = await result.json();
      if (!result.ok) {
        throw new Error(
          data.message || data.error || "Network response was not ok"
        );
      }

      const receivedResponse = data.choices[0].message.content;
      setResponses((prevResponses) => [
        ...prevResponses,
        { role: "user", content: inputText },
        { role: "bot", content: receivedResponse },
      ]);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.message ? error.message : error,
        data
      );
      setError(error.message);
    } finally {
      setLoading(false);
      setInputText(""); // Clear input text after submission
    }
  };

  /* ... 其他代码保持不变 */

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
           
            }}
          >
            X
          </button>

          <div className="animate-fade-in flex-grow">
            {responses.map((msg, index) => (
              <p key={index} className={`${msg.role} m-2`}>
                {msg.content}
              </p>
            ))}
            {loading && (
              <div className="ml-2 mt-2">Loading...</div>
              // <div className="h-screen flex flex-col relative">
              //   {/* <TopBarComponent /> */}
              //   <div className="flex flex-1">
              //     {/* <SideBarComponent /> */}
              //     {/* <p>Loading...</p> */}
              //     {/* <LoadingSpinner /> */}
              //   </div>
              // </div>
            )}
            {error && <p className="m-2 text-red-500">{error}</p>}
          </div>
        </>
      )}

      <div className="p-2 border-t flex ">
        {" "}
        {/* This will be at the bottom */}
        <img
          src="Askme.png"
          alt="Company Logo"
          className="max-h-16 object-contain mr-2 "
        />
        <input
          type="text"
          placeholder="Ask me anything"
          value={inputText}
          onChange={handleInputChange}
          className="m-2 p-2 border rounded flex-grow"
        />
        <button
          onClick={handleSubmit}
          className="m-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatbotComponent;
