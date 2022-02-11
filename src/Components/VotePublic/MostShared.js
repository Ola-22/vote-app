import { data } from "../../data";
import QuestionCard from "../QuestionCard";

export default function NewShared() {
  return (
    <div>
      {data.PublicShared.MostShared.map((question) => (
        <>
          <QuestionCard
            endVote={question.endVote}
            title={question.title}
            img={question.img}
            numberVote={question.numberVote}
            numberTitle={question.numberTitle}
          />
        </>
      ))}
    </div>
  );
}
