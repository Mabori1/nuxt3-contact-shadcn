import bcrypt from "bcrypt";
import { z } from "zod";
import { getUser } from "~/server/repositories/userRepository";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

const bodySchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(1, { message: "Must have at least 1 character" })
    .regex(passwordValidation, {
      message: "Your password is not valid",
    }),
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  const existsUser = await getUser(email);
  const isPasswordValid = await bcrypt.compare(password, existsUser.password);

  if (email === existsUser.email && isPasswordValid) {
    await setUserSession(event, {
      user: {
        id: existsUser.id,
        username: existsUser.username,
        email: existsUser.email,
        readed: existsUser.readed.map((item) => item.questionId),
      },
    });
    return {};
  }
  throw createError({
    statusCode: 401,
    message: "Bad credentials",
  });
});
