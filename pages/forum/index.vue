<script setup lang="ts">
import { ReloadIcon } from "@radix-icons/vue";
import type { IQuestion } from "~/types/IQuestion";

useSeoMeta({
  title: "Форум",
});

definePageMeta({
  middleware: ["guest"],
});

const questions = useState<IQuestion[]>("questions");

onMounted(async () => {
  questions.value = await getQuestions();
});
</script>
<template>
  <div v-if="!questions" class="flex h-full items-center justify-center">
    <ReloadIcon class="mt-20 size-14 animate-spin" />
  </div>
  <ForumEmpty v-else-if="questions.length === 0" />
  <Forum v-else />
</template>
