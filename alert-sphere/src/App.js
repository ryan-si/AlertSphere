import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settingdetail" element={<SettingDetail />} />

        <Route path="/homePageTest" element={<HomePageTest />} />
        <Route path="/warnings" element={<Warnings />} />
        <Route path="/tips" element={<HealthTips />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <div className="App"></div>
    </BrowserRouter>
  );
}

export default App;
