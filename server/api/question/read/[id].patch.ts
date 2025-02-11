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

  await setUserSession(event, {
    user: {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      readed: updatedUser.readed.map((item) => item.questionId),
    },
  });
});
