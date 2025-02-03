import { searchQuestions } from "~/server/repositories/forumRepository";

export default defineEventHandler(async (event) => {
  const queries = getQuery(event);

  return await searchQuestions(queries.search as string);
});
