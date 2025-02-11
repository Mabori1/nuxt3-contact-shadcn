import { toast } from "~/components/ui/toast";
import type { IAnswerPost } from "~/types/IQuestion";

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

  return await $fetch(url, {
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

export async function addAnswer(answer: IAnswerPost) {
  return await handleRequest(
    `/api/answer`,
    "post",
    answer,
    `Ответ успешно создан`,
    "Ответ не создан",
  );
}

export async function useUpdateAnswer(answer: IAnswerPost) {
  return await handleRequest(
    `/api/answer/${answer.id}`,
    "patch",
    answer,
    "Ответ успешно обновлен",
    "Ответ не обновлен.",
  );
}

export async function removeAnswer(answer: IAnswerPost) {
  return await handleRequest(
    `/api/answer/${answer.id}`,
    "delete",
    answer,
    "Ответ успешно удален",
    "Ответ не удален.",
  );
}
