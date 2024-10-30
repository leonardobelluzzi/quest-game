export type Game = {
  gameStatus: string;
  idPlayerOne: number | null;
  idPlayerTwo: number;
  pointPlayerOne: number | null;
  pointPlayerTwo: number | null;
  playerOneFinishTime: number;
  playerTwoFinishTime: number;
  questions: Question[];
  idFormat: string;
  userWinner: number | null;
}

export type Question = {
  id: number;
  text: string;
  catText: string;
  answers: Answer[];
}

export type Answer ={
  id: number;
  text: string;
  correct: boolean;
}