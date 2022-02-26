import { Link } from "react-router-dom";
import Header from "../Components/Header";
import QuestionCard from "../Components/QuestionCard";
import { useEffect, useState } from "react";
import "./style.css";
import moment from "moment";

export default function Home({ questions, vote, setChoice, setQuestionId }) {
  const [isActive, setActive] = useState(null);

  function setActiveElement(id) {
    setActive(id);
  }

  const [candidates, setCandidates] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    setCandidates(questions && handleShuffle([questions[currQues]]));
  }, [questions, currQues]);

  const handleShuffle = (optionss) => {
    return optionss.sort(() => Math.random() - 0.5);
  };

  return (
    <div>
      <Header />

      {questions ? (
        <div key={questions.id}>
          <Link to={`/vote-main/${questions[currQues].id}`}>
            <QuestionCard
              question={questions[currQues].question}
              end_at={moment(questions[currQues]).format("Do MMMM YYYY h a")}
              companyImg="/images/company.png"
              company={questions[currQues].company}
            />
          </Link>

          <h5 className="title">المرشحين</h5>

          {questions[currQues].candidates.map((can) => (
            <div className="choices" key={can.id}>
              <div
                className={
                  can.id === isActive ? "choices-card active" : "choices-card"
                }
                onClick={() => {
                  setActiveElement(can.id);
                  setChoice(can.id);
                  setQuestionId(questions[currQues].id);
                }}
              >
                <img src={can.photo} alt="" />
                <h2>{can.name}</h2>
              </div>
            </div>
          ))}
          {isActive && (
            <button
              className="btn-vote"
              onClick={vote}
              style={{ backgroundColor: "#2e558d" }}
            >
              تأكيد
            </button>
          )}
        </div>
      ) : (
        <div>Loading... </div>
      )}
    </div>
  );
}
