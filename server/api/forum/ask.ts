import { createQuestion } from "~/server/repositories/forumRepository";
import { getSessionByAuthToken } from "~/server/repositories/sessionRepository";
import { IQuestionPost } from "~/types/IQuestion";

export default defineEventHandler(async (event) => {
  const questionPost: IQuestionPost = await readBody(event);

  const authToken = getCookie(event, "auth_token");

  if (!authToken) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const session = await getSessionByAuthToken(authToken);
  if (session.userId) {
    return await createQuestion(questionPost, session.userId);
  }
});
