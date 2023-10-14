import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./HomePage";
import HomePageTest from "./HomePageTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
        <Route path="/homePageTest" element={<HomePageTest />} />
      </Routes>
      <div className="App">
     
      </div>
    </BrowserRouter>
  );
}

export default App;
