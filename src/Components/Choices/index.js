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
      {data.Choices.map((choice, index) => (
        <div>
          <ChoicesCard
            className={
              index === isActive ? "choices-card active" : "choices-card"
            }
            onClick={() => setActiveElement(index)}
            name={choice.name}
            src={choice.imgSrc}
          />
        </div>
      ))}
    </div>
  );
}
