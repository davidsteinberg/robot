import { RandomInt } from "../randomInt";

type Color = { r: number; g: number; b: number };
type ColorKey = keyof Color;

const generateColors = (p: {
  attempts: number;
  delta: { amount: number; count: number };
  rgb: { min: number; max: number };
  randomInt: RandomInt;
}): { foreground: Color; background: Color } => {
  const { randomInt, attempts, delta, rgb } = p;
  const randomRGB = (low: number, high: number): Color => {
    return {
      r: randomInt(low, high),
      g: randomInt(low, high),
      b: randomInt(low, high),
    };
  };

  let attempt = 0;

  outer: do {
    // Randomly choose two colors
    const foreground = randomRGB(rgb.min, rgb.max);
    const background = randomRGB(rgb.min, rgb.max);
    const keys: ColorKey[] = ["r", "g", "b"];

    let deltaCount = 0;
    let lastKeyDelta = 0;

    // See if the two colors are distinct enough
    for (const key of keys) {
      const keyDelta = foreground[key] - background[key];
      // Make sure the deltas are in the same direction
      if (
        (lastKeyDelta > 0 && keyDelta <= 0) ||
        (lastKeyDelta < 0 && keyDelta >= 0)
      ) {
        continue outer;
      }

      // If the key is distinct enough, increment delta count
      // and store this delta for future checks
      if (Math.abs(keyDelta) >= delta.amount) {
        deltaCount += 1;
        lastKeyDelta = keyDelta;
      }
    }

    // If the colors are distinct enough or we've tried too many times,
    // return the latest generated colors
    if (deltaCount >= delta.count || attempt >= attempts) {
      return { foreground, background };
    }

    attempt += 1;
  } while (true);
};

export default generateColors;
