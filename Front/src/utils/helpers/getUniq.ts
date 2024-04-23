export const getUniq = <T>(array: T[]) => {
  const uniq: T[] = [];
  array.forEach((item) => {
    if (!uniq.includes(item)) uniq.push(item);
  });
  return uniq;
};
