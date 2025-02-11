<script lang="ts" setup>
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toTypedSchema } from "@vee-validate/zod";
import { addDays, addHours, format, nextSaturday } from "date-fns";
import { ru } from "date-fns/locale";
import {
  Clock,
  CornerDownLeft,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
  Edit2,
  CircleX,
  Pencil,
  CornerUpLeft,
} from "lucide-vue-next";
import { useForm } from "vee-validate";
import { computed } from "vue";
import * as z from "zod";
import type { IAnswerPost, IQuestion, IQuestionPost } from "~/types/IQuestion";
import { toast } from "../ui/toast";

interface QuestionDisplayProps {
  question: IQuestion | undefined;
}

const props = defineProps<QuestionDisplayProps>();

const questionFallbackName = computed(() => {
  return props.question?.title
    .split(" ")
    .map((chunk) => chunk[0])
    .join("");
});

const today = new Date();
const { user } = useUserSession();

const formSchema = toTypedSchema(
  z.object({
    text: z.string().min(2).max(150),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const isUpdatedAnswer = ref(false);
let idUpdatedAnswer: number | undefined = undefined;

function onEditAnswer(answer: IAnswerPost) {
  if (!user.value || user.value.id !== answer.authorId) {
    toast({
      variant: "destructive",
      title: "Вы не можете редактировать чужой ответ",
    });
    return;
  }
  isUpdatedAnswer.value = true;
  idUpdatedAnswer = answer.id;
  form.setValues({
    text: answer.text,
  });
}
function onCanseled() {
  isUpdatedAnswer.value = false;
  idUpdatedAnswer = undefined;
  form.resetForm();
}
async function onUpdateAnswer() {
  if (props.question?.id && user.value?.id && form.values.text) {
    const findedAnswer = toRaw(props.question.answers).find(
      (item) => item.id === idUpdatedAnswer,
    );
    if (form.values.text === findedAnswer?.text) {
      toast({ variant: "destructive", title: "Ответ не изменился" });
      return;
    }

    const updatedAnswer: IAnswerPost = {
      id: idUpdatedAnswer,
      text: form.values.text,
      questionId: +props.question?.id,
      authorId: user.value.id,
    };
    await useUpdateAnswer(updatedAnswer);
    isUpdatedAnswer.value = false;
  }
  form.resetForm();
}

const onSubmit = form.handleSubmit(async (values) => {
  if (props.question?.id && user.value?.id) {
    const newAnswer = {
      questionId: +props.question?.id,
      authorId: user.value.id,
      text: values.text,
    };
    await addAnswer(newAnswer);
    form.resetForm();
  }
});

const updateCurrentQuestion = (question: IQuestionPost) => {
  useState<IQuestionPost>("updatedQuestion").value = question;
  navigateTo("/forum/update"); // Переход на страницу редактирования
};

const { fetch: refreshSession } = useUserSession();

async function toggleReadQuestion(id: number) {
  await readToggleQuestion(id);
  await refreshSession();
}

async function delAnswer(answer: IAnswerPost) {
  await removeAnswer(answer);
}

async function deleteQuestion(id: number) {
  await removeQuestion(id);
}
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center p-2">
      <div class="flex items-center gap-2">
        <Separator orientation="vertical" class="mx-1 h-6" />
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              @click="question && updateCurrentQuestion(question)"
              variant="ghost"
              size="icon"
              :disabled="!question"
            >
              <Edit2 class="size-4" />
              <span class="sr-only">Редактировать тему форума</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Редактировать тему форума</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" class="mx-1 h-6" />
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              @click="question && deleteQuestion(question.id)"
              variant="ghost"
              size="icon"
              :disabled="!question"
            >
              <Trash2 class="size-4" />
              <span class="sr-only">Удалить тему форума</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Удалить тему форума</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" class="mx-1 h-6" />
        <Tooltip>
          <Popover>
            <PopoverTrigger as-child>
              <TooltipTrigger as-child>
                <Button variant="ghost" size="icon" :disabled="!question">
                  <Clock class="size-4" />
                  <span class="sr-only">Snooze</span>
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <PopoverContent class="flex w-[535px] p-0">
              <div class="flex flex-col gap-2 border-r px-2 py-4">
                <div class="px-4 text-sm font-medium">Snooze until</div>
                <div class="grid min-w-[250px] gap-1">
                  <Button variant="ghost" class="justify-start font-normal">
                    Later today
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addHours(today, 4), "E, h:m b") }}
                    </span>
                  </Button>
                  <Button variant="ghost" class="justify-start font-normal">
                    Tomorrow
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addDays(today, 1), "E, h:m b") }}
                    </span>
                  </Button>
                  <Button variant="ghost" class="justify-start font-normal">
                    This weekend
                    <span class="ml-auto text-muted-foreground">
                      {{ format(nextSaturday(today), "E, h:m b") }}
                    </span>
                  </Button>
                  <Button variant="ghost" class="justify-start font-normal">
                    Next week
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addDays(today, 7), "E, h:m b") }}
                    </span>
                  </Button>
                </div>
              </div>
              <div class="p-2">
                <Calendar />
              </div>
            </PopoverContent>
          </Popover>
          <TooltipContent>Snooze</TooltipContent>
        </Tooltip>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!question">
              <Reply class="size-4" />
              <span class="sr-only">Reply</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reply</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!question">
              <ReplyAll class="size-4" />
              <span class="sr-only">Reply all</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reply all</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon" :disabled="!question">
              <Forward class="size-4" />
              <span class="sr-only">Forward</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Forward</TooltipContent>
        </Tooltip>
      </div>
      <Separator orientation="vertical" class="mx-2 h-6" />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon" :disabled="!question">
            <MoreVertical class="size-4" />
            <span class="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem @click="question && toggleReadQuestion(question.id)"
            >Mark as unread</DropdownMenuItem
          >
          <DropdownMenuItem>Star thread</DropdownMenuItem>
          <DropdownMenuItem>Add label</DropdownMenuItem>
          <DropdownMenuItem>Mute thread</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <Separator />
    <div v-if="question" class="flex flex-1 flex-col">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarFallback>
              {{ questionFallbackName }}
            </AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <div class="font-semibold">
              {{ question.title }}
            </div>
            <div class="line-clamp-1 text-xs">
              <span class="font-medium">Автор :</span>
              {{ question.authorName }}
            </div>
          </div>
        </div>
        <div v-if="question.date" class="ml-auto text-xs text-muted-foreground">
          {{ format(new Date(question.date), "PPpp", { locale: ru }) }}
        </div>
      </div>
      <Separator />
      <div class="flex flex-col gap-1 text-sm">
        <p class="ml-2 py-4">{{ question.description }}</p>
        <Separator />

        <ScrollArea class="flex h-[67vh]">
          <div class="flex flex-col">
            <Card
              v-for="answer in question.answers"
              :key="answer.date.toString()"
              class="m-2 py-1"
            >
              <CardHeader
                >Ответ от: {{ answer.authorName }}
                <div class="flex gap-3">
                  <Pencil class="size-3.5" @click="onEditAnswer(answer)" />
                  <CircleX class="size-4" @click="delAnswer(answer)" />
                </div>
              </CardHeader>
              <CardDescription class="my-1 ml-2"></CardDescription>
              <CardDescription class="my-1 ml-2 text-gray-500">
                {{ answer.text }}</CardDescription
              >
            </Card>
            <Separator />
            <div class="mt-auto p-4">
              <form
                @submit.prevent="onSubmit"
                class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              >
                <FormField v-slot="{ componentField }" name="text">
                  <FormItem>
                    <FormControl>
                      <Label for="message" class="sr-only"> Message </Label>
                      <Textarea
                        id="message"
                        :placeholder="`Ответ ${question.authorName}...`"
                        class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <div class="flex items-center p-3 pt-0">
                  <Button
                    v-if="!isUpdatedAnswer"
                    type="submit"
                    size="sm"
                    class="ml-auto mt-1 gap-1.5"
                  >
                    Создать ответ
                    <CornerDownLeft class="size-3.5" />
                  </Button>
                  <div v-else class="ml-auto flex gap-4">
                    <Button
                      type="text"
                      @click="onCanseled"
                      size="sm"
                      class="ml-auto mt-1 gap-1.5"
                    >
                      Отмена
                      <CornerUpLeft class="size-3.5" />
                    </Button>
                    <Button
                      type="text"
                      @click.prevent="onUpdateAnswer"
                      size="sm"
                      class="ml-auto mt-1 gap-1.5"
                    >
                      Обновить ответ
                      <CornerDownLeft class="size-3.5" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
    <div v-else class="p-8 text-center text-muted-foreground">
      No message selected
    </div>
  </div>
</template>
