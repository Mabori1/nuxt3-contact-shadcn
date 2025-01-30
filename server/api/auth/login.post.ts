import bcrypt from "bcrypt";
import { getUser } from "~/server/repositories/userRepository";
import { makeSession } from "~/server/services/sessionService";
import { doesUserExistsEmail } from "~/server/services/userService";
import { IUser } from "~/types/IUser";

export default defineEventHandler(async (event) => {
  const body: IUser = await readBody(event);
  const { email, password } = body;

  const existsUser = await doesUserExistsEmail(email);

  if (existsUser.value) {
    throw createError({
      statusCode: 422,
      statusMessage: "User already exists",
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const userData: { email: string; password: string } = {
    email,
    password: encryptedPassword,
  };

  const user = await getUser(userData.email);

  return await makeSession(user, event);
});
