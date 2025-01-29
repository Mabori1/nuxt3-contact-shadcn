import type { ISession } from "~/types/ISession";

export async function registerWithEmail(user: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const res = await $fetch<ISession>("/api/auth/register", {
      method: "post",
      body: user,
    });

    if (res) {
      useState("user").value = res;
      await useRouter().push("/");
    }
  } catch (err: any) {
    console.log("error: " + err.toString());
  }
}
