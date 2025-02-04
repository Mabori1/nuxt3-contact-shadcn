<script setup lang="ts">
import { useSeoMeta, useState } from "nuxt/app";
import type { IUser } from "~/types/IUser";

useSeoMeta({
  title: "Контакты",
});

const user = useState<IUser>("user");
</script>
<template>
  <div>
    <h1 class="text-3xl">Home {{ user.username ? user.username : "Guest" }}</h1>
  </div>
</template>
