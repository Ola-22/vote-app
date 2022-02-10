import { data } from "../../data";
import "./style.css";

export default function QuestionCard() {
  return (
    <>
      {data.Questions.map((question) => (
        <div key={question._id} className="question-container">
          <div>
            <img src="/images/calender.png" alt="" />
            <h5 style={{ color: "#b6b6b6" }} className="date-vote">
              {question.endVote}
            </h5>
          </div>
          <h4>{question.title}</h4>
          <div>
            <img src="/images/company.png" alt="" />
            <h5>شركة نيوسليوشن</h5>
          </div>
        </div>
      ))}
    </>
  );
}
