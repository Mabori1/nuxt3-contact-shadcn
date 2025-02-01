import {
  deleteQuestion,
  findQuestion,
} from "~/server/repositories/forumRepository";
import { getUserBySessionToken } from "~/server/services/sessionService";
import { IQuestionPost } from "~/types/IQuestion";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data: IQuestionPost = body.data;
  if (!data.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request, id not found",
    });
  }
  const question = await findQuestion(data.id);

  const authToken = getCookie(event, "auth_token");
  if (!authToken) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const user = await getUserBySessionToken(authToken);

  const isMine = user.id == question.authorId;

  if (!isMine) {
    sendError(
      event,
      createError({ statusCode: 403, statusMessage: "Unauthorized" }),
    );
  }

  return await deleteQuestion(question.id);
});
