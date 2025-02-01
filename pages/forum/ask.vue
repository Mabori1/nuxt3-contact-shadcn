<script setup lang="ts">
import type { IQuestionPost } from "~/types/IQuestion";

definePageMeta({
  middleware: "auth",
});

const data: IQuestionPost = reactive({
  title: "",
  description: "",
});

const endpoint = "/api/forum/ask";
</script>

<template>
  <div></div>
</template>
