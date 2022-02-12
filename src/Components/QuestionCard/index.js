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
      <div className="question-container" style={{ height: "121px" }}>
        <div>
          <img src="/images/calender.png" alt="" />
          <h5 style={{ color: "#b6b6b6", margin: "0" }} className="date-vote">
            {endVote}
          </h5>
        </div>
        <h4>{title}</h4>
        <div style={{ justifyContent: "flex-start" }}>
          <img src={imgSrc} alt="" />
          <h5>{componay}</h5>
        </div>
        <>
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          > */}
          {/* <div className="background" /> */}

          {/* </div> */}

          <div
            className="vote-number"
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <img src={img} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h6>{numberTitle}</h6>
              <h5>{numberVote}</h5>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
