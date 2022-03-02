import QuestionCard from "../QuestionCard";
import moment from "moment";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function MostShared({ questions }) {
  const MostQue = questions.sort((a, b) => b.id - a.id);

  const iddd = uuidv4();

  return (
    <div>
      {MostQue?.map((qu) => (
        <Link to={`/vote-main/${qu.id} ${iddd}`} key={qu.id}>
          <QuestionCard
            question={qu.question}
            end_at={moment(qu.end_at).format("Do MMMM YYYY h a")}
            img="/images/share.png"
            numberTitle="عدد المصوتين"
            numberVote={
              qu?.candidates
                .map((can) => can.total_votes)
                .reduce((a, b) => a + b)
              // .sort((a, b) => b - a)
            }
          />
        </Link>
      )).sort((a, b) => b.ii - a.ii)}
    </div>
  );
}
