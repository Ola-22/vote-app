import { useParams } from "react-router-dom";
import ChoicesCard from "../Components/Choices/ChoicesCard";
import Header from "../Components/Header";
import QuestionCard from "../Components/QuestionCard";
import { data } from "../data";
import "../Components/Choices/style.css";
import ProgressBar from "../Components/ProgressBar";

export default function ResultPage({ choice, setChoice, results, setResults }) {
  const { id } = useParams();

  const result = data.Questions.filter((question, index) => {
    return question._id === id;
  });
  console.log(
    Object.entries(JSON.parse(localStorage.getItem("vote-result"))).map(
      ([key, val]) => {
        return (
          <p key={key}>
            {key}: {val}
          </p>
        );
      }
    )
  );
  return (
    <>
      <Header />
      {result.map((question) => (
        <div key={question._id}>
          <QuestionCard
            endVote={question.endVote}
            title={question.title}
            imgSrc={question.imgSrc}
            componay={question.company}
          />
        </div>
      ))}
      <h5 className="title">المرشحين</h5>
      <div className="choices">
        {Object.entries(JSON.parse(localStorage.getItem("vote-result"))).map(
          ([key, val]) => {
            return (
              <>
                <ChoicesCard
                  className="choices-card card"
                  name={key}
                  src="/images/employee1.png"
                  progress={
                    <ProgressBar bgcolor="blue" progress={val * 3} height={5} />
                  }
                  per={`%`}
                  RateVote={val * 3}
                  voteNumber={`${val} صوت`}
                />
              </>
            );
          }
        )}
      </div>
    </>
  );
}
