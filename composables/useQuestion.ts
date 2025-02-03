import { toast } from "~/components/ui/toast";
import type { IQuestion, IQuestionPost } from "~/types/IQuestion";

export async function addNewQuestion(question: IQuestionPost) {
  const res = await useFetch<IQuestionPost>("/api/forum/create-question", {
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

export async function getQuestions() {
  const { data } = await useFetch<IQuestion[]>("/api/forum/questions");

  if (!data) {
    toast({
      variant: "destructive",
      title: `Темы не получены`,
    });
    throw new Error("Темы не получены");
  }
  return data;
}

export async function updateQuestion(question: IQuestionPost) {
  const res = await useFetch<IQuestionPost>("/api/forum/create-question", {
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
