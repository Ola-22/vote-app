import QuestionCard from "../QuestionCard";
import moment from "moment";
import { Link } from "react-router-dom";

export default function NewShared({ questions }) {
  const NewQue = questions?.slice(0, 5);

  const arr = NewQue?.map((qu) =>
    qu.candidates?.map((can) => can.total_votes).reduce((a, b) => a + b)
  );

  return (
    <div>
      {NewQue?.map((qu) => (
        <Link to={`/vote-main/${qu.id}`}>
          <QuestionCard
            key={qu.id}
            question={qu.question}
            end_at={moment(qu.end_at).format("Do MMMM YYYY h a")}
            img="/images/share.png"
            numberTitle="عدد المصوتين"
            // numberVote={arr}
          />
        </Link>
      ))}
    </div>
  );
}
