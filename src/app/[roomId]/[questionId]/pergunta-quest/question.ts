export type Game = {
  gameStatus: string;
  idPlayerOne: number | null;
  idPlayerTwo: number;
  pointPlayerOne: number | null;
  pointPlayerTwo: number | null;
  questions: Question[];
  idFormat: string;
}

export type Question = {
  id: number;
  text: string;
  catText: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}