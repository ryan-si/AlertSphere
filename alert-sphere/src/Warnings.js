// HealthTips.js
import React, { useState } from "react";
import SideBarComponent from "./components/SideBarComponent";
import TopBarComponent from "./components/TopBarComponent";
function Warnings() {
  const [selectedTip, setSelectedTip] = useState(null);
  const tips = [
    {
      title: "Tip 1",
      summary: "Brief summary of tip 1...",
      date: "2022-10-16",
      content: "Full content of tip 1...",
      image: "path_to_image_1.jpg",
    },
    // ... (more tips can be added similarly)
  ];

  return (
    <div className="flex">
      {/* Left Side */}
      <SideBarComponent />
      <TopBarComponent></TopBarComponent>

      <div className="flex">
        <aside className="w-1/2 h-screen overflow-y-auto border-r">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="p-4 border-b cursor-pointer"
              onClick={() => setSelectedTip(tip)}
            >
              <h2 className="text-xl font-bold">{tip.title}</h2>
              <p className="truncate">{tip.summary}</p>
              <div className="flex justify-between mt-2">
                <button className="text-sm text-gray-400">❤️ Collect</button>
                <span className="text-sm text-gray-500">{tip.date}</span>
              </div>
            </div>
          ))}
        </aside>

        {/* Right Side */}
        <main className="w-1/2 p-8">
          {selectedTip ? (
            <>
              <img
                src={selectedTip.image}
                alt={selectedTip.title}
                className="w-full h-64 object-cover mb-8"
              />
              <h1 className="text-2xl font-bold mb-4">{selectedTip.title}</h1>
              <p>{selectedTip.content}</p>
            </>
          ) : (
            <p>Select a tip from the left to view its details.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Warnings;
