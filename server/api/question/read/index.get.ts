import { getUser } from "~/server/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const updatedUser = await getUser(user.email);
  const updatedReaded = updatedUser.readed.map((item) => item.questionId);
  return updatedReaded;
});
