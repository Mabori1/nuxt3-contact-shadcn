import { toast } from "~/components/ui/toast";
import type { IQuestionPost } from "~/types/IQuestion";

export async function addNewQuestion(question: {
  title: string;
  description: string;
}) {
  try {
    const res = await useFetch<IQuestionPost>("/api/forum/create-question", {
      method: "post",
      body: question,
    });

    if (res) {
      toast({ title: "Тема форума успешно создана" });
      await useRouter().push("/forum");
    }
  } catch (err: any) {
    toast({ title: "Ошибка создания темы, " + err.toString() });
  }
}
