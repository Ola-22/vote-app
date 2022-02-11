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
      <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      // }}
      >
        <h4>{name}</h4>
        <p>{progress}</p>
      </div>

      <div>
        <h6 style={{ fontSize: "16px", color: "#2f2f2f" }}>{RateVote}</h6>
        <h5 style={{ fontSize: "12px", color: "#2f2f2f", opacity: "0.6" }}>
          {voteNumber}
        </h5>
      </div>
    </div>
  );
}
