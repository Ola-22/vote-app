import "./style.css";

export default function QuestionCard({
  end_at,
  question,
  company,
  numberVote,
  img,
  companyImg,
  numberTitle,
}) {
  return (
    <div>
      <div className="question-container" style={{ height: "121px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src="/images/calender.png" alt="" />
          <h5 style={{ color: "#b6b6b6" }} className="date-vote">
            ينتهي التصويت في
            <span>{end_at}</span>
          </h5>
        </div>
        <h4>{question}</h4>
        <div style={{ justifyContent: "flex-start" }}>
          <img src={companyImg} alt="" />
          <h5>{company}</h5>
        </div>

        <div
          className="vote-number"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="background-container">
            <img src={img} alt="" />
            <p className="background-page" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h6>{numberTitle}</h6>
            <h5>{numberVote}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
