import React from "react";
import "./Home.css";
import { useState } from "react";
import MapComponent from "./components/MapComponent";
import ChatbotComponent from "./components/ChatbotComponent";
import SideBarComponent from "./components/SideBarComponent";
import TopBarComponent from "./components/TopBarComponent";
import SearchBarComponent from "./components/SearchBarComponent";
import AskMeComponent from "./components/AskMeComponent";
// const token = sessionStorage.getItem("token");
// const email = sessionStorage.getItem("email");

function Home() {
  const [apiResponse, setApiResponse] = React.useState("");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [mapCenter, setMapCenter] = useState({ lat: 41.3851, lng: 2.1734 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [zoom, setZoom] = useState(10); 

  return (
    <div className="home-page">
      {/* {<div>if(token){console.log("logged")} else {console.log("not log")}
        </div>} */}
      <SideBarComponent />
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
        <TopBarComponent />
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
          <MapComponent
            center={mapCenter}
            markerPosition={markerPosition}
            zoom={zoom}
          />
          <div className="map-overlay">
            <div className="map-searchbox z-100">
              <SearchBarComponent
                onAddressSelect={(latLng) => {
                  setMapCenter(latLng);
                  setMarkerPosition(latLng);
                  setZoom(15);
                }}
              />
            </div>
            <div className="map-info-box trend-info z-50">
              Disease Trend Here
            </div>
            <div className="map-info-box diagnosis-info z-50">
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
