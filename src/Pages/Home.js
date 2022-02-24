import { Link } from "react-router-dom";
import Header from "../Components/Header";
import QuestionCard from "../Components/QuestionCard";
import { useEffect, useState } from "react";
import "./style.css";
import moment from "moment";

export default function Home({ questions }) {
  const [isActive, setActive] = useState(null);
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

  function setActiveElement(id) {
    setActive(id);
  }

  const [candidates, setCandidates] = useState();
  const [currQues, setCurrQues] = useState(0);

  // console.log(questions);

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
              end_at={moment(questions[currQues].end_at).format(
                "MMMM Do YYYY h a"
              )}
              companyImg="/images/company.png"
              company={questions[currQues].company}
            />
          </Link>

          <h5 className="title">المرشحين</h5>

          {questions[currQues].candidates.map((can) => (
            <div className="choices">
              <div
                className={
                  can.id === isActive ? "choices-card active" : "choices-card"
                }
                onClick={() => {
                  setActiveElement(can.id);
                  setChoice(can.name);
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
