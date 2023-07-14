import React from "react";
import "./App.css";
import Skeleton from "react-loading-skeleton";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Modals/Register";
import Login from "./components/Modals/Login";

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-row items-center justify-around">
        <div>
          <h1 className="text-2xl">Latam Wallet Landing Page</h1>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
        <div>
        <Register />
        </div>
      
      </div>
    </>
  );
}

export default App;
