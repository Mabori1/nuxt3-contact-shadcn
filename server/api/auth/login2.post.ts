import bcrypt from "bcrypt";
import { getUser } from "~/server/repositories/userRepository";
import {
  makeSession,
  removeSessionByUserId,
} from "~/server/services/sessionService";
import { IUser } from "~/types/IUser";

export default defineEventHandler(async (event) => {
  const body: IUser = await readBody(event);
  const { email, password } = body;

  const existsUser = await getUser(email);
  const isPasswordValid = await bcrypt.compare(password, existsUser.password);

  if (!existsUser || !isPasswordValid) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  await removeSessionByUserId(existsUser.id);

  return await makeSession(existsUser, event);
});
