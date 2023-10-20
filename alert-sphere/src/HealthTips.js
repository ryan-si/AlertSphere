import React, { useState } from "react";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";
import "./HealthTips.css";
import useHealthTips from './hooks/useHealthTips'; 

function truncateToWholeWord(text, maxLength) {
  if (text.length <= maxLength) return text;

  let truncated = text.substring(0, maxLength);

  // Find the last space within the truncated string
  let lastSpace = truncated.lastIndexOf(" ");

  // If we found a space, truncate the text there. Otherwise, the whole text is a single word.
  if (lastSpace > 0) {
    truncated = truncated.substring(0, lastSpace);
  }

  return `${truncated}...`;
}

const tips = [
  {
    tag: "Diet",
    title: "Balanced Diet for a Healthy Life",
    content:
      "A balanced diet is crucial for a healthy life. It provides the necessary nutrients essential for the body to function efficiently. Consuming foods from all food groups in the right proportions ensures that the body receives adequate vitamins, minerals, and dietary fibers. These nutrients play a pivotal role in boosting immunity, supporting growth, promoting digestion, and maintaining cellular integrity.",
    image: "someImageUrl1.jpg",
  },
  {
    tag: "Exercise",
    title: "Importance of Regular Exercise",
    content: "Exercise plays a vital role in maintaining good health...",
    image: null,
  },
  // ...更多的tips
];

const HealthTips = () => {
  const [selectedTip, setSelectedTip] = useState(null);

  const openTip = (tip) => {
    setSelectedTip(tip);
  };

  const closeTip = () => {
    setSelectedTip(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-xl font-bold mb-4">Health Tips</h1>
          <div className="grid grid-cols-3 gap-4">
            {tips.map((tip, index) => (
              <div
                key={index}
                className={`bg-white shadow-md m-2 p-4 ${
                  tip.image ? "bg-cover bg-center" : ""
                }`}
                style={{ backgroundImage: `url(${tip.image})` }}
              >
                <div className="text-sm bg-opacity-50 bg-gray-100 p-1 rounded">
                  {tip.tag}
                </div>
                <h2 className="text-lg font-bold mt-2">{tip.title}</h2>
                <p className="text-gray-700 mt-1">
                  {truncateToWholeWord(tip.content, 150)}
                </p>
                <button
                  onClick={() => openTip(tip)}
                  className="text-blue-500 underline mt-2 block"
                >
                  点击查看详情
                </button>
              </div>
            ))}
          </div>
        </main>

        {selectedTip && (
          <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl w-full z-20 transition-transform transform scale-95">
              <h2 className="text-xl font-semibold mb-4">
                {selectedTip.title}
              </h2>
              <p>{selectedTip.content}</p>
              <button
                onClick={closeTip}
                className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
              >
                关闭
              </button>
            </div>
            <div
              onClick={closeTip}
              className="absolute inset-0 bg-black opacity-50 z-10"
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthTips;
