<script setup lang="ts">
const { data: questions } = useNuxtData<IQuestion[]>("questions");
questions.value = await getQuestions();
</script>
<template>
  <div class="dark:bg-darktheme flex min-h-screen w-full">
    <MySidebar />
    <div class="flex w-full flex-col">
      <Header />
      <slot />
    </div>
  </div>
</template>
