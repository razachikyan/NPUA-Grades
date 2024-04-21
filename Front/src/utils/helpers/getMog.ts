export const getMog = (rating: number): number => {
  if (rating >= 95) return 4;
  if (rating >= 87) return 4;
  if (rating >= 81) return 3.7;
  if (rating >= 75) return 3.3;
  if (rating >= 71) return 3;
  if (rating >= 67) return 3;
  if (rating >= 61) return 2.7;
  if (rating >= 58) return 2.3;
  if (rating >= 55) return 2.3;
  if (rating >= 51) return 2;
  if (rating >= 46) return 2.3;
  if (rating >= 43) return 1.7;
  if (rating >= 40) return 1.7;
  if (rating < 40) return 1;
  return 0;
};
