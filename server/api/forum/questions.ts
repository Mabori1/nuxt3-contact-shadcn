import { findQuestion } from "~/server/repositories/forumRepository";
import { getUserById } from "~/server/repositories/userRepository";
import { IAnswer, IQuestion } from "~/types/IQuestion";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const questionId = parseInt(query.id as string);

  const question: IQuestion = await findQuestion(questionId);
  const user = await getUserById(question?.authorId);

  question.answers.forEach(
    (answer: IAnswer) => (answer.authorName = "@" + user.username),
  );
  question.authName = "@" + user.username;

  return question;
});
