import {
  deleteQuestion,
  findQuestion,
} from "~/server/repositories/forumRepository";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  console.info("delete question: ", id);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request, id not found",
    });
  }
  const question = await findQuestion(+id);

  const { user } = await requireUserSession(event);

  if (user.id !== question.authorId) {
    //toast({ variant: "destructive", title: "Вам запрещено удалять эту тему." });
    sendError(
      event,
      createError({ statusCode: 403, statusMessage: "Forbidden" }),
    );
  }

  return await deleteQuestion(question.id);
});
