export const percentChange = (a: number, b: number): number => {
  let delta;
  if (b !== 0) {
    if (a !== 0) {
      delta = ((b - a) / a) * 100;
    } else {
      delta = b * 100;
    }
  } else {
    delta = 100;
  }
  return Math.round(delta * 100) / 100;
};
