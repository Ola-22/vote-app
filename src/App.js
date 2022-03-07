import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VoteMain from "./Pages/VoteMain";
import ResultPage from "./Pages/ResultPage";
import { useState, useEffect } from "react";
import axiosInstance from "./helpers/axios";
import "./styles/main.css";
import Modal from "./Components/Modal";
import ConfirmCode from "./Pages/ConfirmCode";

export default function App() {
  const [choice, setChoice] = useState([]);
  const [questionId, setQuestionId] = useState();
  const [showButton, setShowButton] = useState(false);
  const [message, setMessage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [macAddress, setMacAddress] = useState(null);
  const [Input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [messageConfirm, setMessageConfirm] = useState();
  const [resendCode, setResendCode] = useState();

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

  function handleClick() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  async function postData() {
    const data = {
      mac_address: macAddress,
      candidate_id: choice,
      vote_id: questionId,
      phone: Input,
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
        // console.log(questions);
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

  console.log("R", code);
  async function confirmCode() {
    const data = {
      mac_address: macAddress,
      candidate_id: choice,
      vote_id: questionId,
      phone: Input,
      code: code,
    };
    setLoading(true);

    await axiosInstance
      .post("/confirm-code", data)
      .then((res) => {
        setMessageConfirm(res.data);
        console.log("Rc", res.data);

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((err) => console.log(err));
  }

  async function sendCode() {
    const data = {
      mac_address: macAddress,
      phone: Input,
    };
    setLoading(true);

    await axiosInstance
      .post("/send-code", data)
      .then((res) => {
        setResendCode(res.data);
        console.log("Rcss", resendCode);

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((err) => console.log(err));
  }

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
                handleClick={handleClick}
              />
            }
          />
          <Route
            path="/confirm-code"
            element={
              <ConfirmCode
                setCode={setCode}
                code={code}
                confirmCode={confirmCode}
                messageConfirm={messageConfirm}
                setMessageConfirm={setMessageConfirm}
                sendCode={sendCode}
                resendCode={resendCode}
                setResendCode={setResendCode}
              />
            }
          />
        </Routes>
        <Modal
          postData={postData}
          showModal={showModal}
          setShowModal={setShowModal}
          Input={Input}
          setInput={setInput}
          message={message}
          isLoading={isLoading}
          handleClick={handleClick}
        />
      </div>
    </BrowserRouter>
  );
}

// export default App;
