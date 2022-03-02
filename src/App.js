import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VoteMain from "./Pages/VoteMain";
import ResultPage from "./Pages/ResultPage";
import { useState, useEffect } from "react";
import axiosInstance from "./helpers/axios";
import "./styles/main.css";

function App() {
  const [choice, setChoice] = useState([]);
  const [questionId, setQuestionId] = useState();
  const [showButton, setShowButton] = useState(false);
  const [message, setMessage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [macAddress, setMacAddress] = useState(null);

  const openModal = () => {
    setTimeout(() => {
      setShowModal((prev) => !prev);
    }, 2000);
  };

  function setActiveElement(id) {
    setActive(id);
  }

  const show = () => {
    setShowButton(!showButton);
    setActive(null);
    setMessage(false);
  };

  async function postData() {
    const data = {
      mac_address: macAddress,
      candidate_id: choice,
      vote_id: questionId,
    };
    setLoading(true);

    await axiosInstance
      .post("/vote", data)
      .then((res) => {
        setMessage(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((err) => console.log(err));
  }

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
            path="/vote-main/:slug"
            element={
              <ResultPage
                questions={questions}
                setActive={setActive}
                setChoice={setChoice}
                setShowButton={setShowButton}
                setQuestionId={setQuestionId}
                showButton={showButton}
                setActiveElement={setActiveElement}
                isActive={isActive}
                show={show}
                postData={postData}
                message={message}
                setMessage={setMessage}
                openModal={openModal}
                showModal={showModal}
                setShowModal={setShowModal}
                isLoading={isLoading}
                choice={choice}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
