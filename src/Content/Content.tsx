import "./Content.css";
import Burst from "../Burst/Burst";
import Metronome from "../Metronome/Metronome";
import Prompt from "../Prompt/Prompt";
import Robot from "../Robot/Robot";
import generateColors from "./generateColors";
import randomInt from "../randomInt";
import { useEffect, useState } from "react";

// Taps
const maxTapCount = 4;
const timeoutMilliseconds = 2000;

// Bursts
const maxBurstCount = 2;
const maxBurstProbability = 0.35;
let nextBurstID = 0;
let burstProbability = maxBurstProbability;

// Colors
const minColorBeat = 4;
const colorChangeProbability = 0.2;
const colorConstants = {
  attempts: 1000,
  delta: { amount: 80, count: 3 },
  rgb: { min: 80, max: 255 },
};

const generateNewColors = () => {
  return generateColors({ ...colorConstants, randomInt });
};

const Content = (p: { hidden: boolean }) => {
  const { hidden } = p;
  // Prompt
  const [showPrompt, setShowPrompt] = useState(true);
  // Taps
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [tapTimeout, setTapTimeout] = useState<NodeJS.Timeout | null>(null);
  const [transitionDuration, setTransitionDuration] = useState("0s");
  // Ticks
  const [ticking, setTicking] = useState(false);
  const [tick, setTick] = useState(0);
  // Colors
  const [colorBeat, setColorBeat] = useState(0);
  const [colors, setColors] = useState(generateNewColors());
  // Bursts
  const [bursts, setBursts] = useState<number[]>([]);

  // On screen tap
  const onPointerDown = () => {
    // Ignore taps after the max
    const tapCount = tapTimes.length + 1;
    if (tapCount > maxTapCount) {
      return;
    }

    // Stop outstanding tap-clearing timeouts
    if (tapTimeout !== null) {
      clearTimeout(tapTimeout);
    }

    const now = Date.now();

    // If this is the final tap
    if (tapCount === maxTapCount) {
      // Build up deltas between each tap time, starting with now
      const lastTapIndex = maxTapCount - 2;
      const deltas = [now - tapTimes[lastTapIndex]];
      for (let i = 1; i <= lastTapIndex; i++) {
        deltas.push(tapTimes[i] - tapTimes[i - 1]);
      }

      // Set transition duration based on delta average
      // and start the metronome moving
      const average = deltas.reduce((a, b) => a + b, 0) / deltas.length;
      const newTransitionDuration = `${average / 1000}s`;

      setTick((previous) => previous + 1);
      setTicking(true);
      setShowPrompt(false);
      setTransitionDuration(newTransitionDuration);
    } else {
      // Schedule cleanup if no taps within time limit
      const cleanup = () => setTapTimes([]);
      const newTapTimeout = setTimeout(cleanup, timeoutMilliseconds);
      setTapTimeout(newTapTimeout);
    }

    // If this is the first tap, stop the metronome
    if (tapCount === 1) {
      setTicking(false);
    }

    // Add this tap's time
    setTapTimes((previous) => [...previous, now]);
  };

  // On metronome tick
  const onTick = () => {
    const tapCount = tapTimes.length;

    // Remove taps when the max is reached
    if (tapCount === maxTapCount) {
      setTapTimes([]);
    } else if (hidden || tapCount > 0) {
      // Don't move when content is hidden or a new tempo is being tapped
      return;
    }

    // Update tick to cause a new pose
    setTick((previous) => previous + 1);

    // Pick new colors sometimes
    if (colorBeat > minColorBeat && Math.random() < colorChangeProbability) {
      setColors(generateNewColors());
      setColorBeat(0);
    } else {
      setColorBeat((previous) => previous + 1);
    }
  };

  // Add background visuals sometimes
  useEffect(() => {
    // Wait until after the robot is fully on screen
    if (tick > 1 && Math.random() < burstProbability) {
      setBursts((previous) => [...previous, nextBurstID]);
      nextBurstID += 1;
    }
  }, [tick]);

  // Don't allow more bursts when max is reached
  useEffect(() => {
    if (bursts.length < maxBurstCount) {
      burstProbability = maxBurstProbability;
    } else {
      burstProbability = 0;
    }
  }, [bursts.length]);

  useEffect(() => {
    // Stop the metronome when changing to show about
    if (hidden) {
      setTicking(false);
    }
  }, [hidden]);

  // Apply colors
  useEffect(() => {
    const colorFrom = (rgb: { r: number; g: number; b: number }) => {
      const { r, g, b } = rgb;
      return `rgb(${r},${g},${b})`;
    };

    const foregroundColor = colorFrom(colors.foreground);
    const backgroundColor = colorFrom(colors.background);

    // Apply page colors
    const root = document.querySelector(":root") as HTMLElement;
    root.style.setProperty("--color-foreground", foregroundColor);
    root.style.setProperty("--color-background", backgroundColor);

    // Apply theme color
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", backgroundColor);
  }, [colors]);

  // Only show pips as taps are happening
  const tapCount = tapTimes.length;

  return (
    <div className={`Content ${hidden ? "hidden" : ""}`} {...{ onPointerDown }}>
      <div className="container">
        <Metronome {...{ ticking, transitionDuration, onTick }}></Metronome>
        {bursts.map((key) => {
          // Remove bursts when they fade out
          const onTransitionEnd = () => {
            setBursts((previous) => previous.filter((n) => n !== key));
          };

          return <Burst {...{ key, onTransitionEnd }}></Burst>;
        })}
        <Prompt {...{ hidden: !showPrompt, tapCount, transitionDuration }} />
        <Robot {...{ hidden: showPrompt, tick, transitionDuration }} />
      </div>
    </div>
  );
};

export default Content;
