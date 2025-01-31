<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { userLogout } from "~/composables/useAuth";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  SunMoon,
  Users,
} from "lucide-vue-next";
import type { IUser } from "~/types/IUser";

type Theme = "light" | "dark";

const setColorScheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme;
};

const user = useState<IUser>("user");
const logout = userLogout;

const hideSidebar = useHideSidebar();
function toggleSidebar() {
  hideSidebar.value = !hideSidebar.value;
}
</script>

<template>
  <header
    class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
  >
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center">
        <PanelLeft @click="toggleSidebar" />
        <Separator orientation="vertical" class="mx-4 h-8" />
      </div>
      <div class="w-full flex-1">
        <form>
          <div class="relative">
            <Search
              class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search contacts..."
              class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
    </div>
    <SunMoon
      class="h-5 w-5 hover:scale-150"
      @click="
        setColorScheme($colorMode.preference == 'dark' ? 'light' : 'dark')
      "
    />
    <h3 class="text-nowrap">Welcome, {{ user ? user.username : "Guest" }}</h3>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="secondary"
          size="icon"
          class="rounded-full hover:scale-125"
        >
          <CircleUser class="h-5 w-5" />
          <span class="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>
