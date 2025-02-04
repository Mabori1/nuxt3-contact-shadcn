import { toast } from "~/components/ui/toast";
import type { ISession } from "~/types/ISession";
import type { IUser } from "~/types/IUser";

export async function userLogout() {
  await useFetch("/api/auth/logout");
  toast({
    title: "Logged out successfully",
  });
  useState("user").value = null;
  await useRouter().push("/login");
}

export const useAuthCookie = () => useCookie("auth_token");

export async function useUser(): Promise<IUser> {
  const authCookie = useAuthCookie().value;
  const user = useState<IUser>("user");

  if (authCookie && !user.value) {
    const { data } = await useFetch<IUser>("/api/auth/getByAuthToken", {
      headers: useRequestHeaders(["cookie"]),
    });
    if (data.value) user.value = data.value;
  }
  return user.value;
}

export async function registerWithEmail(user: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const res = await useFetch<ISession>("/api/auth/register", {
      method: "post",
      body: user,
    });

    if (!res.error) {
      useState("user").value = res;
      toast({ title: "Registered in successfully" });
      await useRouter().push("/");
    }
  } catch (err: any) {
    toast({ title: "Registration failed, " + err.toString() });
  }
}

export async function loginWithEmail(user: {
  email: string;
  password: string;
}) {
  try {
    const res = await useFetch<ISession>("/api/auth/login", {
      method: "post",
      body: user,
    });

    if (res) {
      useState("user").value = res;
      toast({ title: "Logged in successfully" });
      await useRouter().push("/");
    }
  } catch (err: any) {
    toast({ title: "Wrong email or password, " + err.toString() });
  }
}
