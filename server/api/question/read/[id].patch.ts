import { useValidatedParams, zh } from "h3-zod";
import { toggleReadQuestion } from "~/server/repositories/forumRepository";
import { getUser } from "~/server/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });

  const { user } = await requireUserSession(event);

  await toggleReadQuestion(user.id, id);
  const updatedUser = await getUser(user.email);
  const updatedReaded = updatedUser.readed.map((item) => item.questionId);

  return updatedReaded;
});
