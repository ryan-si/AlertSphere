import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import MapComponent from "./components/MapComponent";
import ChatbotComponent from "./components/ChatbotComponent";
import SideBarComponent from "./components/SideBarComponent";
import TopBarComponent from "./components/TopBarComponent";
import SearchBarComponent from "./components/SearchBarComponent";
import AskMeComponent from "./components/AskMeComponent";
import AdminComponent from "./components/AdminComponent";
// const token = sessionStorage.getItem("token");
// const email = sessionStorage.getItem("email");

function Home() {
  const [apiResponse, setApiResponse] = React.useState("");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [mapCenter, setMapCenter] = useState({ lat: 41.3851, lng: 2.1734 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [zoom, setZoom] = useState(10); // 初始缩放级别为10

  // const isAdmin = sessionStorage.getItem("isAdmin") === "1";
  const isAdmin = true;

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          const userLocation = { lat, lng };
          setMapCenter(userLocation);
          setMarkerPosition(userLocation);
          // setZoom(12);
        },
        (error) => {
          console.error("Error obtaining geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser");
    }
  }, []);

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
        <TopBarComponent></TopBarComponent>
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
          {isAdmin ? <AdminComponent /> : <ChatbotComponent />}
        </div>
      </main>
    </div>
  );
}

export default Home;
