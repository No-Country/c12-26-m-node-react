import React from "react";
import "./App.css";
import Skeleton from "react-loading-skeleton";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Modals/Register";
import Login from "./components/Modals/Login";
import Heading from "./components/Layouts/Heading";

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-row items-center justify-around">
        <div>
          <Heading title="Latam Wallet Landing Page" />
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
