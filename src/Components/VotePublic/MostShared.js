import QuestionCard from "../QuestionCard";
import moment from "moment";
import { Link } from "react-router-dom";
import SkeletonArticle from "../Skeletons/SkeletonArticle";

export default function MostShared({ questions }) {
  const MostQue = questions

    ?.filter((qu) => qu.type === "public")
    .sort((a, b) => b.total_votes - a.total_votes);

  return (
    <div>
      {MostQue?.map((qu) => (
        <Link to={`/vote-main/${qu.slug}`} key={qu.id}>
          <QuestionCard
            question={qu.question}
            end_at={moment(qu.end_at).format("Do MMMM YYYY h a")}
            img="/images/Group.png"
            numberTitle="عدد المصوتين"
            numberVote={qu.total_votes}
            voteContent="صوت"
          />
        </Link>
      )).sort((a, b) => b.ii - a.ii)}

      {!MostQue && [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} />)}
    </div>
  );
}
