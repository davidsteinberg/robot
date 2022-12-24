import generateLimbPose from "./generateLimbPose";

test("generateLimbPose returns top and bottom positions", () => {
  const anchor = { x: 0, y: 0, rotation: 0 };
  const height = 2;
  const width = 1;
  const rotation = {
    top: { min: 0, max: 0 },
    bottom: { min: 0, max: 0 },
    additive: false,
  };

  const randomInt = () => 0;
  const limb = generateLimbPose({
    anchor,
    height,
    width,
    rotation,
    randomInt,
  });

  expect(limb).toEqual({
    top: { x: 0, y: -1, rotation: 0 },
    bottom: { x: 0, y: -2.5, rotation: 0 },
  });
});

test("generateLimbPose adds rotation when additive", () => {
  const anchor = { x: 0, y: 0, rotation: 0 };
  const height = 2;
  const width = 1;
  const rotation = {
    top: { min: 0, max: 0 },
    bottom: { min: 0, max: 0 },
    additive: true,
  };

  const randomInt = () => 90;
  const limb = generateLimbPose({
    anchor,
    height,
    width,
    rotation,
    randomInt,
  });

  const { top, bottom } = limb;

  expect(top.x).toBeCloseTo(1);
  expect(top.y).toBeCloseTo(0);
  expect(top.rotation).toBe(90);

  expect(bottom.x).toBeCloseTo(1.5);
  expect(bottom.y).toBeCloseTo(1);
  expect(bottom.rotation).toBe(180);
});

test("generateLimbPose does not add rotation when not additive", () => {
  const anchor = { x: 0, y: 0, rotation: 0 };
  const height = 2;
  const width = 1;
  const rotation = {
    top: { min: 0, max: 0 },
    bottom: { min: 0, max: 0 },
    additive: false,
  };

  const randomInt = () => 90;
  const limb = generateLimbPose({
    anchor,
    height,
    width,
    rotation,
    randomInt,
  });

  const { top, bottom } = limb;

  expect(top.x).toBeCloseTo(1);
  expect(top.y).toBeCloseTo(0);
  expect(top.rotation).toBe(90);

  expect(bottom.x).toBeCloseTo(2.5);
  expect(bottom.y).toBeCloseTo(0);
  expect(bottom.rotation).toBe(90);
});
