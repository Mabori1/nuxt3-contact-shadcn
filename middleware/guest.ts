import { toast } from "~/components/ui/toast";

export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  if (!loggedIn.value && to.path !== "/") {
    toast({
      title: `Вы должны быть авторизированы \nдля просмотра этой страницы`,
    });
    return navigateTo("/");
  }
});
