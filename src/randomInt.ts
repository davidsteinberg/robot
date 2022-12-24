// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const randomInt = (inclusiveMin: number, exclusiveMax: number) => {
  const min = Math.ceil(inclusiveMin);
  const max = Math.floor(exclusiveMax);
  return Math.floor(Math.random() * (max - min) + min);
};

type RandomInt = typeof randomInt;

export type { RandomInt };
export default randomInt;
