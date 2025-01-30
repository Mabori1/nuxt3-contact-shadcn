<script setup lang="ts">
import { useRouter, useSeoMeta, useState } from "nuxt/app";
import type { IUser } from "~/types/IUser";
import { userLogout } from "~/composables/useAuth";

useSeoMeta({
  title: "Контакты",
});

const user = useState<IUser>("user");
if (!user) useRouter().push("/register");

const logout = userLogout;
</script>
<template>
  <div>
    {{ user && user.username }}
  </div>
</template>
