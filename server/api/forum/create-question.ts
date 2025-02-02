import { createQuestion } from "~/server/repositories/forumRepository";
import { getUserBySessionToken } from "~/server/services/sessionService";
import { IQuestionPost } from "~/types/IQuestion";

export default defineEventHandler(async (event) => {
  const body: IQuestionPost = await readBody(event);
  if (!body.title || !body.description) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request no body",
    });
  }

  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const user = await getUserBySessionToken(authToken);
  if (!user.id) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  return await createQuestion(body, user.id);
});
