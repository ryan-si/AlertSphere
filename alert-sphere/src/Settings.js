import React from "react";
import CardComponent from "./components/CardComponent";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";
import { useState } from "react";
import SettingDetail from "./SettingDetail";
import { Link } from "react-router-dom";

function Settings() {
  const [showDetail, setShowDetail] = useState(false);
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
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {/* <Link
              to={{
                pathname: "/settingdetail",
                state: {
                  title: "Privacy rights and personalization",
                  content:
                    "View the data in your Google account and choose which activities to save for personalizing your Google experience.",
                },
              }}
            > */}
            <CardComponent
              title="Password and security"
              description="Settings and suggestions that help ensure the security of your account. View your verification method, modify your password."
              actions={[
                {
                  text: "Change Password",
                  handler: () => console.log("Privacy rights clicked"),
                },
                {
                  text: "Change Email",
                  handler: () => console.log("Another action"),
                },
                {
                  text: "Change Location",
                  handler: () => console.log("Another action"),
                },
              ]}
            />
            {/* <Link
              to={{
                pathname: "/settingdetail",
                state: {
                  title: "Warning and reminder",
                  content:
                    "View the current alert settings, set the frequency of alert reminders, and modify the method of reminder types.",
                },
              }}
            > */}
            <CardComponent
              title="Warning and reminder"
              description="View the current alert settings, set the frequency of alert reminders, and modify the method of reminder types."
              actions={[
                {
                  text: "Manage Subscription",
                  handler: () => console.log("Privacy rights clicked"),
                },
              ]}
            />
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
