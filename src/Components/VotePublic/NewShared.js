import QuestionCard from "../QuestionCard";
import moment from "moment";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function NewShared({ questions }) {
  const iddd = uuidv4();

  return (
    <div>
      {questions?.map((qu) => (
        <Link to={`/vote-main/${qu.slug} `} key={qu.id}>
          <QuestionCard
            question={qu.question}
            end_at={moment(qu.end_at).format("Do MMMM YYYY h a")}
            img="/images/share.png"
            numberTitle="عدد المصوتين"
            numberVote={qu?.candidates
              .map((can) => can.total_votes)
              .reduce((a, b) => a + b)}
          />
        </Link>
      ))}
    </div>
  );
}
