import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/UserAuth/Register";
import Login from "./components/UserAuth/Login";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import UserAuth from "./pages/UserAuth";
function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <Toaster></Toaster>
      <div className="flex flex-row items-center justify-around">
        <Routes>
          <Route path="/" element={<UserAuth />} />
          <Route path="main" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
