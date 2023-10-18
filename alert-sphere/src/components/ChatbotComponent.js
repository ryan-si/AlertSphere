import React, { useState } from "react";
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
          Authorization: `Bearer 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`,
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

  return (
    <div
      className={`chatbot-container ${
        isOpen ? "w-4-5 h-half" : "w-auto h-auto"
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        className="m-2 p-2 border rounded"
      />
      <button
        onClick={handleSubmit}
        className="m-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
      <div className="p-2 animate-fade-in">
        {" "}
        {/* 再次应用了 fade-in 动画 */}
        {responses.map((msg, index) => (
          <p key={index} className={`${msg.role} m-2`}>
            {msg.content}
          </p>
        ))}
      </div>
      {loading && <p className="m-2">Loading...</p>}
      {error && <p className="m-2 text-red-500">{error}</p>}
    </div>
  );
}

export default ChatbotComponent;
