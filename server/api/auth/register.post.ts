import bcrypt from "bcrypt";
import { createUser } from "~/server/repositories/userRepository";
import {
  makeSession,
  removeSessionByUserId,
} from "~/server/services/sessionService";
import { doesUserExists } from "~/server/services/userService";
import { IUser } from "~/types/IUser";

export default defineEventHandler(async (event) => {
  const body: IUser = await readBody(event);
  const { username, email, password } = body;

  const existsUser = await doesUserExists(email, username);

  if (existsUser.value) {
    throw createError({
      statusCode: 422,
      statusMessage: "User already exists",
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const userData: IUser = {
    username,
    email,
    password: encryptedPassword,
  };

  const user = await createUser(userData);

  await removeSessionByUserId(user.id);

  return await makeSession(user, event);
});
