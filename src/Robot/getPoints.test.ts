import getPoints, { PointType } from "./getPoints";

// Not rotated
test("getPoints top left not rotated", () => {
  const origin = { x: 0, y: 0 };
  const width = 10;
  const height = 8;
  const rotation = 0;
  const types: PointType[] = ["top left"];
  const [point] = getPoints({ origin, width, height, rotation, types });

  expect(point).toEqual({ x: -5, y: 4 });
});

test("getPoints top right not rotated", () => {
  const origin = { x: 0, y: 0 };
  const width = 10;
  const height = 8;
  const rotation = 0;
  const types: PointType[] = ["top right"];
  const [point] = getPoints({ origin, width, height, rotation, types });

  expect(point).toEqual({ x: 5, y: 4 });
});

test("getPoints bottom left not rotated", () => {
  const origin = { x: 0, y: 0 };
  const width = 10;
  const height = 8;
  const rotation = 0;
  const types: PointType[] = ["bottom left"];
  const [point] = getPoints({ origin, width, height, rotation, types });

  expect(point).toEqual({ x: -5, y: -4 });
});

test("getPoints bottom right not rotated", () => {
  const origin = { x: 0, y: 0 };
  const width = 10;
  const height = 8;
  const rotation = 0;
  const types: PointType[] = ["bottom right"];
  const [point] = getPoints({ origin, width, height, rotation, types });

  expect(point).toEqual({ x: 5, y: -4 });
});

// Rotated
test("getPoints top left rotated", () => {
  const origin = { x: 0, y: 0 };
  const width = 10;
  const height = 8;
  const rotation = 45;
  const types: PointType[] = ["top left"];
  const [point] = getPoints({ origin, width, height, rotation, types });

  expect(point.x).toBeCloseTo(-6.36);
  expect(point.y).toBeCloseTo(-0.71);
});

test("getPoints top right rotated", () => {
  const origin = { x: 0, y: 0 };
  const width = 10;
  const height = 8;
  const rotation = 45;
  const types: PointType[] = ["top right"];
  const [point] = getPoints({ origin, width, height, rotation, types });

  expect(point.x).toBeCloseTo(0.71);
  expect(point.y).toBeCloseTo(6.36);
});

test("getPoints bottom left rotated", () => {
  const origin = { x: 0, y: 0 };
  const width = 10;
  const height = 8;
  const rotation = 45;
  const types: PointType[] = ["bottom left"];
  const [point] = getPoints({ origin, width, height, rotation, types });

  expect(point.x).toBeCloseTo(-0.71);
  expect(point.y).toBeCloseTo(-6.36);
});

test("getPoints bottom right rotated", () => {
  const origin = { x: 0, y: 0 };
  const width = 10;
  const height = 8;
  const rotation = 45;
  const types: PointType[] = ["bottom right"];
  const [point] = getPoints({ origin, width, height, rotation, types });

  expect(point.x).toBeCloseTo(6.36);
  expect(point.y).toBeCloseTo(0.71);
});
