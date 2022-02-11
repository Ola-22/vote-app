import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Components/Header";
import QuestionCard from "../Components/QuestionCard";
import { data } from "../data";

export default function ResultPage() {
  const { id } = useParams();

  const result = data.Questions.filter((question, index) => {
    return question._id === id;
  });

  return (
    <>
      <Header />
      {data.Questions.map((question) => (
        <>
          <QuestionCard
            endVote={question.endVote}
            title={question.title}
            imgSrc={question.imgSrc}
            componay={question.company}
          />
          dd
        </>
      ))}
    </>
  );
}
