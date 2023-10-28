import React, { useState } from "react";
import TopBarComponent from "./components/TopBarComponent";
import SideBarComponent from "./components/SideBarComponent";
import OptionsComponent from "./components/OptionsComponent";

const articles = [
  {
    id: 1,
    title: "Using the Navigation Bar",
    content: `The navigation bar at the top of our website is your gateway to all of our main features. By simply clicking on the various titles, you can easily navigate to different sections of our site. Here's a brief overview of what each section offers:
      - Home: This is where you'll land when you first visit our site. It provides a general overview and highlights the latest updates.
      - News: Stay updated with the latest news and happenings related to our services.
      - Profile: Manage your personal information, update your password, and configure other account-related settings.
      - Help Center: Where you currently are! This section provides guidance on how to use different features of our website.`,
  },
  {
    id: 2,
    title: "Managing Your Profile",
    content: `Your profile is the central hub for all your personal settings and preferences. Make sure to keep your information up-to-date to ensure the best experience on our site. 
      - Personal Information: Update your name, email address, and other personal details.
      - Security Settings: Change your password and manage other security-related settings.
      - Notifications: Configure how and when you want to be notified about certain events on our site.`,
  },
  {
    id: 3,
    title: "Exploring the News Section",
    content: `Our news section provides a comprehensive update on the latest developments and updates related to our platform. Whether it's a new feature release, an important announcement, or general industry news, this section will keep you informed. Articles are listed in chronological order, with the newest articles appearing at the top.`,
  },
  {
    id: 4,
    title: "Getting Support",
    content: `If you ever run into issues or have questions about our platform, don't hesitate to reach out for support. Our dedicated team is always ready to assist. Navigate to the 'Contact Us' page for detailed contact information, or check our frequently asked questions (FAQ) for quick answers to common queries.`,
  },
  {
    id: 5,
    title: "Making the Most of Our Features",
    content: `Our platform offers a variety of features designed to enhance your experience. From advanced search capabilities, interactive maps, to user-friendly interfaces, we've got you covered. Spend some time exploring, and don't forget to check out our tutorials and user guides for in-depth information on each feature.`,
  },
];

function HelpPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TopBarComponent />

      <div className="flex flex-grow">
        <SideBarComponent />

        <div className="p-8 flex-grow bg-white rounded-l-lg shadow-md max-w-[calc(100%-250px)] overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-700 border-b pb-4">
            Help Center
          </h1>

          {!selectedArticle && (
            <div className="mb-6">
              <OptionsComponent></OptionsComponent>
            </div>
          )}

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
                ← Back
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
