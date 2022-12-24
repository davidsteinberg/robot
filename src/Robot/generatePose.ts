import constants from "./constants";
import generateLimbPose from "./generateLimbPose";
import getBounds from "./getBounds";
import getPoints from "./getPoints";
import randomInt from "../randomInt";

type Position = {
  x: number;
  y: number;
  rotation: number;
};

let lastXOffset = 0;

const randomRotation = (p: { min: number; max: number }) => {
  return randomInt(p.min, p.max);
};

const generatePose = (p: {
  width: number;
  height: number;
  scaleFactor: number;
}) => {
  // Torso
  const torsoRotation = randomRotation(constants.torso.rotation);
  const torso = {
    x: 0,
    y: 0,
    rotation: torsoRotation,
  };

  const [
    torsoTopLeft,
    torsoTopMiddle,
    torsoTopRight,
    torsoBottomLeft,
    torsoBottomRight,
  ] = getPoints({
    origin: { x: 0, y: 0 },
    // Add padding, so limbs overlap
    width: constants.torso.width - 1,
    height: constants.torso.height - 0.75,
    rotation: torsoRotation,
    types: [
      "top left",
      "top middle",
      "top right",
      "bottom left",
      "bottom right",
    ],
  });

  // Head
  const headRotation = randomRotation(constants.head.rotation) + torsoRotation;
  const [headOrigin] = getPoints({
    origin: torsoTopMiddle,
    width: constants.head.width,
    // Pass double height, so head will be detached from torso
    height: constants.head.height * 2,
    rotation: headRotation,
    types: ["top middle"],
  });

  const head = {
    ...headOrigin,
    rotation: headRotation,
  };

  // Arms
  const armLeft = generateLimbPose({
    ...constants.arm,
    anchor: {
      ...torsoTopLeft,
      rotation: torsoRotation,
    },
    rotation: {
      top: constants.arm.rotation.top.left,
      bottom: constants.arm.rotation.bottom.left,
      additive: true,
    },
    randomInt,
  });

  const armRight = generateLimbPose({
    ...constants.arm,
    anchor: {
      ...torsoTopRight,
      rotation: torsoRotation,
    },
    rotation: {
      top: constants.arm.rotation.top.right,
      bottom: constants.arm.rotation.bottom.right,
      additive: true,
    },
    randomInt,
  });

  // Legs
  const legLeft = generateLimbPose({
    ...constants.leg,
    anchor: {
      ...torsoBottomLeft,
      rotation: 0, // Don't include torso rotation
    },
    rotation: {
      top: constants.leg.rotation.top,
      bottom: constants.leg.rotation.bottom,
      additive: false, // Don't add top rotation to bottom
    },
    randomInt,
  });

  const legRight = generateLimbPose({
    ...constants.leg,
    anchor: {
      ...torsoBottomRight,
      rotation: 0, // Don't include torso rotation
    },
    rotation: {
      top: constants.leg.rotation.top,
      bottom: constants.leg.rotation.bottom,
      additive: false, // Don't add top rotation to bottom
    },
    randomInt,
  });

  // Find body bounds
  const bounds = getBounds([
    { ...constants.head, ...head },
    { ...constants.torso, ...torso },
    { ...constants.arm, ...armLeft.top },
    { ...constants.arm, ...armLeft.bottom },
    { ...constants.arm, ...armRight.top },
    { ...constants.arm, ...armRight.bottom },
    { ...constants.leg, ...legLeft.top },
    { ...constants.leg, ...legLeft.bottom },
    { ...constants.leg, ...legRight.top },
    { ...constants.leg, ...legRight.bottom },
  ]);

  // Scale everything
  const { width, height, scaleFactor } = p;
  const scale = (number: number) => {
    return number * scaleFactor;
  };

  const centerX = width / 2;

  // Move toward center when reaching the sides
  let xOffset = lastXOffset + randomInt(-scaleFactor, scaleFactor);
  if (centerX + scale(bounds.x.max) + xOffset > width) {
    xOffset = lastXOffset - scaleFactor;
  } else if (centerX + scale(bounds.x.min) + xOffset < 0) {
    xOffset = lastXOffset + scaleFactor;
  }
  lastXOffset = xOffset;

  // Move slightly lower than the bottom
  // so that both legs won't have space below them
  const yOffset = height + scale(bounds.y.min + 0.5);
  const scaled = (position: Position) => {
    const x = centerX + scale(position.x) + xOffset;
    const y = scale(-position.y) + yOffset;
    return { x, y, rotation: -position.rotation };
  };

  const pose = {
    head: scaled(head),
    torso: scaled(torso),
    arm: {
      left: {
        top: scaled(armLeft.top),
        bottom: scaled(armLeft.bottom),
      },
      right: {
        top: scaled(armRight.top),
        bottom: scaled(armRight.bottom),
      },
    },
    leg: {
      left: {
        top: scaled(legLeft.top),
        bottom: scaled(legLeft.bottom),
      },
      right: {
        top: scaled(legRight.top),
        bottom: scaled(legRight.bottom),
      },
    },
  };

  return pose;
};

export type { Position };
export default generatePose;
