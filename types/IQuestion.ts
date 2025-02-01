export interface IQuestion {
  id: number;
  authorId: number;
  authName?: string;
  title: string;
  description: string;
  answers: IAnswer[];
}

export interface IQuestionPost {
  id?: number;
  title: string;
  description: string;
}

export interface IAnswer {
  text: string;
  authorId: number;
  authorName?: string;
}

export interface IAnswerPost {
  text: string;
  questionId: number;
}
