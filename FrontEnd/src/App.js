import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/UserAuth/Register";
import Login from "./components/UserAuth/Login";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import MainPage from "./pages/MainPage";
import {Routes, Route} from "react-router-dom"
import UserAuth from "./pages/UserAuth";
function App() {

  return (
    <>
      <div>
        <Navbar />
      </div>
        <Toaster />
      <div className="flex flex-row items-center justify-around">      
      <Routes>
        <Route path="/" element={<UserAuth />} />
        <Route path="main" element={<MainPage />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
