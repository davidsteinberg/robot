type Point = { x: number; y: number };

const getMidPoint = (point1: Point, point2: Point) => {
  return {
    x: (point1.x + point2.x) / 2,
    y: (point1.y + point2.y) / 2,
  };
};

export type { Point };
export default getMidPoint;
