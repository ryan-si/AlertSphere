import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import HomePageTest from "./HomePageTest";
import Warnings from "./Warnings";
import HealthTips from "./HealthTips";
import Favorites from "./Favorites";
import NewsPage from "./NewsPage";
import Settings from "./Settings";
import SettingDetail from "./SettingDetail";
import { LoadScript } from "@react-google-maps/api";
import HelpPage from "./HelpPage";

function App() {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settingDetail" element={<SettingDetail />} />
          <Route path="/homePageTest" element={<HomePageTest />} />
          <Route path="/warnings" element={<Warnings />} />
          <Route path="/healthTips" element={<HealthTips />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
        <div className="App"></div>
      </BrowserRouter>
    </LoadScript>
  );
}

export default App;
