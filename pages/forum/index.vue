<script setup lang="ts">
import { useSeoMeta } from "nuxt/app";
import type { IQuestion } from "~/types/IQuestion";

useSeoMeta({
  title: "Форум",
});

definePageMeta({
  middleware: ["guest"],
});
const questions = ref<IQuestion[]>([]);

onMounted(async () => {
  questions.value = await getQuestions();
});

watch(questions, async (newQuestion, oldQuestion) => {
  if (newQuestion.length !== oldQuestion.length) {
    questions.value = await getQuestions();
  }
});

async function deleteQuestion(id: number) {
  await removeQuestion(id);
  questions.value = await getQuestions();
}
</script>
<template>
  <div>
    <ForumEmpty v-if="!questions?.length" />
    <Forum v-else :questions="questions" @remove-question="deleteQuestion" />
  </div>
</template>
