<script setup lang="ts">
definePageMeta({
  title: "Контакты",
  pageTransition: {
    name: "rotate",
  },
});

const { user } = useUserSession();
</script>
<template>
  <div>
    <h1 class="text-3xl">Home {{ user ? user.username : "Guest" }}</h1>
  </div>
</template>
