import QuestionCard from "../QuestionCard";
import moment from "moment";

export default function NewShared({ questions }) {
  const NewQue = questions?.slice(0, 5);
  return (
    <div>
      {NewQue?.map((qu) => (
        <QuestionCard
          question={qu.question}
          end_at={moment(qu.end_at).format("MMMM Do YYYY h a")}
          img="/images/share.png"
          numberTitle="عدد المصوتين"
          // numberVote={qu.candidates.map.reduce((a, b) => a + b, 0)}
        />
      ))}
    </div>
  );
}
