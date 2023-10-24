import React from "react";
import SideBarComponent from "./components/SideBarComponent";
import TopBarComponent from "./components/TopBarComponent";
import { useLocation } from "react-router-dom";

function SettingDetail() {
  const location = useLocation();

  // Retrieve the title and content from the location's state
  const title = location.state?.title || "Default Title";
  const content = location.state?.content || "Default Content";

  // console.log(location.state?.title);

  return (
    <div className="h-screen flex flex-col">
      {/* Topbar */}
      <TopBarComponent />

      <div className="flex flex-1">
        <SideBarComponent />

        <div className="flex-1 p-8 space-y-6 overflow-y-auto">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default SettingDetail;
