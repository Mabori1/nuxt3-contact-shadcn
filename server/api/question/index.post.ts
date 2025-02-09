import { useValidatedBody, z } from "h3-zod";
import { IQuestionPost } from "~/types/IQuestion";
import { createQuestion } from "~/server/repositories/forumRepository";

export default defineEventHandler(async (event) => {
  const body: IQuestionPost = await useValidatedBody(event, {
    title: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .max(50, { message: "Must have at more 50 character" }),
    tags: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .max(50, { message: "Must have at more 50 character" }),
    description: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .max(300, { message: "Must have at more 300 character" }),
  });

  const { user } = await requireUserSession(event);

  return await createQuestion(body, user.id);
});
