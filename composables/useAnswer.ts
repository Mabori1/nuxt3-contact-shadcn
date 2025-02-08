import { toast } from "~/components/ui/toast";
import type { IAnswerPost } from "~/types/IQuestion";

export async function addNewAnswer(answer: IAnswerPost) {
  const res = await $fetch<IAnswerPost>("/api/answer", {
    method: "post",
    body: answer,
  });

  if (!res) {
    toast({
      variant: "destructive",
      title: `Ответ не создан, ${res}`,
    });
  } else {
    toast({ title: "Ответ успешно создан" });
  }
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

export async function deleteAnswer(answer: IAnswerPost) {
  const res = await $fetch<IAnswerPost>(`/api/answer/${answer.id}`, {
    method: "delete",
    body: answer,
  });

  if (!res) {
    toast({
      variant: "destructive",
      title: "Ответ не удалён.",
    });
  } else {
    toast({ title: `Ответ успешно удалён.` });
  }
}
