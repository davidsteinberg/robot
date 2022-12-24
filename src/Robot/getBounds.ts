import getPoints from "./getPoints";

type Rect = {
  x: number;
  y: number;
  height: number;
  width: number;
  rotation: number;
};

const getBounds = (rects: Rect[]) => {
  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;

  for (const rect of rects) {
    const corners = getPoints({
      origin: rect,
      ...rect,
      types: ["top left", "top right", "bottom left", "bottom right"],
    });

    for (const { x, y } of corners) {
      minX = Math.min(x, minX);
      maxX = Math.max(x, maxX);
      minY = Math.min(y, minY);
      maxY = Math.max(y, maxY);
    }
  }

  return {
    x: { min: minX, max: maxX },
    y: { min: minY, max: maxY },
  };
};

export default getBounds;
