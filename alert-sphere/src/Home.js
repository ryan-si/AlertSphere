import React from "react";
import "./Home.css";
import { useState } from "react";
import MapComponent from "./components/MapComponent";
import ChatbotComponent from "./components/ChatbotComponent";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";
import SearchBarComponent from './components/SearchBarComponent';
import AskMeComponent from "./components/AskMeComponent";
// const token = sessionStorage.getItem("token");
// const email = sessionStorage.getItem("email");

function Home() {
  const [apiResponse, setApiResponse] = React.useState("");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [mapCenter, setMapCenter] = useState({ lat: 41.3851, lng: 2.1734 });

  function handleLogout() {
    // Send a POST request to the server to logout
    fetch("http://10.19.229.4:8080/emergency/user/logout", {
      method: "POST",
      headers: {
        // Set headers if needed, e.g., for authentication
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data if needed
        console.log(data);
        // Remove the token from sessionStorage after successful logout
        sessionStorage.removeItem("token");
        // Optionally, redirect user to login page
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }

  return (
    <div className="home-page">
      {/* {<div>if(token){console.log("logged")} else {console.log("not log")}
        </div>} */}
      <Sidebar />
      {/* <aside className="sidebar">
        <div className="company-section">
          <img
            src="company-logo.png"
            alt="Company Logo"
            className="company-logo"
          />
          <span>Company Name</span>
        </div>
        <ul className="menu-list">
          <li>Warnings</li>
          <li>Health tips</li>
          <li>Collection</li>
          <li>Setting</li>
        </ul>
        <div className="footer-links">
          <a href="#">Help Centre</a>
          <a href="#">Contact us</a>
          <a href="#" onClick={handleLogout}>
            Log out
          </a>
        </div>
      </aside> */}
      <main className="content">
        <Topbar></Topbar>
        {/* <div className="login-status">
          {token ? (
            <div className="user-info">
              <img
                src="user-avatar.png"
                alt="User Avatar"
                className="user-avatar"
              />
              <span>{email}</span>
            </div>
          ) : (
            <div className="login-register-prompt">
              <span>
                Please <a href="/login">Login</a>/
                <a href="/register">Register</a>
              </span>
            </div>
          )}
        </div> */}

        <div className="map">
          <MapComponent center={mapCenter} />
          <div className="map-overlay">
            <div className="map-searchbox">
              <SearchBarComponent onAddressSelect={setMapCenter} />
            </div>
            <div className="map-info-box trend-info">Disease Trend Here</div>
            <div className="map-info-box diagnosis-info">
              Diagnosis Count Here
            </div>
          </div>
          {/* <AskMeComponent /> */}
        </div>

        <div className="chat-bot z-50">
          <ChatbotComponent />
        </div>
      </main>
    </div>
  );
}

export default Home;
