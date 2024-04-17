import { getRating } from "./getRating";

export function getStats(grade: number) {
  const frequencies = Math.floor(grade / 10);
  const mij1 = Math.floor(grade / 2);
  const mij2 = Math.ceil(grade / 2);
  const fin = grade - frequencies;
  const { rating, MOG } = getRating(grade);
  return {frequencies, mij1, mij2, fin, rating, MOG};
}
