import getMidPoint from "./getMidPoint";

test("getMidPoint not rotated", () => {
  const point1 = { x: 0, y: 10 };
  const point2 = { x: 0, y: -10 };
  const midPoint = getMidPoint(point1, point2);

  expect(midPoint).toEqual({ x: 0, y: 0 });
});

test("getMidPoint rotated", () => {
  const point1 = { x: 4, y: 7 };
  const point2 = { x: 10, y: 13 };
  const midPoint = getMidPoint(point1, point2);

  expect(midPoint).toEqual({ x: 7, y: 10 });
});
