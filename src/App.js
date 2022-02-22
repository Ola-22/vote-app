import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import VoteMain from "./Pages/VoteMain";
import ResultPage from "./Pages/ResultPage";
import QrCode from "./Pages/QrCode";
// import getMAC, { isMAC } from "getmac";
import { useState, useEffect } from "react";
import axiosInstance from "./helpers/axios";

function App() {
  useEffect(() => {
    axiosInstance
      .post("/votes", { page_number: 1, page_size: 10 })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/vote-main" element={<VoteMain />} />
          <Route path="/vote-main/:id" element={<ResultPage />} />
          <Route path="/qr-code" element={<QrCode text="ola" />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
