import { toast } from "~/components/ui/toast";
import type { IQuestion, IQuestionPost } from "~/types/IQuestion";

export async function useQuestions() {
  const { data } = await useAsyncData<IQuestion[]>("questions", () =>
    $fetch<IQuestion[]>("/api/question"),
  );
  return data.value;
}
export async function getReadQuestions() {
  return await $fetch<number[]>("/api/question/read");
}

export async function getQuestions() {
  return await $fetch<IQuestion[]>("/api/question");
}

async function handleRequest(
  url: string,
  method: "patch" | "delete" | "post",
  body: IQuestionPost | IQuestion | { questionId: number } | null,
  successMessage: string,
  errorMessage: string,
  redirect: string | null = null,
) {
  const questions = useState<IQuestion[]>("questions");
  let previousQuestions = questions.value;

  return $fetch(url, {
    method,
    body,
    onRequest() {
      previousQuestions = questions.value;
      getQuestions().then(
        (fetchedQuestions) => (questions.value = fetchedQuestions),
      );
      toast({ title: successMessage });

      if (redirect) useRouter().push(redirect);
    },
    onResponseError() {
      questions.value = previousQuestions;
      toast({ variant: "destructive", title: errorMessage });
    },
    async onResponse() {},
  });
}

export async function addQuestion(question: IQuestionPost) {
  return await handleRequest(
    `/api/question`,
    "post",
    question,
    `Создана тема: ${question.title}`,
    "Тема не обновлена",
    "/forum",
  );
}

export async function updateQuestion(updateQuestion: IQuestionPost) {
  return await handleRequest(
    `/api/question/${updateQuestion.id}`,
    "patch",
    updateQuestion,
    `Обновлена тема: ${updateQuestion.title}`,
    "Тема не обновлена",
    "/forum",
  );
}

export async function readToggleQuestion(questionId: number) {
  return await $fetch(`/api/question/read/${questionId}`, {
    method: "patch",
  });
}

export async function removeQuestion(id: number) {
  return await handleRequest(
    `/api/question/${id}`,
    "delete",
    null,
    "Тема успешно удалена",
    "Тема не удалена.",
  );
}
