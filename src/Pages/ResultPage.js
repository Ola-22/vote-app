import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChoicesCard from "../Components/Choices/ChoicesCard";
import Header from "../Components/Header";
import QuestionCard from "../Components/QuestionCard";
import { data } from "../data";
import "../Components/Choices/style.css";
import ProgressBar from "../Components/ProgressBar";

export default function ResultPage() {
  const { id } = useParams();

  const result = data.Questions.filter((question, index) => {
    return question._id === id;
  });

  return (
    <>
      <Header />
      {result.map((question) => (
        <>
          <QuestionCard
            endVote={question.endVote}
            title={question.title}
            imgSrc={question.imgSrc}
            componay={question.company}
          />
        </>
      ))}
      <h5 class="title">المرشحين</h5>
      <div className="choices">
        {data.Choices.map((choice) => (
          <div key={choice._id}>
            <ChoicesCard
              className="choices-card card"
              name={choice.name}
              src={choice.imgSrc}
              progress={
                <ProgressBar
                  bgcolor="blue"
                  progress={choice.RateVote}
                  height={5}
                />
              }
              RateVote={choice.RateVote}
              voteNumber={choice.voteNumber}
            />
          </div>
        ))}
      </div>
    </>
  );
}
