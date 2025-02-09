import { toast } from "~/components/ui/toast";
import type { IQuestion, IQuestionPost } from "~/types/IQuestion";

export async function addQuestion(newQuestion: IQuestionPost) {
  const { data: questions } = useNuxtData<IQuestion[]>("questions");
  let previousQuestions: IQuestion[] | null = [];

  return $fetch("/api/question", {
    method: "post",
    body: newQuestion,
    onRequest() {
      // Store the previously cached value to restore if fetch fails.
      previousQuestions = questions.value;

      // Optimistically update the questions.
      getQuestions().then(
        (fedchedQuestions) => (questions.value = fedchedQuestions),
      );

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

export async function useQuestions() {
  const { data } = await useAsyncData<IQuestion[]>("questions", () =>
    $fetch<IQuestion[]>("/api/question"),
  );
  return data.value;
}

export async function getQuestions() {
  return await $fetch<IQuestion[]>("/api/question");
}

export async function updateQuestion(updateQuestion: IQuestionPost) {
  const { data: questions } = useNuxtData("questions");
  let previousQuestions: IQuestion[] = [];

  return $fetch(`/api/question/${updateQuestion.id}`, {
    method: "patch",
    body: updateQuestion,
    onRequest() {
      // Store the previously cached value to restore if fetch fails.
      previousQuestions = questions.value;

      // Optimistically update the questions.
      getQuestions().then(
        (fedchedQuestions) => (questions.value = fedchedQuestions),
      );

      toast({ title: `Обновлена тема: ${updateQuestion.title}` });
      useRouter().push("/forum");
    },
    onResponseError() {
      // Rollback the data if the request failed.
      questions.value = previousQuestions;

      toast({
        variant: "destructive",
        title: `Тема не обновлена`,
      });
    },
    async onResponse() {
      // Invalidate questions in the background if the request succeeded.
      await refreshNuxtData("questions");
    },
  });
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
  const { data: questions } = useNuxtData("questions");
  let previousQuestions: IQuestion[] = [];

  return $fetch(`/api/question/${id}`, {
    method: "delete",
    onRequest() {
      // Store the previously cached value to restore if fetch fails.
      previousQuestions = questions.value;

      // Optimistically update the questions.
      getQuestions().then(
        (fedchedQuestions) => (questions.value = fedchedQuestions),
      );

      toast({ title: "Тема успешно удалена" });
      useRouter().push("/forum");
    },
    onResponseError() {
      // Rollback the data if the request failed.
      questions.value = previousQuestions;

      toast({
        variant: "destructive",
        title: `Тема не удалена.`,
      });
    },
    async onResponse() {
      // Invalidate questions in the background if the request succeeded.
      await refreshNuxtData("questions");
    },
  });
}
