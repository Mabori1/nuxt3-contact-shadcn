import { toast } from "~/components/ui/toast";
import type { IQuestion, IQuestionPost } from "~/types/IQuestion";

// export async function addNewQuestion(question: IQuestionPost) {
//   const res = await $fetch<IQuestionPost>("/api/question", {
//     method: "post",
//     body: question,
//   });
//
//   if (!res) {
//     toast({
//       variant: "destructive",
//       title: `Тема не создана, ${res}`,
//     });
//   } else {
//     await useRouter().push("/forum");
//     toast({ title: `Создана тема: ${useToastTitle().value}` });
//   }
// }

export async function addQuestion(newQuestion: IQuestionPost) {
  const { data: questions } = useNuxtData("questions");
  let previousQuestions: IQuestion[] = [];

  return $fetch("/api/question", {
    method: "post",
    body: newQuestion,
    onRequest() {
      // Store the previously cached value to restore if fetch fails.
      previousQuestions = questions.value;

      // Optimistically update the todos.
      questions.value = getQuestions();

      toast({ title: `Создана тема: ${newQuestion.title}` });
      useRouter().push("/forum");
    },
    onResponseError() {
      // Rollback the data if the request failed.
      questions.value = previousQuestions;

      toast({
        variant: "destructive",
        title: `Тема не создана`,
      });
    },
    async onResponse() {
      // Invalidate questions in the background if the request succeeded.
      await refreshNuxtData("questions");
    },
  });
}

export async function getQuestions() {
  const { data } = await useFetch<IQuestion[]>("/api/question", {
    key: "questions",
  });

  if (!data.value) {
    toast({
      variant: "destructive",
      title: "Темы не получены",
    });
    return [];
  }
  return data.value;
}

export async function updateQuestion(question: IQuestionPost) {
  const res = await $fetch<IQuestionPost>(`/api/question/${question.id}`, {
    method: "patch",
    body: question,
  });

  if (!res) {
    toast({
      variant: "destructive",
      title: `Тема не изменена, ${question.title}`,
    });
  } else {
    await useRouter().push("/forum");
    toast({ title: `Успешно изменена тема: ${res.title}` });
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
