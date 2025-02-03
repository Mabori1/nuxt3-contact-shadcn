<script setup lang="ts">
import { useSeoMeta } from "nuxt/app";

useSeoMeta({
  title: "Форум",
});

definePageMeta({
  middleware: ["guest"],
});

const questions = await getQuestions();
console.log(questions.value);
</script>
<template>
  <div>
    <Forum :questions="questions ? questions : []" />
  </div>
</template>
