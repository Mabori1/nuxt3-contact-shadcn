<script setup lang="ts"></script>
<template>
  <div
    class="dark:bg-darktheme grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <MySidebar />
    <div class="flex flex-col">
      <Header />
      <slot />
    </div>
  </div>
</template>
