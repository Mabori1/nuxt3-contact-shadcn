export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser();
  if (user == null || user == undefined) {
    return navigateTo("/");
  }
});
