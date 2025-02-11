export interface IQuestion {
  id: number;
  authorId: number;
  authorName?: string;
  title: string;
  description: string;
  date: Date;
  tags: string;
  answers: IAnswer[];
}

export interface IQuestionPost {
  id?: number;
  title: string;
  description: string;
  tags: string;
}

export interface IAnswer {
  text: string;
  authorId: number;
  authorName?: string;
  date: Date;
}

export interface IAnswerPost {
  id?: number;
  text: string;
  questionId: number;
}
