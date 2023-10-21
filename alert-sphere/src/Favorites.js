import React, { useState } from "react";
import SideBarComponent from "./components/SideBarComponent";
import TopBarComponent from "./components/TopBarComponent";
// import './Favorites.css'; // For custom styles if needed

function Favorites() {
  // Sample data for folders and their content
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: "Locations",
      content: ["Beijing", "Shanghai", "Guangzhou"],
    },
    {
      id: 2,
      name: "Cases",
      content: ["Case 1", "Case 2", "Case 3", "Case 4"],
    },
    {
      id: 3,
      name: "Hospitals",
      content: ["Hospital A", "Hospital B"],
    },
    {
      id: 4,
      name: "Symptoms",
      content: ["Fever", "Cough", "Fatigue"],
    },
    {
      id: 5,
      name: "Medications",
      content: ["Medication X", "Medication Y", "Medication Z"],
    },
  ]);

  const [selectedFolder, setSelectedFolder] = useState(null);

  return (
    <div className="flex h-screen">
      <SideBarComponent />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBarComponent />

        {/* Main content */}
        <div className="flex p-6">
          {/* Left Side - Folders */}
          <aside className="w-1/4 border-r pr-6">
            <h2 className="text-xl font-bold mb-4">Folders</h2>
            <ul>
              {folders.map((folder) => (
                <li
                  key={folder.id}
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                  onClick={() => setSelectedFolder(folder)}
                >
                  {folder.name}
                </li>
              ))}
            </ul>
          </aside>

          {/* Right Side - Content */}
          <main className="w-3/4 pl-6">
            <h2 className="text-xl font-bold mb-4">Content</h2>
            {selectedFolder ? (
              <ul>
                {selectedFolder.content.map((item, index) => (
                  <li key={index} className="p-2 border-b">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Please select a folder to view its content.</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
