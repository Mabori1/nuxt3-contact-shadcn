import { useFetch, useRequestHeaders } from "nuxt/app";
import { createQuestion } from "~/server/repositories/askMaboriRepository";
import { IQuestionPost } from "~/types/IQuestion";
import { IUser } from "~/types/IUser";

export default defineEventHandler(async (event) => {
  const questionPost: IQuestionPost = await readBody(event);

  const { data: user } = await useFetch<IUser>("/api/auth/getByAuthToken", {
    headers: useRequestHeaders(["cookie"]),
  });
  if (user.value?.id) {
    return await createQuestion(questionPost, user.value.id);
  }
});
