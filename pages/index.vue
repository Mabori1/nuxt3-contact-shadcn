<script setup lang="ts">
import { useSeoMeta, useState } from "nuxt/app";
import type { IUser } from "~/types/IUser";
import { accounts, mails } from "../components/forum/data/mails";

useSeoMeta({
  title: "Контакты",
});

definePageMeta({
  middleware: ["auth", "guest"],
});

const user = useState<IUser>("user");
</script>
<template>
  <div>
    <Forum :accounts="accounts" :mails="mails" :nav-collapsed-size="4" />
  </div>
</template>
