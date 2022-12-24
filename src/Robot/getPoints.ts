import getMidPoint, { Point } from "./getMidPoint";

type PointType =
  | "top left"
  | "top middle"
  | "top right"
  | "bottom left"
  | "bottom middle"
  | "bottom right"
  | "middle left"
  | "middle right";

const getPoints = (p: {
  origin: { x: number; y: number };
  width: number;
  height: number;
  rotation: number;
  types: PointType[];
}): Point[] => {
  const { origin, width, height, rotation, types } = p;
  const { x: originX, y: originY } = origin;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const radians = (rotation * Math.PI) / 180;
  const sinRotation = Math.sin(radians);
  const cosRotation = Math.cos(radians);
  const sinHalfHeight = halfHeight * sinRotation;
  const cosHalfHeight = halfHeight * cosRotation;
  const sinHalfWidth = halfWidth * sinRotation;
  const cosHalfWidth = halfWidth * cosRotation;

  const top = {
    left: {
      x: -cosHalfWidth - sinHalfHeight + originX,
      y: -sinHalfWidth + cosHalfHeight + originY,
    },
    right: {
      x: cosHalfWidth - sinHalfHeight + originX,
      y: sinHalfWidth + cosHalfHeight + originY,
    },
  };

  const bottom = {
    left: {
      x: -cosHalfWidth + sinHalfHeight + originX,
      y: -sinHalfWidth - cosHalfHeight + originY,
    },
    right: {
      x: cosHalfWidth + sinHalfHeight + originX,
      y: sinHalfWidth - cosHalfHeight + originY,
    },
  };

  const points = types.map((type) => {
    switch (type) {
      case "top left":
        return top.left;
      case "top right":
        return top.right;
      case "top middle":
        return getMidPoint(top.left, top.right);
      case "bottom left":
        return bottom.left;
      case "bottom right":
        return bottom.right;
      case "bottom middle":
        return getMidPoint(bottom.left, bottom.right);
      case "middle left":
        return getMidPoint(top.left, bottom.left);
      case "middle right":
        return getMidPoint(top.right, bottom.right);
      default:
        throw Error(`Unhandled type: ${type}`);
    }
  });

  return points;
};

export type { PointType };
export default getPoints;
