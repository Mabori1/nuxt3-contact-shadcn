import {
  editQuestion,
  findQuestion,
} from "~/server/repositories/forumRepository";
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

  question.description = data.description;
  question.title = data.title;

  return await editQuestion(question);
});
