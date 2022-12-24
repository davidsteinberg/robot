import getBounds from "./getBounds";

test("getBounds returns x and y min and max for empty rect", () => {
  const bounds = getBounds([{ x: 0, y: 0, height: 0, width: 0, rotation: 0 }]);

  expect(bounds).toEqual({
    x: { min: 0, max: 0 },
    y: { min: 0, max: 0 },
  });
});

test("getBounds returns x and y min and max for single rect", () => {
  const bounds = getBounds([{ x: 0, y: 0, height: 10, width: 8, rotation: 0 }]);

  expect(bounds).toEqual({
    x: { min: -4, max: 4 },
    y: { min: -5, max: 5 },
  });
});

test("getBounds returns x and y min and max for multiple rects", () => {
  const bounds = getBounds([
    { x: 0, y: 0, height: 10, width: 8, rotation: 0 },
    { x: -2, y: -4, height: 4, width: 2, rotation: 0 },
    { x: 4, y: -6, height: 2, width: 6, rotation: 0 },
  ]);

  expect(bounds).toEqual({
    x: { min: -4, max: 7 },
    y: { min: -7, max: 5 },
  });
});
