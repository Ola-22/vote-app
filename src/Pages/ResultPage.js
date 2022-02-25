import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import QuestionCard from "../Components/QuestionCard";
import "../Components/Choices/style.css";
import ProgressBar from "../Components/ProgressBar";
import { useEffect, useState } from "react";
import axiosInstance from "../helpers/axios";
import moment from "moment";
import ChoicesCard from "../Components/Choices/ChoicesCard";

export default function ResultPage() {
  const { id } = useParams();
  const [results, setResults] = useState();

  useEffect(() => {
    axiosInstance
      .get(`/vote/${id}`)
      .then((res) => {
        setResults(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="result">
      <Header />
      {results ? (
        <div>
          <QuestionCard
            question={results.question}
            end_at={moment(results.end_at).format("LLL")}
            company={results.company}
            companyImg="/images/company.png"
          />

          <h5 className="title">المرشحين</h5>
          <>
            {results.candidates.map((can) => (
              <div key={can.id} className="choices">
                <ChoicesCard
                  className="choices-card"
                  src={can.photo}
                  progress={
                    <ProgressBar
                      bgcolor="blue"
                      progress={can.vote_precentage}
                      height={5}
                    />
                  }
                  voteNumber={can.total_votes}
                  RateVote={can.vote_precentage}
                  name={can.name}
                />
              </div>
            ))}
          </>
        </div>
      ) : (
        <div>Loading... </div>
      )}
    </div>
  );
}
