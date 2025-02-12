<script setup lang="ts">
const questions = useState<IQuestion[]>("questions");
questions.value = await getQuestions();
</script>
<template>
  <div class="dark:bg-darktheme mx-auto flex min-h-screen max-w-7xl">
    <MySidebar />
    <div class="flex w-full flex-col">
      <Header />
      <slot />
    </div>
  </div>
</template>
