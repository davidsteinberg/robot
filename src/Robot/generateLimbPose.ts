import getPoints from "./getPoints";
import { RandomInt } from "../randomInt";

const generateLimbPose = (p: {
  anchor: { x: number; y: number; rotation: number };
  height: number;
  width: number;
  rotation: {
    top: { min: number; max: number };
    bottom: { min: number; max: number };
    additive: boolean;
  };
  randomInt: RandomInt;
}) => {
  const { anchor, height, width, rotation, randomInt } = p;
  const topRotation =
    randomInt(rotation.top.min, rotation.top.max) + anchor.rotation;
  const [topOrigin] = getPoints({
    ...p,
    origin: anchor,
    rotation: topRotation,
    types: ["bottom middle"],
  });

  const top = {
    ...topOrigin,
    rotation: topRotation,
  };

  const [topBottomMiddle] = getPoints({
    origin: topOrigin,
    width: width,
    height: height - 1,
    rotation: topRotation,
    types: ["bottom middle"],
  });

  const bottomRotation =
    randomInt(rotation.bottom.min, rotation.bottom.max) +
    (rotation.additive ? topRotation : 0);
  const [bottomOrigin] = getPoints({
    ...p,
    origin: topBottomMiddle,
    rotation: bottomRotation,
    types: ["bottom middle"],
  });

  const bottom = {
    ...bottomOrigin,
    rotation: bottomRotation,
  };

  return { top, bottom };
};

export default generateLimbPose;
