import React from "react";
import CardComponent from "./components/CardComponent";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";

function Settings() {
  return (
    <div className="h-screen flex flex-col">
      {/* Topbar */}

      <Topbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-8 space-y-6 overflow-y-auto">
          <h1 className="text-2xl font-bold">Welcome to use, Ryan.</h1>

          <p>
            Manage your own information, privacy, and security to better meet
            your needs with Google services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CardComponent
              title="Privacy rights and personalization"
              description="View the data in your Google account and choose which activities to save for personalizing your Google experience."
              actionText="Manage your data and privacy settings"
              actionHandler={() => console.log("Privacy rights clicked")}
            />
            <CardComponent
              title="Password and security"
              description="Settings and suggestions that help ensure the security of your account. View your verification method, modify your password."
              actionText="Manage your password and security"
              actionHandler={() => console.log("Password settings clicked")}
            />
            <CardComponent
              title="Warning and reminder"
              description="View the current alert settings, set the frequency of alert reminders, and modify the method of reminder types."
              actionText="Manage your warning and reminder"
              actionHandler={() => console.log("Warnings clicked")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
