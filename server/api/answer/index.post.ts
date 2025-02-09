import { useValidatedBody, z } from "h3-zod";
import { createAnswer } from "~/server/repositories/forumRepository";
import { IAnswerPost } from "~/types/IQuestion";

export default defineEventHandler(async (event) => {
  const body: IAnswerPost = await useValidatedBody(event, {
    questionId: z
      .number()
      .min(1, { message: "Must have at least 1 character" }),
    text: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .max(200, { message: "Must have at more 300 character" }),
  });

  const { user } = await requireUserSession(event);

  return await createAnswer(body, user.id);
});
