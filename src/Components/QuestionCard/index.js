import "./style.css";

export default function QuestionCard({
  endVote,
  title,
  numberVote,
  imgSrc,
  componay,
  img,
  numberTitle,
}) {
  return (
    <>
      <div className="question-container">
        <div>
          <img src="/images/calender.png" alt="" />
          <h5 style={{ color: "#b6b6b6" }} className="date-vote">
            {endVote}
          </h5>
        </div>
        <h4>{title}</h4>
        <div style={{ justifyContent: "flex-start" }}>
          <img src={imgSrc} alt="" />
          <h5>{componay}</h5>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <div className="background" /> */}
            <img src={img} alt="" />
          </div>

          <div className="vote-number">
            <h6>{numberTitle}</h6>
            <h5>{numberVote}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
