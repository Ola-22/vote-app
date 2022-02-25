import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import VoteMain from "./Pages/VoteMain";
import ResultPage from "./Pages/ResultPage";
import { useState, useEffect } from "react";
import axiosInstance from "./helpers/axios";
import "./styles/main.css";

function App() {
  const [choice, setChoice] = useState("");
  const [results, setResults] = useState({});

  const vote = () => {
    if (!localStorage.getItem("vote-result")) {
      localStorage.setItem("vote-result", JSON.stringify({}));
    }
    setResults({ ...results, [choice]: (results[choice] ?? 0) + 1 });
  };

  useEffect(() => {
    localStorage.setItem("vote-result", JSON.stringify(results));
  }, [results]);

  const [questions, setQuestions] = useState();
  const [macAddress, setMacAddress] = useState(null);

  // console.log(questions.map((uiy) => uiy.id));

  useEffect(() => {
    axiosInstance
      .post("/vote", {
        mac_address: macAddress,
        vote_id: choice,
        question_id: 1,
      })
      .then((res) => {
        console.log("R", res.config);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [macAddress, choice]);

  useEffect(() => {
    axiosInstance
      .post("/votes", { page_number: 1, page_size: 10, vote_id: choice })
      .then((res) => {
        setQuestions(res.data.items.data);
        // console.log("RES", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [choice]);

  useEffect(() => {
    const navigator_info = window.navigator;
    const screen_info = window.screen;
    const uid = navigator_info.mimeTypes.length;
    const uidd = uid + navigator_info.userAgent.replace(/\D+/g, "");
    const uuidd = uidd + navigator_info.plugins.length;
    const uuiddd = uuidd + screen_info.height || "";
    const uids = uuiddd + screen_info.width || "";
    const newidd = uids + screen_info.pixelDepth || "";
    setMacAddress(newidd);
  }, [macAddress]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/vote-main"
            element={<VoteMain questions={questions} />}
          />
          <Route path="/vote-main/:id" element={<ResultPage />} />
          <Route
            path="/"
            element={
              <Home setChoice={setChoice} vote={vote} questions={questions} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
