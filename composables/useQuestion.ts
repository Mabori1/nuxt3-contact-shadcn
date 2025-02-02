import { toast } from "~/components/ui/toast";
import type { IQuestionPost } from "~/types/IQuestion";

export async function addNewQuestion(question: IQuestionPost) {
  const res = await $fetch<IQuestionPost>("/api/forum/create-question", {
    method: "post",
    body: question,
  });

  if (!res) {
    toast({
      variant: "destructive",
      title: `Тема не создана, ${res}`,
    });
  } else {
    await useRouter().push("/forum");
    toast({ title: `Создана тема: ${useToastTitle().value}` });
  }
}
