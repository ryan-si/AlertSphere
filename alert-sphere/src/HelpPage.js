import React, { useState } from "react";
import TopBarComponent from "./components/TopBarComponent";
import SideBarComponent from "./components/SideBarComponent";
import OptionsComponent from "./components/OptionsComponent";

const articles = [
  {
    id: 1,
    title: "Basics of Infectious Diseases",
    content: "Content for Basics of Infectious Diseases.",
  },
  {
    id: 2,
    title: "Prevention Techniques for Common Infectious Diseases",
    content: "Content for Prevention Techniques.",
  },
  {
    id: 3,
    title: "How Vaccines Work",
    content: "Content about How Vaccines Work.",
  },
];

function HelpPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TopBarComponent />

      <div className="flex flex-grow">
        <SideBarComponent />

        <div className="p-8 flex-grow bg-white rounded-l-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-gray-700 border-b pb-4">
            Help Center
          </h1>

          <div className="mb-6">
            <OptionsComponent></OptionsComponent>
          </div>

          {selectedArticle ? (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-black">
                {selectedArticle.title}
              </h2>
              <p className="mb-6 text-black">{selectedArticle.content}</p>
              <button
                className="text-black hover:text-gray-600 transition"
                onClick={() => setSelectedArticle(null)}
              >
                ← Back to Help Articles
              </button>
            </div>
          ) : (
            <ul>
              {articles.map((article) => (
                <li key={article.id} className="mb-4">
                  <button
                    className="text-xl text-black hover:text-gray-800 transition"
                    onClick={() => setSelectedArticle(article)}
                  >
                    {article.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
