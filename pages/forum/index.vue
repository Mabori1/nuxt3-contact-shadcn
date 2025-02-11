<script setup lang="ts">
import { ReloadIcon } from "@radix-icons/vue";
import type { IQuestion } from "~/types/IQuestion";

useSeoMeta({
  title: "Форум",
});

definePageMeta({
  middleware: ["guest"],
});

const { data: questions } = useNuxtData<IQuestion[]>("questions");

onMounted(async () => {
  questions.value = await getQuestions();
  await refreshNuxtData("questions");
});

async function deleteQuestion(id: number) {
  await removeQuestion(id);
  if (questions.value)
    questions.value = questions.value?.filter((q) => q.id !== id);
  await refreshNuxtData("questions");
}
</script>
<template>
  <div v-if="!questions" class="flex h-full items-center justify-center">
    <ReloadIcon class="mt-20 size-14 animate-spin" />
  </div>
  <ForumEmpty v-else-if="questions.length === 0" />
  <Forum v-else :questions="questions" @remove-question="deleteQuestion" />
</template>
