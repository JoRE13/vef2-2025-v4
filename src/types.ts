export type UiState = "initial" | "loading" | "error" | "data" | "empty";

export type Category = {
  id: string;
  title: string;
  slug: string;
};

export type Answer = {
  id: number;
  answer: string;
  correct: boolean;
  questionId: number;
};

export type Question = {
  id: number;
  question: string;
  categoryId: number;
  answers: Answer[];
};

export type PostQuestion = {
  question: string;
  category: string;
  answers: PostAnswer[];
};

export type PostAnswer = {
  answer: string;
  correct: boolean;
};

export type PostMessage = {
  error?: unknown;
  message?: string;
  errors?: string;
};

export type PostCategory = {
  title: string;
};
