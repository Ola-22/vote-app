import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import QuestionCard from "../Components/QuestionCard";
import "../Components/Choices/style.css";
import ProgressBar from "../Components/ProgressBar";
import { useEffect, useState } from "react";
import axiosInstance from "../helpers/axios";
import moment from "moment";
import ChoicesCard from "../Components/Choices/ChoicesCard";
import { FaSpinner } from "react-icons/fa";

export default function ResultPage({
  show,
  setQuestionId,
  showButton,
  setShowButton,
  vote,
  setActiveElement,
  isActive,
  openModal,
  postData,
  message,
  setMessage,
  setShowModal,
  showModal,
  isLoading,
  choice,
  handleClick,
}) {
  const { slug } = useParams();

  const handleOnClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "",
          text: `Check out `,
          url: document.location.href,
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong sharing the blog", error);
        });
    }
  };

  const [results, setResults] = useState();

  useEffect(() => {
    axiosInstance
      .get(`/vote/${slug}`)
      .then((res) => {
        setResults(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  return (
    <div className="result">
      <Header />

      {results ? (
        <div>
          <QuestionCard
            question={results.question}
            end_at={moment(results.end_at).format("LLL")}
            company={results.company}
            companyImg="/images/company.png"
          />
          <h5 className="title">المرشحين</h5>
          <>
            {results.candidates.map((can) => (
              <div
                key={can.id}
                className="choices"
                onClick={() => setShowButton(true)}
              >
                <ChoicesCard
                  src={can.photo}
                  progress={
                    <ProgressBar
                      bgcolor="#80B3F5"
                      progress={can.vote_precentage}
                      height={5}
                    />
                  }
                  voteNumber={can.total_votes}
                  RateVote={can.vote_precentage}
                  name={can.name}
                  className={
                    isActive === can.id ? "choices-card active" : "choices-card"
                  }
                  onClick={() => {
                    setActiveElement(can.id);
                    choice.push(can.id);
                    setQuestionId(results.id);
                    setMessage(false);
                  }}
                />
              </div>
            ))}
          </>
          {showButton && (
            <button
              className="btn-vote"
              onClick={() => {
                show();
                handleClick();
                openModal();
              }}
              style={{ backgroundColor: "#75153B" }}
            >
              تأكيد
            </button>
          )}

          {isLoading && (
            <button
              disabled
              className="btn-vote disabled"
              onClick={() => {
                show();
                handleClick();
                openModal();
              }}
              style={{ backgroundColor: "#75153B" }}
            >
              <FaSpinner icon="spinner" />
              تأكيد
            </button>
          )}
          <div onClick={handleOnClick}>gff</div>
        </div>
      ) : (
        <div>Loading... </div>
      )}
    </div>
  );
}
