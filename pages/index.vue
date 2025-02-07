<script setup lang="ts">
import { useSeoMeta } from "nuxt/app";

useSeoMeta({
  title: "Контакты",
});

const { user, loggedIn } = useUserSession();
console.log(user.value, loggedIn.value);
</script>
<template>
  <div>
    <h1 class="text-3xl">Home {{ user ? user.username : "Guest" }}</h1>
  </div>
</template>
