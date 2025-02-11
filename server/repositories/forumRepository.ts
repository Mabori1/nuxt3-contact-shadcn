import { IAnswerPost, IQuestion, IQuestionPost } from "~/types/IQuestion";
import prisma from "~/lib/prisma";

export async function createQuestion(data: IQuestionPost, authorId: number) {
  return await prisma.question.create({
    data: {
      authorId: authorId,
      title: data.title,
      description: data.description,
      tags: data.tags,
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

export async function toggleReadQuestion(userId: number, questionId: number) {
  // Запрашиваем список всех существующих вопросов и все вопросы, прочитанные пользователем
  const [questionIds, userAllReads] = await Promise.all([
    prisma.question.findMany({ select: { id: true } }),
    prisma.readedQuestion.findMany({
      where: { userId },
      select: { questionId: true },
    }),
  ]);

  // Создаем множества для быстрого поиска ID вопросов
  const validQuestionIds = new Set(questionIds.map((q) => q.id)); // Список существующих вопросов
  const userReadIds = new Set(userAllReads.map((r) => r.questionId)); // Список прочитанных пользователем

  // Определяем ID вопросов, которые есть у пользователя, но больше не существуют в базе
  const invalidIds = userAllReads
    .map((r) => r.questionId)
    .filter((id) => !validQuestionIds.has(id));

  // Удаляем записи о прочитанных вопросах, если эти вопросы больше не существуют
  if (invalidIds.length) {
    await prisma.readedQuestion.deleteMany({
      where: { userId, questionId: { in: invalidIds } },
    });
  }

  // Если вопрос уже был прочитан, удаляем его из списка прочитанных
  if (userReadIds.has(questionId)) {
    await prisma.readedQuestion.delete({ where: { userId, questionId } });
  } else {
    // В противном случае, помечаем вопрос как прочитанный
    await prisma.readedQuestion.create({ data: { userId, questionId } });
  }
}

export async function findAllQuestions(): Promise<IQuestion[] | null> {
  const questions = await prisma.question.findMany({
    orderBy: { date: "desc" },
    include: {
      answers: true,
    },
  });

  if (!questions) {
    return null;
  }

  return questions;
}

export async function findAllAnswers(
  questionId: number,
): Promise<IAnswerPost[] | null> {
  const answers = await prisma.answer.findMany({
    where: { questionId },
    orderBy: { date: "desc" },
  });

  if (!answers) {
    return null;
  }

  return answers;
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

export async function updateAnswer(answer: IAnswerPost) {
  return await prisma.answer.update({
    where: {
      id: answer.id,
    },
    data: {
      text: answer.text,
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

export async function deleteAnswer(AnswerId: number) {
  return await prisma.answer.delete({
    where: {
      id: AnswerId,
    },
  });
}
