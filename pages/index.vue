<script setup lang="ts">
import { useSeoMeta } from "nuxt/app";

useSeoMeta({
  title: "Контакты",
});

const { user } = useUserSession();
</script>
<template>
  <div>
    <h1 class="text-3xl">Home {{ user ? user.username : "Guest" }}</h1>
  </div>
</template>
