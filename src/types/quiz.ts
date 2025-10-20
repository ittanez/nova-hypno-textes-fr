export interface Option {
  id: number;
  text: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  dimension: string;
}

export interface Answer {
  questionId: number;
  optionId: number;
  selectedOption?: Option;
  score: number;
  dimension: string;
}

export interface DimensionResult {
  dimension: string;
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  recommendation: string;
}

export interface QuizResult {
  totalScore: number;
  score: number;
  totalQuestions: number;
  answers: Record<string, number>;
  dimensionScores: DimensionResult[];
  conclusion: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}
