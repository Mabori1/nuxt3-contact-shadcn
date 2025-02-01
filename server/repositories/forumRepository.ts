import prisma from "~/lib/prisma";
import { IAnswerPost, IQuestion, IQuestionPost } from "~/types/IQuestion";

export async function createQuestion(data: IQuestionPost, authorId: number) {
  return await prisma.question.create({
    data: {
      authorId: authorId,
      title: data.title,
      description: data.description,
    },
  });
}

export async function findQuestion(id: number): Promise<IQuestion> {
  const question = await prisma.question.findUnique({
    where: {
      id: id,
    },
    include: {
      answers: true,
    },
  });

  if (!question) {
    throw new Error("Question not found");
  }
  return question;
}

export async function createAnswer(data: IAnswerPost, authorId: number) {
  return await prisma.answer.create({
    data: {
      authorId: authorId,
      questionId: data.questionId,
      text: data.text,
    },
  });
}

export async function searchQuestions(query: string): Promise<IQuestion[]> {
  const result = await prisma.$queryRawUnsafe(
    `SELECT * FROM Question where title like $1 or description like $1`,
    `%${query}%`,
  );

  return result as IQuestion[];
}

export async function editQuestion(question: IQuestionPost) {
  return await prisma.question.update({
    where: {
      id: question.id,
    },
    data: {
      title: question.title,
      description: question.description,
    },
  });
}

export async function deleteQuestion(questionId: number) {
  return await prisma.question.delete({
    where: {
      id: questionId,
    },
  });
}
