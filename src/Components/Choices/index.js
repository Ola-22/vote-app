import { data } from "../../data";
import ChoicesCard from "./ChoicesCard";
import "./style.css";
import { useState, useEffect } from "react";

export default function Choices() {
  const [isActive, setActive] = useState(null);
  const [choice, setChoice] = useState("");
  const [results, setResults] = useState({});

  const vote = () => {
    if (!localStorage.getItem("vote-result")) {
      localStorage.setItem("vote-result", JSON.stringify({}));
    }
    setResults({ ...results, [choice]: (results[choice] ?? 0) + 1 });
  };

  useEffect(() => {
    localStorage.setItem("vote-result", JSON.stringify(results));
  }, [results]);

  function setActiveElement(id) {
    setActive(id);
  }
  return (
    <div className="choices">
      {data.Choices.map((choice) => (
        <div key={choice._id}>
          <ChoicesCard
            className={
              choice._id === isActive ? "choices-card active" : "choices-card"
            }
            onClick={() => {
              setActiveElement(choice._id);
              setChoice(choice.name);
            }}
            name={choice.name}
            src={choice.imgSrc}
          />
        </div>
      ))}
      {isActive && (
        <button onClick={vote} style={{ backgroundColor: "#2e558d" }}>
          تأكيد
        </button>
      )}
    </div>
  );
}
