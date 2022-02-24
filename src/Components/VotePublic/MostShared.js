import QuestionCard from "../QuestionCard";
import moment from "moment";

export default function MostShared({ questions }) {
  const MostQue = questions.sort((a, b) => b.id - a.id);
  console.log("n", MostQue);

  return (
    <div>
      {MostQue?.map((qu) => (
        <>
          <QuestionCard
            question={qu.question}
            end_at={moment(qu.end_at).format("MMMM Do YYYY h a")}
            img="/images/share.png"
            numberTitle="عدد المصوتين"
            // numberVote={qu.candidates.reduce((a, b) => (
            //   <h2>{(a + b, 0)}</h2>
            // ))}
          />
        </>
      ))}
    </div>
  );
}
