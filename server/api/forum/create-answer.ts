import { createAnswer } from "~/server/repositories/forumRepository";
import { IAnswerPost } from "~/types/IQuestion";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data: IAnswerPost = body.data;

  const { user } = await requireUserSession(event);
  if (!user) {
    //toast({ variant: "destructive", title: "User not found" });
    throw createError({ statusCode: 401, message: "User not found" });
  }
  return await createAnswer(data, user.id);
});
