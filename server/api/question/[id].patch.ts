import { useValidatedParams, useValidatedBody, z, zh } from "h3-zod";
import { editQuestion } from "~/server/repositories/forumRepository";
import { IQuestionPost } from "~/types/IQuestion";

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });
  const question: IQuestionPost = await useValidatedBody(event, {
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

  const isMine = user.id == id;

  if (!isMine) {
    sendError(
      event,
      createError({ statusCode: 403, statusMessage: "Forbidden" }),
    );
  }

  return await editQuestion(question);
});
