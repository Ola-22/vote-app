import { Link } from "react-router-dom";
import Choices from "../Components/Choices";
import Header from "../Components/Header";
import QuestionCard from "../Components/QuestionCard";
import { data } from "../data";

export default function Home() {
  return (
    <div>
      <Header />
      {data.Questions.map((question) => (
        <div key={question._id}>
          <Link to={`/vote-main/${question._id}`}>
            <QuestionCard
              endVote={question.endVote}
              title={question.title}
              imgSrc={question.imgSrc}
              componay={question.company}
            />
          </Link>
        </div>
      ))}
      <h5 className="title">المرشحين</h5>
      <Choices />
    </div>
  );
}
