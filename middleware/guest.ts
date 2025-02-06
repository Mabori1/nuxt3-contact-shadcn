export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useUser();
  console.log(user);
  if (!user && to.path !== "/") {
    return useRouter().push("/login");
  }
});
