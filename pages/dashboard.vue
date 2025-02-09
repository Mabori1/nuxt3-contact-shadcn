<script setup lang="ts">
useSeoMeta({
  title: "Dashboard",
});
definePageMeta({
  middleware: ["guest"],
});
</script>
<template>
  <div>Welcome dashboard</div>
</template>
