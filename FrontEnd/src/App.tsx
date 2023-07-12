import React from "react";
import "./App.css";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import { RootState } from "./store/store";

function App() {
  const isOpen = useSelector<RootState>((state) => state.modal.isOpen);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col items-center pt-28">
        <h1>Latam Wallet</h1>
        {isOpen && <RegisterModal />}
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </>
  );
}

export default App;
