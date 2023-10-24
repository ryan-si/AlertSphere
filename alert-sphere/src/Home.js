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
import useHospitals from "./hooks/useHospitals";
//import useCases from "./hooks/useCases";
// const token = sessionStorage.getItem("token");
// const email = sessionStorage.getItem("email");

function Home() {
  const [apiResponse, setApiResponse] = React.useState("");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [mapCenter, setMapCenter] = useState({ lat: -33.8688, lng: 151.2093 });
  //const [markerPosition, setMarkerPosition] = useState(null);
  const hospitals = useHospitals();
  //const cases=useCases();
  const [hospitalsCount, setHospitalsCount] = useState(14);

  const diseases = [
    { name: "COVID-19", count: 5000, trend: "up" },
    { name: "Flu", count: 3000, trend: "down" },
    { name: "Chickenpox", count: 1500, trend: "stable" },
    { name: "Measles", count: 1000, trend: "up" },
  ];

  // const isAdmin = sessionStorage.getItem("isAdmin") === "1";
  const isAdmin = true;

  {/*useEffect(() => {
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
  }, []);*/}

  return (
    <div className="home-page">
      <SideBarComponent />
      
      <main className="content">
        <TopBarComponent />

        <div className="map">
          <MapComponent
            center={mapCenter}
            hospitals={hospitals}
            onHospitalChange={count => setHospitalsCount(count)}
          />
          <div className="map-overlay">
            <div className="map-searchbox z-100">
              <SearchBarComponent
                onAddressSelect={(latLng) => {
                  setMapCenter(latLng)
                }}
              />
            </div>
            <div className="map-info-box diagnosis-info z-50 flex flex-col items-center">
              <div className="mb-2">Trend</div>
              {/* <div className="flex justify-center items-center w-16 h-16 border-4 border-blue-500 rounded-full p-2">
                <span className="text-2xl font-bold">9</span>
              </div> */}
              {diseases.map((disease) => (
                <div key={disease.name} className="flex items-center my-1">
                  <span className="mr-2">
                    {disease.name}: {disease.count}
                  </span>
                  {disease.trend === "up" && (
                    <img
                      src="arrow-up.png"
                      alt="Up trend"
                      className="w-5 h-5"
                    />
                  )}
                  {disease.trend === "down" && (
                    <img
                      src="arrow-down.png"
                      alt="Down trend"
                      className="w-5 h-5"
                    />
                  )}
                  {disease.trend === "stable" && (
                    <img
                      src="stable.png"
                      alt="Stable trend"
                      className="w-5 h-5"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="map-info-box diagnosis-info z-50 flex flex-col items-center">
              <div className="mb-2">Clinics</div>
              <div className="flex justify-center items-center w-16 h-16 border-4 border-blue-500 rounded-full p-2">
                <span className="text-2xl font-bold">{hospitalsCount}</span>
              </div>
            </div>
          </div>
          {/* <AskMeComponent /> */}
        </div>

        <div className="chat-bot z-50">
          {/*isAdmin ? <AdminComponent /> : <ChatbotComponent />*/}
          <ChatbotComponent />

        </div>
      </main>
    </div>
  );
}

export default Home;
