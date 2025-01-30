export default defineEventHandler((event) => {
  setCookie(event, "auth_token", "");
});
