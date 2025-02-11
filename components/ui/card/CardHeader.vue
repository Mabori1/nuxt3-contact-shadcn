<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="cn('flex items-center justify-between gap-y-0.5 p-2', props.class)"
  >
    <slot />
  </div>
</template>
