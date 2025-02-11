import bcrypt from "bcrypt";
import { useValidatedBody } from "h3-zod";
import { createUser } from "~/server/repositories/userRepository";
import { doesUserExists } from "~/server/services/userService";
import { IUser } from "~/types/IUser";
import * as z from "zod";

export default defineEventHandler(async (event) => {
  const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  );
  const body: IUser = await useValidatedBody(event, {
    username: z
      .string()
      .min(2, { message: "Must have at least 1 character" })
      .max(50, { message: "Must have at more 50 character" }),
    email: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .email({
        message: "Must be a valid email",
      }),
    password: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .regex(passwordValidation, {
        message: "Your password is not valid",
      }),
  });

  const { username, email, password } = body;

  const existsUser = await doesUserExists(email, username);

  if (existsUser.value) {
    throw createError({
      statusCode: 422,
      statusMessage: "User already exists",
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const userData = {
    username,
    email,
    password: encryptedPassword,
  };

  const user = await createUser(userData);

  if (user) {
    await setUserSession(event, {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        readed: user.readed.map((item) => item.questionId),
      },
    });
  }
});
