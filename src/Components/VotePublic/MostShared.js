import QuestionCard from "../QuestionCard";
import moment from "moment";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function MostShared({ questions }) {
  const MostQue = questions.sort((a, b) => b.id - a.id);

  const { slug } = useParams();
  console.log(
    "TTs",
    questions?.filter((qu) => qu.slug === slug)
  );

  return (
    <div>
      {MostQue?.map((qu) => (
        <Link to={`/vote-main/${qu.id}`} key={qu.id}>
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
