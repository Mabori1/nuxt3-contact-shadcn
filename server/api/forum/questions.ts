import { findAllQuestions } from "~/server/repositories/forumRepository";
import { getUserById } from "~/server/repositories/userRepository";
import { IAnswer, IQuestion } from "~/types/IQuestion";

export default defineEventHandler(async (event) => {
  const questions: IQuestion[] | null = await findAllQuestions();

  if (!questions) {
    return null;
  }

  // Обрабатываем все вопросы
  const updatedQuestions = await Promise.all(
    questions.map(async (question: IQuestion) => {
      // Обрабатываем все ответы внутри вопроса
      const updatedAnswers = await Promise.all(
        question.answers.map(async (answer: IAnswer) => {
          const authorAnswer = await getUserById(answer.authorId);
          return {
            ...answer,
            authorName: `@${authorAnswer.username}`,
          };
        }),
      );

      // Получаем имя автора вопроса
      const user = await getUserById(question.authorId);

      return {
        ...question,
        authorName: `@${user.username}`,
        answers: updatedAnswers,
      };
    }),
  );

  return updatedQuestions;
});
