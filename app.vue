<script setup lang="ts">
import type { IUser } from "./types/IUser";

const nuxtApp = useNuxtApp();
nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});

useState("hideSidebar", () => false);
const user: IUser = await useUser();
if (!user) useRouter().push("/login");
</script>
<template>
  <!-- <NuxtRouteAnnouncer /> -->
  <NuxtLayout>
    <Toaster />
    <NuxtPage />
  </NuxtLayout>
</template>
