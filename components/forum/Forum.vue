<script lang="ts" setup>
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { refDebounced } from "@vueuse/core";
import { CirclePlus, Search } from "lucide-vue-next";
import type { IAnswer, IQuestion } from "~/types/IQuestion";
import ForumDisplay from "./ForumDisplay.vue";
import ForumList from "./ForumList.vue";

const questions = useState<IQuestion[]>("questions");

const selectedQuestion = ref<number | undefined>(questions.value[0].id);
const searchValue = ref("");
const debouncedSearch = refDebounced(searchValue, 250);
const filteredQuestionList = computed(() => {
  let output: IQuestion[] = [];
  const searchValue = debouncedSearch.value?.trim();
  if (!searchValue) {
    output = questions.value;
  } else {
    output = questions.value.filter((item) => {
      return (
        item.authorName?.includes(debouncedSearch.value) ||
        item.title.includes(debouncedSearch.value) ||
        item.description.includes(debouncedSearch.value) ||
        item.tags.includes(debouncedSearch.value) ||
        item.answers.filter((answer: IAnswer) =>
          answer.text.includes(debouncedSearch.value),
        )
      );
    });
  }

  return output;
});

const readUserArray = useState<number[]>("readQuestion");

const unreadQuestionList = computed(() =>
  filteredQuestionList.value.filter(
    (item) => !readUserArray.value.includes(item.id),
  ),
);

const selectedQuestionData = computed(() => {
  if (questions.value.length !== 0) {
    return questions.value.find((item) => item.id === selectedQuestion.value);
  }
  return undefined;
});

watch(questions, async () => {
  questions.value = await getQuestions();
});

onMounted(async () => {
  questions.value = await getQuestions();
  readUserArray.value = await getReadQuestions();
});
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup
      id="resize-panel-group-1"
      direction="horizontal"
      class="h-full max-h-[800px] items-stretch"
    >
      <ResizablePanel id="resize-panel-2" :min-size="30">
        <Tabs default-value="all">
          <div class="flex items-center justify-between px-4 py-2">
            <h1 class="hidden text-xl font-bold md:block">Форум</h1>

            <div class="flex items-center">
              <Separator orientation="vertical" class="mx-1 h-6" />
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button
                    @click="navigateTo('/forum/create')"
                    variant="ghost"
                    size="icon"
                  >
                    <CirclePlus class="size-8" />
                    <span class="sr-only">Создать тему форума</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Создать тему форума</TooltipContent>
              </Tooltip>

              <Separator orientation="vertical" class="mx-1 h-6" />
            </div>
            <TabsList class="flex flex-col md:flex-row">
              <TabsTrigger value="all" class="text-zinc-600 dark:text-zinc-200">
                All Questions
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                class="text-zinc-600 dark:text-zinc-200"
              >
                Unread
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div
            class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <form>
              <div class="relative">
                <Search
                  class="absolute left-2 top-2.5 size-4 text-muted-foreground"
                />
                <Input
                  type="text"
                  v-model="searchValue"
                  placeholder="Search"
                  class="pl-8"
                />
              </div>
            </form>
          </div>
          <TabsContent value="all" class="m-0">
            <ForumList
              v-model:selected-question="selectedQuestion"
              :items="filteredQuestionList"
            />
          </TabsContent>
          <TabsContent value="unread" class="m-0">
            <ForumList
              v-model:selected-question="selectedQuestion"
              :items="unreadQuestionList"
            />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle id="resiz-handle-2" with-handle />
      <ResizablePanel id="resize-panel-3">
        <ForumDisplay :question="selectedQuestionData" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>
