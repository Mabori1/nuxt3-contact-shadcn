import { toast } from "~/components/ui/toast";
import type { IQuestion, IQuestionPost } from "~/types/IQuestion";

export async function addNewQuestion(question: IQuestionPost) {
  const res = await $fetch<IQuestionPost>("/api/question", {
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
  const questions = await $fetch<IQuestion[]>("/api/question");

  if (!questions) {
    toast({
      variant: "destructive",
      title: "Темы не получены",
    });
    return [];
  }
  return questions;
}

export async function updateQuestion(question: IQuestionPost) {
  const res = await useFetch<IQuestionPost>("/api/question/", {
    method: "patch",
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

export async function readToggleQuestion(question: IQuestionPost) {
  const res = await useFetch<IQuestionPost>("/api/forum/read-question", {
    method: "put",
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

export async function removeQuestion(id: number) {
  try {
    await $fetch(`/api/forum/delete-question/${id}`, {
      method: "delete",
    });

    toast({
      title: `Тема успешно удалена`,
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: `Тема не удалена.`,
    });
    createError({ statusCode: 404, statusMessage: "Question not found" });
  }
}
