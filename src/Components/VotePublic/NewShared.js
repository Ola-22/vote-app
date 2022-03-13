import QuestionCard from "../QuestionCard";
import moment from "moment";
import { Link } from "react-router-dom";
import SkeletonArticle from "../Skeletons/SkeletonArticle";

export default function NewShared({ questions }) {
  const NewQue = questions?.filter((qu) => qu.type === "public");

  return (
    <div>
      {NewQue?.map((qu) => (
        <Link to={`/vote-main/${qu.slug} `} key={qu.id}>
          <QuestionCard
            question={qu.question}
            end_at={moment(qu.end_at).format("Do MMMM YYYY h a")}
            img="/images/Group.png"
            numberTitle="عدد المصوتين"
            numberVote={qu?.candidates
              .map((can) => can.total_votes)
              .reduce((a, b) => a + b)}
            voteContent="صوت"
          />
        </Link>
      ))}
      {!NewQue && [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} />)}
    </div>
  );
}
