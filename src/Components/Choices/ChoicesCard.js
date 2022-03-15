import "./style.css";

export default function ChoicesCard({
  src,
  name,
  onClick,
  className,
  progress,
  voteNumber,
  RateVote,
}) {
  return (
    <div className={className} onClick={onClick}>
      <img src={src} alt="" />
      <div>
        <h4>{name}</h4>
        <div style={{ marginTop: "10px" }}>{progress}</div>
      </div>

      <div>
        <div style={{ display: "flex" }}>
          <h6 style={{ fontSize: "16px", color: "#2f2f2f" }}>{RateVote} %</h6>
        </div>

        <h5 style={{ fontSize: "12px", color: "#2f2f2f", opacity: "0.6" }}>
          {voteNumber} صوت
        </h5>
      </div>
    </div>
  );
}
