import { useValidatedParams, useValidatedBody, z, zh } from "h3-zod";
import { updateAnswer } from "~/server/repositories/forumRepository";
import { IAnswerPost } from "~/types/IQuestion";

export default defineEventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });
  const answer: IAnswerPost = await useValidatedBody(event, {
    authorId: z.number().positive({ message: "Must be a positive number" }),
    questionId: z.number().positive({ message: "Must be a positive number" }),
    text: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .max(200, { message: "Must have at more 300 character" }),
  });

  const { user } = await requireUserSession(event);

  const isMine = user.id == id;

  if (!isMine) {
    sendError(
      event,
      createError({ statusCode: 403, statusMessage: "Forbidden" }),
    );
  }

  return await updateAnswer(answer);
});
