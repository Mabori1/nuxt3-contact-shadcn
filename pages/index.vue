<script setup lang="ts">
import { useSeoMeta, useState } from "nuxt/app";
import type { IUser } from "~/types/IUser";

useSeoMeta({
  title: "Контакты",
});

definePageMeta({
  middleware: ["auth", "guest"],
});

const user = useState<IUser>("user");
// if (!user) useRouter().push("/register");
</script>
<template>
  <div>
    {{ user && user.username }}
  </div>
</template>
