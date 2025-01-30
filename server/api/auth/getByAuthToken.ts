import { getUserBySessionToken } from "~/server/services/sessionService";

export default defineEventHandler((event) => {
  const authToken = getCookie(event, "auth_token");

  if (!authToken) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const user = getUserBySessionToken(authToken);
  return user;
});
