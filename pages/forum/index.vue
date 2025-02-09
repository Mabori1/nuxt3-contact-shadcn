<script setup lang="ts">
import { ReloadIcon } from "@radix-icons/vue";
import type { IQuestion } from "~/types/IQuestion";

definePageMeta({
  title: "Форум",
});

definePageMeta({
  middleware: ["guest"],
});

const { data: questions } = useNuxtData<IQuestion[]>("questions");

onMounted(async () => {
  questions.value = await useQuestions();
  await refreshNuxtData("questions");
});

// watch(questions, async (newQuestion, oldQuestion) => {
//   if (newQuestion.length !== oldQuestion.length) {
//     useCountQuestions().value = questions.value.length;
//   }
// });

async function deleteQuestion(id: number) {
  await removeQuestion(id);
  await refreshNuxtData("questions");
}
</script>
<template>
  <div class="flex h-full items-center justify-center">
    <ReloadIcon v-if="!questions" class="mt-20 size-14 animate-spin" />
    <ForumEmpty v-else-if="questions.length === 0" />
    <Forum v-else :questions="questions" @remove-question="deleteQuestion" />
  </div>
</template>
