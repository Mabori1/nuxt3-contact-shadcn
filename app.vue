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
    <NuxtLoadingIndicator
      :color="`repeating-linear-gradient(to right, #ee6c4d, red`"
      :height="4"
    />
    <Toaster />
    <NuxtPage />
  </NuxtLayout>
</template>
