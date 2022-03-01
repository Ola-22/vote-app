import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VoteMain from "./Pages/VoteMain";
import ResultPage from "./Pages/ResultPage";
import { useState, useEffect } from "react";
import axiosInstance from "./helpers/axios";
import "./styles/main.css";
import Modal from "./Components/Modal";

function App() {
  const [choice, setChoice] = useState("");
  const [results, setResults] = useState({});
  const [questionId, setQuestionId] = useState();
  const [showButton, setShowButton] = useState(false);
  const [message, setMessage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isActive, setActive] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

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
    setMessage(false);
  };

  // setTimeout(() => {
  //   if (activeText === true) {
  //     setActiveText(false);
  //   }
  // }, 2000);

  const [questions, setQuestions] = useState();
  const [macAddress, setMacAddress] = useState(null);

  async function postData() {
    const data = {
      mac_address: macAddress,
      candidate_id: choice,
      vote_id: questionId,
    };
    await axiosInstance
      .post("/vote", data)
      .then((res) => {
        // console.log(res.data.status);
        // if (
        //   res.data.status === false
        //   // ||
        //   // data.vote_id === res.data.items.vote.question
        // if(vote)
        // console.log(res.data.items.vote);
        // ) {
        setMessage(res.data);
        // console.log(res);
        console.log(message);
        // document.write(res.data.message);
        // } else {
        // }
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
                show={show}
                postData={postData}
                message={message}
                setMessage={setMessage}
                openModal={openModal}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
