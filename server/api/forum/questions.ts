import { findAllQuestions } from "~/server/repositories/forumRepository";
import { getUserById } from "~/server/repositories/userRepository";
import { IAnswer, IQuestion } from "~/types/IQuestion";

export default defineEventHandler(async (event) => {
  const questions: IQuestion[] = await findAllQuestions();

  questions.forEach(async (question: IQuestion) => {
    const user = await getUserById(question?.authorId);

    question.answers.forEach(
      (answer: IAnswer) => (answer.authorName = "@" + user.username),
    );
    question.authorName = "@" + user.username;
  });

  return questions;
});
