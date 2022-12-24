import "./Robot.css";
import constants from "./constants";
import generatePose, { Position } from "./generatePose";
import { useEffect, useRef } from "react";

type Size = { width: number; height: number };

const Robot = (p: {
  hidden: boolean;
  tick: number;
  transitionDuration: string;
}) => {
  const { hidden, tick, transitionDuration } = p;
  const ref = {
    robot: useRef<HTMLDivElement>(null),
    head: useRef<HTMLDivElement>(null),
    torso: useRef<HTMLDivElement>(null),
    arm: {
      left: {
        top: useRef<HTMLDivElement>(null),
        bottom: useRef<HTMLDivElement>(null),
      },
      right: {
        top: useRef<HTMLDivElement>(null),
        bottom: useRef<HTMLDivElement>(null),
      },
    },
    leg: {
      left: {
        top: useRef<HTMLDivElement>(null),
        bottom: useRef<HTMLDivElement>(null),
      },
      right: {
        top: useRef<HTMLDivElement>(null),
        bottom: useRef<HTMLDivElement>(null),
      },
    },
    shadow: {
      head: useRef<HTMLDivElement>(null),
      torso: useRef<HTMLDivElement>(null),
      arm: {
        left: {
          top: useRef<HTMLDivElement>(null),
          bottom: useRef<HTMLDivElement>(null),
        },
        right: {
          top: useRef<HTMLDivElement>(null),
          bottom: useRef<HTMLDivElement>(null),
        },
      },
      leg: {
        left: {
          top: useRef<HTMLDivElement>(null),
          bottom: useRef<HTMLDivElement>(null),
        },
        right: {
          top: useRef<HTMLDivElement>(null),
          bottom: useRef<HTMLDivElement>(null),
        },
      },
    },
  };

  // Apply transition duration whenever it changes
  useEffect(() => {
    ref.robot.current?.style.setProperty(
      "--transition-duration",
      transitionDuration
    );
  }, [ref.robot, transitionDuration]);

  // Apply sizes to parts on initial ref creation
  useEffect(() => {
    const refsAndSizes: [React.RefObject<HTMLDivElement>[], Size][] = [
      [[ref.head, ref.shadow.head], constants.head],
      [[ref.torso, ref.shadow.torso], constants.torso],
      [[ref.arm.left.top, ref.shadow.arm.left.top], constants.arm],
      [[ref.arm.left.bottom, ref.shadow.arm.left.bottom], constants.arm],
      [[ref.arm.right.top, ref.shadow.arm.right.top], constants.arm],
      [[ref.arm.right.bottom, ref.shadow.arm.right.bottom], constants.arm],
      [[ref.leg.left.top, ref.shadow.leg.left.top], constants.leg],
      [[ref.leg.left.bottom, ref.shadow.leg.left.bottom], constants.leg],
      [[ref.leg.right.top, ref.shadow.leg.right.top], constants.leg],
      [[ref.leg.right.bottom, ref.shadow.leg.right.bottom], constants.leg],
    ];

    for (const [refs, size] of refsAndSizes) {
      for (const ref of refs) {
        const element = ref.current;
        if (element === null) {
          continue;
        }

        element.style.setProperty("--width", size.width.toString());
        element.style.setProperty("--height", size.height.toString());
      }
    }
  }, [
    ref.head,
    ref.torso,
    ref.arm.left.top,
    ref.arm.left.bottom,
    ref.arm.right.top,
    ref.arm.right.bottom,
    ref.leg.left.top,
    ref.leg.left.bottom,
    ref.leg.right.top,
    ref.leg.right.bottom,

    ref.shadow.head,
    ref.shadow.torso,
    ref.shadow.arm.left.top,
    ref.shadow.arm.left.bottom,
    ref.shadow.arm.right.top,
    ref.shadow.arm.right.bottom,
    ref.shadow.leg.left.top,
    ref.shadow.leg.left.bottom,
    ref.shadow.leg.right.top,
    ref.shadow.leg.right.bottom,
  ]);

  // Apply a new pose on every tick
  useEffect(() => {
    const { clientWidth: width, clientHeight: height } = document.body;
    const scaleFactor = height / 30;
    const pose = generatePose({ width, height, scaleFactor });

    ref.robot.current?.style.setProperty("--scale-factor", `${scaleFactor}px`);

    const refsAndPositions: [React.RefObject<HTMLDivElement>[], Position][] = [
      [[ref.head, ref.shadow.head], pose.head],
      [[ref.torso, ref.shadow.torso], pose.torso],
      [[ref.arm.left.top, ref.shadow.arm.left.top], pose.arm.left.top],
      [[ref.arm.left.bottom, ref.shadow.arm.left.bottom], pose.arm.left.bottom],
      [[ref.arm.right.top, ref.shadow.arm.right.top], pose.arm.right.top],
      [
        [ref.arm.right.bottom, ref.shadow.arm.right.bottom],
        pose.arm.right.bottom,
      ],
      [[ref.leg.left.top, ref.shadow.leg.left.top], pose.leg.left.top],
      [[ref.leg.left.bottom, ref.shadow.leg.left.bottom], pose.leg.left.bottom],
      [[ref.leg.right.top, ref.shadow.leg.right.top], pose.leg.right.top],
      [
        [ref.leg.right.bottom, ref.shadow.leg.right.bottom],
        pose.leg.right.bottom,
      ],
    ];

    for (const [refs, position] of refsAndPositions) {
      for (const ref of refs) {
        const element = ref.current;
        if (element === null) {
          continue;
        }

        const left = position.x - element.clientWidth / 2;
        const top = position.y - element.clientHeight / 2;
        const { rotation } = position;

        element.style.transform = `translate(${left}px,${top}px) rotate(${rotation}deg)`;
      }
    }
  }, [
    tick, // Include this to force call on each tick

    ref.robot,
    ref.head,
    ref.torso,
    ref.arm.left.top,
    ref.arm.left.bottom,
    ref.arm.right.top,
    ref.arm.right.bottom,
    ref.leg.left.top,
    ref.leg.left.bottom,
    ref.leg.right.top,
    ref.leg.right.bottom,

    ref.shadow.head,
    ref.shadow.torso,
    ref.shadow.arm.left.top,
    ref.shadow.arm.left.bottom,
    ref.shadow.arm.right.top,
    ref.shadow.arm.right.bottom,
    ref.shadow.leg.left.top,
    ref.shadow.leg.left.bottom,
    ref.shadow.leg.right.top,
    ref.shadow.leg.right.bottom,
  ]);

  return (
    <div ref={ref.robot} className={`Robot ${hidden ? "hidden" : ""}`}>
      <div className="shadow">
        <div ref={ref.shadow.head} className="part"></div>
        <div ref={ref.shadow.torso} className="part"></div>
        <div ref={ref.shadow.arm.left.top} className="part"></div>
        <div ref={ref.shadow.arm.left.bottom} className="part"></div>
        <div ref={ref.shadow.arm.right.top} className="part"></div>
        <div ref={ref.shadow.arm.right.bottom} className="part"></div>
        <div ref={ref.shadow.leg.left.top} className="part"></div>
        <div ref={ref.shadow.leg.left.bottom} className="part"></div>
        <div ref={ref.shadow.leg.right.top} className="part"></div>
        <div ref={ref.shadow.leg.right.bottom} className="part"></div>
      </div>
      <div className="body">
        <div ref={ref.head} className="part"></div>
        <div ref={ref.torso} className="part"></div>
        <div ref={ref.arm.left.top} className="part"></div>
        <div ref={ref.arm.left.bottom} className="part"></div>
        <div ref={ref.arm.right.top} className="part"></div>
        <div ref={ref.arm.right.bottom} className="part"></div>
        <div ref={ref.leg.left.top} className="part"></div>
        <div ref={ref.leg.left.bottom} className="part"></div>
        <div ref={ref.leg.right.top} className="part"></div>
        <div ref={ref.leg.right.bottom} className="part"></div>
      </div>
    </div>
  );
};

export default Robot;
