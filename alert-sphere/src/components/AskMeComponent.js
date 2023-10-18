import React, { useState } from "react";

function AskMeComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed bottom-4 right-4 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "w-1/2 h-1/2" : "w-auto h-auto"} 
        bg-white shadow-lg rounded-lg overflow-hidden`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Hello, Bean!</h2>
          <textarea
            className="w-full h-2/3 border rounded p-2"
            placeholder="What can I help you with?"
          />
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </div>
      ) : (
        <div className="flex items-center p-2 space-x-2 cursor-pointer">
          <span className="text-xl font-bold">Ask Me</span>
          <img src="path_to_icon.png" alt="Ask Icon" className="w-8 h-8" />{" "}
          {/* Replace 'path_to_icon.png' with your icon path */}
        </div>
      )}
    </div>
  );
}

export default AskMeComponent;
