<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toTypedSchema } from "@vee-validate/zod";
import { ArrowLeft, Backpack, CornerDownLeft, Eraser } from "lucide-vue-next";
import { useForm } from "vee-validate";
import * as z from "zod";
import type { IQuestionPost } from "~/types/IQuestion";

definePageMeta({
  middleware: "guest",
});

const data: IQuestionPost = reactive({
  title: "",
  description: "",
});

const endpoint = "/api/forum/ask";

const formSchema = toTypedSchema(
  z.object({
    title: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .max(50, { message: "Must have at more 50 character" }),
    description: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .max(300, { message: "Must have at more 300 character" }),
  }),
);

const { isFieldDirty, handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  //await loginWithEmail(values);
});

const router = useRouter();
const goToRegister = () => {
  router.push("/register");
};
</script>

<template>
  <div class="mx-4 flex h-screen items-center justify-center">
    <Card class="h-1/2 w-1/2">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl"> Создание темы форума </CardTitle>
      </CardHeader>
      <CardContent class="grid gap-2">
        <form class="items-center space-y-6" @submit="onSubmit">
          <FormField
            v-slot="{ componentField }"
            name="email"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Тема</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Тема форума"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            name="password"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <div
                  class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                >
                  <Label for="message" class="sr-only"> Message </Label>
                  <Textarea
                    id="message"
                    placeholder="Описание темы форума..."
                    class="min-h-32 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                    v-bind="componentField"
                  />
                  <div class="flex items-center gap-2.5 p-3 pt-0">
                    <Button
                      @click="$router.back()"
                      class="ml-auto mt-1 gap-1.5"
                    >
                      Отмена
                      <ArrowLeft class="size-3.5" />
                    </Button>
                    <Button @click="resetForm" class="mx-3 mt-1 gap-1.5">
                      Сброс
                      <Eraser class="size-3.5" />
                    </Button>
                    <Button type="submit" size="sm" class="mr-3 mt-1 gap-1.5">
                      Сохранить
                      <CornerDownLeft class="size-3.5" />
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
