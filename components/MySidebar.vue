<script setup lang="ts">
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-icons/vue";
import { useMediaQuery } from "@vueuse/core";
import {
  Bell,
  Home,
  LineChart,
  MessageCircleQuestion,
  Package2,
  Users,
} from "lucide-vue-next";
import type { IQuestion } from "~/types/IQuestion";

const isMobile = useMediaQuery("(max-width: 768px)");
const hideSidebar = useHideSidebar();
onMounted(() => {
  hideSidebar.value = isMobile.value;
});

const questions = useState<IQuestion[]>("questions");
const countQuestions = ref<number | undefined>(questions.value?.length);

watch(questions, () => {
  countQuestions.value = questions.value?.length;
});

const isOpen = ref(false);
</script>
<template>
  <div
    :class="`left-0 top-14 h-screen overflow-hidden border-r transition-[width] duration-300 ease-in-out max-sm:absolute sm:bg-muted/40 ${hideSidebar ? 'w-0' : 'w-56 sm:w-48 lg:w-64'}`"
  >
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-12 items-center border-b px-4 lg:h-14 lg:px-6">
        <a href="/" class="flex items-center gap-2 font-semibold">
          <Package2 class="h-6 w-6" />
          <span class=""> CRM </span>
        </a>
        <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
          <Bell class="h-4 w-4" />
          <span class="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <a
            href="/dashboard"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Home class="h-4 w-4" />
            Dashboard
          </a>
          <Collapsible v-model:open="isOpen" class="w-full">
            <CollapsibleTrigger as-child>
              <Button
                variant="ghost"
                size="sm"
                :class="`ml-2 flex w-full justify-start pl-1 text-muted-foreground transition-all hover:text-primary ${useRoute().path === '/forum' && 'bg-muted text-primary'}`"
              >
                <CaretSortIcon class="mr-2 h-4 w-4" />
                <span class="">Форум</span>

                <Badge
                  v-if="countQuestions"
                  class="ml-auto flex size-5 items-center justify-center rounded-full"
                >
                  {{ countQuestions }}
                </Badge>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent class="ml-4 space-y-2">
              <a
                href="/forum"
                class="ml-1 mt-2 flex items-center gap-3 rounded-lg pl-2 text-muted-foreground transition-all hover:text-primary"
              >
                <MessageCircleQuestion class="h-4 w-4" />
                Все темы
              </a>
              <a
                href="/forum/create"
                class="ml-1 flex items-center gap-3 rounded-lg pl-2 text-muted-foreground transition-all hover:text-primary"
              >
                <MessageCircleQuestion class="h-4 w-4" />
                Создать тему
              </a>
              <a
                href="#"
                class="ml-1 flex items-center gap-3 rounded-lg pl-2 text-muted-foreground transition-all hover:text-primary"
              >
                <MessageCircleQuestion class="h-4 w-4" />
                Поиск тем
              </a>
              <Separator />
            </CollapsibleContent>
          </Collapsible>
          <a
            href="#"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Users class="h-4 w-4" />
            Customers
          </a>
          <a
            href="#"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <LineChart class="h-4 w-4" />
            Analytics
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
