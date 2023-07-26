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
import Payment from "./components/Stripe/Payment";
import Transaction from "./pages/Transaction"
import Profile from "./pages/Profile";
function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
        <Toaster />
      <div className="flex flex-col items-center justify-center">      
      <Routes>
        <Route path="/" element={<UserAuth />} />
        <Route path="main" element={<MainPage />} />
        <Route path="payment" element={<Payment/>}/>
        <Route path="transactions" element={<Transaction/>}/>
        <Route path="userProfile" element={<Profile />}/>
      </Routes>
      </div>
    </>
  );
}

export default App;
