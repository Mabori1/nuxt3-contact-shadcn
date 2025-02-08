<script setup lang="ts">
const nuxtApp = useNuxtApp();
nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});

useState("hideSidebar", () => false);
useUserSession();
</script>
<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <Toaster />
    <NuxtPage />
  </NuxtLayout>
</template>
