<script setup lang="ts">
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@vueuse/core";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Bell,
  Home,
  LineChart,
  MessageCircleQuestion,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-vue-next";
import { CaretSortIcon } from "@radix-icons/vue";

const isMobile = useMediaQuery("(max-width: 768px)");
const hideSidebar = useHideSidebar();
onMounted(() => {
  hideSidebar.value = isMobile.value;
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
          <span class="">Контакты </span>
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
          <a
            href="#"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <ShoppingCart class="h-4 w-4" />
            Orders
            <Badge
              class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            >
              6
            </Badge>
          </a>
          <a
            href="#"
            class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
          >
            <Package class="h-4 w-4" />
            Products
          </a>
          <Collapsible v-model:open="isOpen" class="ml-2 w-[150px]">
            <div
              class="relative ml-2 flex items-center justify-between space-x-4 pl-3"
            >
              <CollapsibleTrigger as-child>
                <Button variant="ghost" size="sm" class="flex w-9 p-0">
                  <CaretSortIcon class="mr-2 h-4 w-4" />
                  <span
                    class="text-muted-foreground transition-all hover:text-primary"
                    >Форум</span
                  >
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent class="space-y-1">
              <a
                href="/forum"
                class="ml-1 flex items-center gap-3 rounded-lg pl-2 text-muted-foreground transition-all hover:text-primary"
              >
                <MessageCircleQuestion class="h-4 w-4" />
                Все темы
              </a>
              <a
                href="/forum/ask"
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
