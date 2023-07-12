import React from "react";
import "./App.css";
import Skeleton from "react-loading-skeleton";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col items-center pt-28">
        <h1>Latam Wallet</h1>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </>
  );
}

export default App;
