import React, { useState, useRef, createContext } from "react";

export const DataContext = createContext();

const DataProvider = (props) => {
  const [code, setCode] = useState([...Array(4)].map(() => ""));
  const inputs = useRef([]);

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== 4 - 1) {
      inputs.current[slot + 1].focus();
    }
  };

  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  const value = {
    code: [code, setCode],
    processInput,
    onKeyUp,
    inputs,
  };
  return (
    <DataContext.Provider value={value}>
      <div className="code-input">
        <div className="code-inputs">{props.children}</div>
      </div>
    </DataContext.Provider>
  );
};

export default DataProvider;
