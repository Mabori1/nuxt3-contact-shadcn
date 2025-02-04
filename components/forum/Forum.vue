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
import { Search } from "lucide-vue-next";
import type { IAnswer, ILabel, IQuestion } from "~/types/IQuestion";
import ForumDisplay from "./ForumDisplay.vue";
import ForumList from "./ForumList.vue";

interface QuestionProps {
  questions: IQuestion[];
  defaultLayout?: number[];
}

const props = withDefaults(defineProps<QuestionProps>(), {
  defaultLayout: () => [265, 440, 655],
});
const selectedQuestion = ref<number | undefined>(props.questions[0].id);
const searchValue = ref("");
const debouncedSearch = refDebounced(searchValue, 250);

const filteredQuestionList = computed(() => {
  let output: IQuestion[] = [];
  const searchValue = debouncedSearch.value?.trim();
  if (!searchValue) {
    output = props.questions;
  } else {
    output = props.questions.filter((item) => {
      return (
        item.authorName?.includes(debouncedSearch.value) ||
        item.title.includes(debouncedSearch.value) ||
        item.description.includes(debouncedSearch.value) ||
        item.labels.filter((label: ILabel) =>
          label.label.includes(debouncedSearch.value),
        ) ||
        item.answers.filter((answer: IAnswer) =>
          answer.text.includes(debouncedSearch.value),
        )
      );
    });
  }

  return output;
});

const unreadQuestionList = computed(() =>
  filteredQuestionList.value.filter((item) => !item.read),
);

const selectedQuestionData = computed(() => {
  if (props.questions.length !== 0) {
    return props.questions.find((item) => item.id === selectedQuestion.value);
  }
  return undefined;
});

const emit = defineEmits(["remove-question"]);

const removeQuestion = (id: number) => {
  emit("remove-question", id);
};
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup
      id="resize-panel-group-1"
      direction="horizontal"
      class="h-full max-h-[800px] items-stretch"
    >
      <ResizablePanel
        id="resize-panel-2"
        :default-size="defaultLayout[1]"
        :min-size="30"
      >
        <Tabs default-value="all">
          <div class="flex items-center px-4 py-2">
            <h1 class="text-xl font-bold">Форум</h1>
            <TabsList class="ml-auto">
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
      <ResizablePanel id="resize-panel-3" :default-size="defaultLayout[2]">
        <ForumDisplay
          :question="selectedQuestionData"
          @remove-question="removeQuestion"
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>
