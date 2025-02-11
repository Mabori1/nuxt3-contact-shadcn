<script lang="ts" setup>
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
</script>

<template>
  <div class="relative">
    <Button
      @click="navigateTo('/forum/create')"
      class="absolute right-[45%] top-[20%] z-10"
      >Добавить тему</Button
    >
    <TooltipProvider :delay-duration="0" class="border border-white p-14">
      <ResizablePanelGroup
        id="resize-panel-group-1"
        direction="horizontal"
        class="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel id="resize-panel-2" :min-size="30">
          <ScrollArea class="mt-8 flex h-screen">
            <div class="text-center text-2xl">Нет тем форума</div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle id="resiz-handle-2" with-handle />
        <ResizablePanel id="resize-panel-3">
          <div class="mt-8 h-auto text-center text-2xl">
            Нет темы для отображения
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  </div>
</template>
