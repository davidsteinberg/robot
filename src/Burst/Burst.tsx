import "./Burst.css";
import randomInt from "../randomInt";
import { TransitionEventHandler, useEffect, useRef } from "react";

const transitionDuration = "5s";
const coin = () => Math.random() < 0.5;

const Burst = (p: { onTransitionEnd: VoidFunction }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Tell parent when faded out
  const onTransitionEnd: TransitionEventHandler = (event) => {
    if (event.propertyName === "transform") {
      p.onTransitionEnd();
    }
  };

  // Apply size and rotation on initial ref creation
  useEffect(() => {
    const { current } = ref;
    if (current === null) {
      return;
    }

    const { style } = current;
    const { clientWidth, clientHeight } = document.body;
    const size = Math.min(clientHeight, clientWidth) / 4;
    const doubleSize = size * 2;
    const maxSize = Math.max(clientHeight, clientWidth) * 2;
    const scale = maxSize / size;

    // Either choose top or bottom or left or right
    // and then randomly place along the other axis
    let left = 0;
    let top = 0;

    if (coin()) {
      if (coin()) {
        // Pin to top
        top = -doubleSize;
      } else {
        // Pin to bottom
        top = clientHeight + size;
      }

      // Randomize left
      left = randomInt(-doubleSize, clientWidth + size);
    } else {
      if (coin()) {
        // Pin to left
        left = -doubleSize;
      } else {
        // Pin to right
        left = clientWidth + size;
      }

      // Randomize top
      top = randomInt(-doubleSize, clientHeight + size);
    }

    Object.assign(style, {
      height: `${size}px`,
      width: `${size}px`,
      transform: `translate(${left}px,${top}px)`,
    });

    // Grow across the screen while fading out
    // Set transition duration here, so the original transform won't transition
    setTimeout(() => {
      Object.assign(style, {
        transform: `translate(0,0) scale(${scale})`,
        filter: "opacity(0)",
        transitionDuration,
      });
    }, 10);
  }, [ref]);

  return <div className="Burst" {...{ ref, onTransitionEnd }}></div>;
};

export default Burst;
