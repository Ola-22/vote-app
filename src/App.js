import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VoteMain from "./Pages/VoteMain";
import ResultPage from "./Pages/ResultPage";
import { useState, useEffect } from "react";
import axiosInstance from "./helpers/axios";
import "./styles/main.css";

function App() {
  const [choice, setChoice] = useState("");
  const [results, setResults] = useState({});
  const [questionId, setQuestionId] = useState();
  const [showButton, setShowButton] = useState(false);
  const [activeText, setActiveText] = useState(false);

  const [isActive, setActive] = useState(false);

  function setActiveElement(id) {
    setActive(id);
  }

  const vote = () => {
    if (!localStorage.getItem("vote-result")) {
      localStorage.setItem("vote-result", JSON.stringify({}));
    }
    setResults({ ...results, [choice]: (results[choice] ?? 0) + 1 });
  };

  useEffect(() => {
    localStorage.setItem("vote-result", JSON.stringify(results));
  }, [results]);

  const show = () => {
    setShowButton(!showButton);
    setActive(null);
    setActiveText(!activeText);
  };

  setTimeout(() => {
    if (activeText === true) {
      setActiveText(false);
    }
  }, 2000);

  const [questions, setQuestions] = useState();
  const [macAddress, setMacAddress] = useState(null);

  useEffect(() => {
    axiosInstance
      .post("/vote", {
        mac_address: macAddress,
        vote_id: choice,
        question_id: questionId,
      })
      .then((res) => {
        // console.log("R", res);
        vote();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [macAddress, choice, questionId]);

  useEffect(() => {
    axiosInstance
      .post("/votes", { page_number: 1, page_size: 10 })
      .then((res) => {
        setQuestions(res.data.items.data);
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
          <Route path="/" element={<VoteMain questions={questions} />} />
          <Route
            path="/vote-main/:id"
            element={
              <ResultPage
                setActive={setActive}
                vote={vote}
                setChoice={setChoice}
                setShowButton={setShowButton}
                setQuestionId={setQuestionId}
                showButton={showButton}
                setActiveElement={setActiveElement}
                isActive={isActive}
                activeText={activeText}
                show={show}
                setActiveText={setActiveText}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
