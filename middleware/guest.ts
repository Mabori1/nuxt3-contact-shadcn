export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser();
  if (!user && to.path !== "/") {
    return useRouter().push("/login");
  }
});
