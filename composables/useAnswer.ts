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
  const { data: questions } = useNuxtData<IQuestion[]>("questions");
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
      refreshNuxtData("questions");
      if (redirect) useRouter().push(redirect);
    },
    onResponseError() {
      questions.value = previousQuestions;
      toast({ variant: "destructive", title: errorMessage });
    },
    async onResponse() {
      await refreshNuxtData("questions");
    },
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

export async function getAnswers(questionId: number) {
  const answers = await $fetch<IAnswerPost[]>(`/api/answer/${questionId}`);

  if (!answers) {
    toast({
      variant: "destructive",
      title: "Ответы не получены",
    });
    return undefined;
  }
  return answers;
}

export async function updateAnswer(answer: IAnswerPost) {
  const res = await $fetch<IAnswerPost>(`/api/answer/${answer.id}`, {
    method: "patch",
    body: answer,
  });

  if (!res) {
    toast({
      variant: "destructive",
      title: `Текст не изменён, ${answer.text}`,
    });
  } else {
    toast({ title: `Текст успешно изменён: ${res.text}` });
  }
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
