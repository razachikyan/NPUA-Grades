import { IGradeInfo } from "@/types/grades";

export function getRating(grade: number): {
  rating: string;
  score: number;
  description: string;
  MOG: number;
} {
  const gradingScale: { [key: string]: IGradeInfo } = {
    "A+": { lower: 95, upper: 100, score: 4.0, description: "Excellent" },
    A: { lower: 87, upper: 94, score: 4.0, description: "Excellent" },
    "A-": { lower: 81, upper: 86, score: 3.7, description: "Excellent" },
    "B+": { lower: 75, upper: 80, score: 3.3, description: "Good" },
    B: { lower: 71, upper: 74, score: 3.0, description: "Good" },
    "B-": { lower: 67, upper: 70, score: 3.0, description: "Good" },
    "C+": { lower: 58, upper: 60, score: 2.3, description: "Satisfactory" },
    C: { lower: 55, upper: 57, score: 2.3, description: "Satisfactory" },
    "C-": { lower: 51, upper: 54, score: 2.0, description: "Satisfactory" },
    D: { lower: 40, upper: 50, score: 1.0, description: "Poor" },
    F: { lower: 0, upper: 39, score: 0, description: "Fail" },
  };

  for (const rating in gradingScale) {
    const { lower, upper, score, description } = gradingScale[rating];
    if (grade >= lower && grade <= upper) {
      const MOG = score;
      return {
        rating: rating,
        score: score,
        description: description,
        MOG: MOG,
      };
    }
  }
  return {
    rating: "Unknown",
    score: -1,
    description: "Unknown",
    MOG: -1,
  };
}