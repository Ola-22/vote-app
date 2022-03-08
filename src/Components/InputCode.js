import { useContext } from "react";
import { DataContext } from "./ContextHooks/DataProvider";

export default function InputCode() {
  const value = useContext(DataContext);
  const [code] = value.code;
  const inputs = value.inputs;
  const processInput = value.processInput;
  const onKeyUp = value.onKeyUp;

  return (
    <div>
      {code?.map((num, idx) => {
        return (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={num}
            autoFocus={!code[0].length && idx === 0}
            onChange={(e) => processInput(e, idx)}
            onKeyUp={(e) => onKeyUp(e, idx)}
            ref={(ref) => inputs.current.push(ref)}
          />
        );
      })}
    </div>
  );
}
