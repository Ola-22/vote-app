const ProgressBar = ({ bgcolor, progress, height }) => {
  const ProgressContainer = {
    height: height,
    width: "100%",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    margin: 50,
  };

  const ProgressDiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
  };

  const ProgressText = {
    padding: 10,
    color: "black",
    fontWeight: 900,
  };

  return (
    <div style={ProgressContainer}>
      <div style={ProgressDiv}>
        <span style={ProgressText}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
