import { createQuestion } from "~/server/repositories/forumRepository";
import { IQuestionPost } from "~/types/IQuestion";

export default defineEventHandler(async (event) => {
  const body: IQuestionPost = await readBody(event);
  if (!body.title || !body.description) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request no body",
    });
  }

  const { user } = await requireUserSession(event);
  if (!user) {
    //toast({ variant: "destructive", title: "User not found" });
    throw createError({ statusCode: 401, message: "User not found" });
  }

  return await createQuestion(body, user.id);
});
