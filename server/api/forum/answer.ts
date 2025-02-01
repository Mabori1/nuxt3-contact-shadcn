import { createAnswer } from "~/server/repositories/forumRepository";
import { getUserBySessionToken } from "~/server/services/sessionService";
import { IAnswerPost } from "~/types/IQuestion";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data: IAnswerPost = body.data;

  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const user = await getUserBySessionToken(authToken);
  if (!user.id) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  return await createAnswer(data, user.id);
});
