<script lang="ts" setup>
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import type { IQuestion } from "~/types/IQuestion";

interface QuestionListProps {
  items: IQuestion[];
}

defineProps<QuestionListProps>();
const selectedQuestion = defineModel<number>("selectedQuestion", {
  required: false,
});

const { user, fetch: refreshSession } = useUserSession();

function getBadgeVariantFromLabel(tag: string) {
  if (["Работа".toLowerCase()].includes(tag.toLowerCase())) return "default";

  if (["Хобби".toLowerCase()].includes(tag.toLowerCase())) return "destructive";

  return "secondary";
}
function formatTags(tag: string) {
  return tag.trim().split(",");
}

async function toggleReadQuestion(id: number) {
  if (!user.value?.readed.includes(id)) {
    await readToggleQuestion(id);
    await refreshSession();
    console.log("yes");
  }
}

const focusTimer = ref<NodeJS.Timeout | null>(null);

const handleFocus = (question: IQuestion) => {
  focusTimer.value = setTimeout(() => {
    toggleReadQuestion(question.id);
  }, 3000);
};

const handleBlur = () => {
  if (focusTimer.value) {
    clearTimeout(focusTimer.value);
    focusTimer.value = null;
  }
};
</script>

<template>
  <ScrollArea class="flex h-screen">
    <div v-if="items.length === 0" class="text-center text-2xl">
      Нет тем форума
    </div>
    <div v-else class="flex flex-1 flex-col gap-2 p-4 pt-0">
      <TransitionGroup name="list" :key="items.length" appear>
        <button
          v-for="item of items"
          :key="item.id"
          :class="
            cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              selectedQuestion === item.id && 'bg-muted',
            )
          "
          @click="selectedQuestion = item.id"
          @focus="handleFocus(item)"
          @blur="handleBlur"
        >
          <div class="flex w-full flex-col gap-1">
            <div class="flex items-center">
              <div class="flex items-center gap-2">
                <div class="font-semibold">
                  {{ item.authorName }}
                </div>
                <span
                  v-if="!user?.readed.includes(item.id)"
                  class="flex h-2 w-2 rounded-full bg-blue-600"
                />
              </div>
              <div
                :class="
                  cn(
                    'ml-auto text-xs',
                    selectedQuestion === item.id
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                  )
                "
              >
                {{
                  formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                    locale: ru,
                  })
                }}
              </div>
            </div>

            <div class="text-xs font-medium">
              {{ item.title }}
            </div>
          </div>
          <div class="line-clamp-2 text-xs text-muted-foreground">
            {{ item.description.substring(0, 300) }}
          </div>
          <div class="flex items-center gap-2">
            <Badge
              v-for="(tag, idx) of formatTags(item.tags)"
              :key="`tag${idx}`"
              :variant="getBadgeVariantFromLabel(tag)"
            >
              {{ tag }}
            </Badge>
          </div>
        </button>
      </TransitionGroup>
    </div>
  </ScrollArea>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.list-leave-active {
  position: absolute;
}
</style>
