import "./Metronome.css";
import { useEffect, useRef } from "react";

const Metronome = (p: {
  ticking: boolean;
  transitionDuration: string;
  onTick: VoidFunction;
}) => {
  const { ticking, transitionDuration, onTick } = p;
  const ref = useRef<HTMLDivElement>(null);

  // Tick to the other side
  const onTransitionEnd = () => {
    // Don't do anything if we paused in the middle of the transition
    if (!ticking) {
      return;
    }

    ref.current?.classList.toggle("tick");
    onTick();
  };

  // Apply transition duration
  useEffect(() => {
    ref.current?.style.setProperty("transition-duration", transitionDuration);
  }, [transitionDuration]);

  // Apply ticking
  useEffect(() => {
    if (ticking) {
      ref.current?.classList.add("tick");
    } else {
      ref.current?.classList.remove("tick");
    }
  }, [ticking]);

  return <div className="Metronome" {...{ ref, onTransitionEnd }}></div>;
};

export default Metronome;
