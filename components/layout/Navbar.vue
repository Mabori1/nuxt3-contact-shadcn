<script setup lang="ts">
type Theme = "light" | "dark";

const setColorTheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme;
};
</script>
<template>
  <div>
    <Button
      @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')"
      >Click me</Button
    >
  </div>
</template>

<style scoped></style>
