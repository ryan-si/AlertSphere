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
import { getColorForDisease } from "./utils/colorUtils";
import useCases from "./hooks/useCases";
// const token = sessionStorage.getItem("token");
// const email = sessionStorage.getItem("email");

function Home() {
  const [apiResponse, setApiResponse] = React.useState("");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [mapCenter, setMapCenter] = useState({ lat: -33.8688, lng: 151.2093 });
  const hospitals = useHospitals();
  const { cases, setCases } = useCases();
  const [hospitalsCount, setHospitalsCount] = useState(14);
  const [caseData, setCaseData] = useState({});

  useEffect(() => {
    document.title = "AlertSphere";
  }, []);

  const handleCaseChange = (data) => {
    // console.log("handleCaseChange", data);
    setCaseData(data);
  };
  // const isAdmin = sessionStorage.getItem("isAdmin") === "1";
  // const isAdmin = false;
  const isAdmin = sessionStorage.getItem("is_admin");
  // console.log("isAdmin", isAdmin);
  return (
    <div className="home-page">
      <SideBarComponent />
      <main className="content">
        <TopBarComponent />
        <div className="map">
          <MapComponent
            center={mapCenter}
            hospitals={hospitals}
            onHospitalChange={(count) => setHospitalsCount(count)}
            cases={cases}
            onCaseChange={(data) => handleCaseChange(data)}
          />
          <div className="map-overlay">
            <div className="map-searchbox z-100">
              <SearchBarComponent
                onAddressSelect={(latLng) => {
                  setMapCenter(latLng);
                }}
              />
            </div>
            <div className="map-info-box diagnosis-info z-50 flex flex-col items-center">
              <div className="mb-2">Cases</div>
              {Object.entries(caseData).map(([diseaseName, count]) => (
                <div key={diseaseName} className="flex items-center my-1">
                  <span
                    className="mr-2"
                    style={{ color: getColorForDisease(diseaseName) }}
                  >
                    {diseaseName}: {count}
                  </span>
                </div>
              ))}
            </div>
            <div className="map-info-box diagnosis-info z-50 flex flex-col items-center">
              <div className="mb-2">Hospitals</div>
              <div className="flex justify-center items-center w-16 h-16 border-4 border-blue-500 rounded-full p-2">
                <span className="text-2xl font-bold">{hospitalsCount}</span>
              </div>
            </div>
          </div>
          {/* <AskMeComponent /> */}
        </div>

        <div className="chat-bot z-50">
          {isAdmin&&isAdmin==='1' ? <AdminComponent /> : <ChatbotComponent />}
          {/* <ChatbotComponent /> */}
          {/* <AdminComponent /> */}
        </div>
      </main>
    </div>
  );
}

export default Home;
