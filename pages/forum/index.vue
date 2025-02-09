<script setup lang="ts">
import { useSeoMeta } from "nuxt/app";

useSeoMeta({
  title: "Форум",
});

definePageMeta({
  middleware: ["guest"],
});

const { data: questions } = useNuxtData("questions");

onMounted(async () => {
  await getQuestions();
});

watch(questions, async (newQuestion, oldQuestion) => {
  if (newQuestion.length !== oldQuestion.length) {
    useCountQuestions().value = questions.value.length;
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
