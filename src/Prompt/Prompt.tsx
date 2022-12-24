import "./Prompt.css";
import Pips from "../Pips/Pips";
import { useEffect, useRef } from "react";

const Prompt = (p: {
  hidden: boolean;
  tapCount: number;
  transitionDuration: string;
}) => {
  const { hidden, tapCount, transitionDuration } = p;
  const showPips = !hidden || tapCount > 0;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.style.setProperty("transition-duration", transitionDuration);
  }, [transitionDuration]);

  return (
    <div className={`Prompt ${hidden ? "hidden" : ""}`} {...{ ref }}>
      <div className="text">Tap along to a song 4 times</div>
      <div className="pips-container">
        <Pips {...{ ...p, hidden: !showPips }} />
      </div>
    </div>
  );
};

export default Prompt;
