import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import VoteMain from "./Pages/VoteMain";
import ResultPage from "./Pages/ResultPage";
import QrCode from "./Pages/QrCode";
import { useState, useEffect } from "react";
import axiosInstance from "./helpers/axios";
import "./styles/main.css";

function App({ candidates }) {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    axiosInstance
      .post("/votes", { page_number: 1, page_size: 10 })
      .then((res) => {
        setQuestions(res.data.items.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/vote-main"
            element={<VoteMain questions={questions} />}
          />
          <Route path="/vote-main/:id" element={<ResultPage />} />
          <Route path="/qr-code" element={<QrCode text="ola" />} />
          <Route
            path="/"
            element={<Home questions={questions} setQuestions={setQuestions} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
