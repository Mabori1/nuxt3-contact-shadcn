export interface IQuestion {
  id: number;
  authorId: number;
  authName?: string;
  title: string;
  description: string;
  date?: Date;
  read: boolean;
  labels: ILabel[];
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
  date?: Date;
}

export interface IAnswerPost {
  text: string;
  questionId: number;
}

export interface ILabel {
  id?: number;
  label: string;
}
