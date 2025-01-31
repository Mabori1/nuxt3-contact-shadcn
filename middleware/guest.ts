export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser();
  if (!user) {
    return navigateTo("/");
  }
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  if (to.path !== "/") {
    return navigateTo("/login");
  }
});
