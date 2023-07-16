import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

import TransferPage from "./pages/transferPage";

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col items-center pt-28">
        <TransferPage/>
      </div>
    </>
  );
}

export default App;
