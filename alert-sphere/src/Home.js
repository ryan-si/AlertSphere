import React from "react";
import "./Home.css";
import MapComponent from "./components/MapComponent";
import ChatbotComponent from "./components/ChatbotComponent";
const token = sessionStorage.getItem("token");

function Home() {
  const [apiResponse, setApiResponse] = React.useState("");

  return (
    <div className="home-page">
      {/* {<div>if(token){console.log("logged")} else {console.log("not log")}
        </div>} */}
      <aside className="sidebar">
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
          <a href="#">Log out</a>
        </div>
      </aside>

      <main className="content">
        <div className="login-status">
          {token ? (
            <div className="user-info">
              <img
                src="user-avatar.png"
                alt="User Avatar"
                className="user-avatar"
              />
              <span>Username</span>
            </div>
          ) : (
            <div className="login-register-prompt">
              <span>
                Please <a href="/login">Login</a>/
                <a href="/register">Register</a>
              </span>
            </div>
          )}
        </div>

        <div className="map">
          <MapComponent />
          <div className="map-overlay">
            <div className="map-searchbox">
              <input type="text" placeholder="Search..." />
            </div>
            <div className="map-info-box trend-info">Disease Trend Here</div>
            <div className="map-info-box diagnosis-info">
              Diagnosis Count Here
            </div>
          </div>
        </div>

        <div className="chat-bot">
          <ChatbotComponent />
        </div>
      </main>
    </div>
  );
}

export default Home;
