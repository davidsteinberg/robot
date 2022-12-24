const constants = {
  head: {
    width: 2,
    height: 3,
    rotation: { min: -25, max: 25 },
  },
  torso: {
    width: 4,
    height: 9,
    rotation: { min: -10, max: 10 },
  },
  arm: {
    width: 1,
    height: 4,
    rotation: {
      top: {
        left: { min: -90, max: 15 },
        right: { min: -15, max: 90 },
      },
      bottom: {
        left: { min: -70, max: 70 },
        right: { min: -70, max: 70 },
      },
    },
  },
  leg: {
    width: 1,
    height: 6,
    rotation: {
      top: { min: -20, max: 20 },
      bottom: { min: -20, max: 20 },
    },
  },
};

export default constants;
