import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import HomePageTest from "./HomePageTest";
import HealthTips from "./HealthTips";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/homePageTest" element={<HomePageTest />} />
        <Route path="/healthtips" element={<HealthTips />} />
      </Routes>
      <div className="App"></div>
    </BrowserRouter>
  );
}

export default App;
