import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/UserAuth/Register";
import Login from "./components/UserAuth/Login";
import { useSelector } from "react-redux";

function App() {
  const { isOpen } = useSelector((state) => state.auth) 
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-row items-center justify-around">
        <div>
        {isOpen ? <Login /> : <Register />}
        </div>
      
      </div>
    </>
  );
}

export default App;
