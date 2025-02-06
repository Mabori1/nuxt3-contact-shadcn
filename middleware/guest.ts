export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useUser();
  if (!user && to.path !== "/") {
    return useRouter().push("/login");
  }
});
