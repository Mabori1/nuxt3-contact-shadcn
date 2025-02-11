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
import { useForm } from "vee-validate";
import * as z from "zod";
import { toast } from "~/components/ui/toast";

useSeoMeta({
  title: "Авторизация",
});

const { fetch: refreshSession } = useUserSession();

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .email({
        message: "Must be a valid email",
      }),
    password: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .regex(passwordValidation, {
        message: "Your password is not valid",
      }),
  }),
);

const { isFieldDirty, handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  $fetch("/api/auth/login", {
    method: "post",
    body: values,
  })
    .then(async () => {
      await refreshSession();
      await navigateTo("/");
    })
    .catch(() =>
      toast({ variant: "destructive", title: "Неправильный логин или пароль" }),
    );
});

const router = useRouter();
const goToRegister = () => {
  router.push("/register");
};
</script>

<template>
  <div class="mx-4 flex h-screen items-center justify-center">
    <Card class="w-[450px]">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl"> Авторизация </CardTitle>
      </CardHeader>
      <CardContent class="grid gap-2">
        <form class="items-center space-y-6" @submit.prevent="onSubmit">
          <FormField
            v-slot="{ componentField }"
            name="email"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="mabori@example.com"
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="uP@22222 мин 8 символов"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex flex-col items-center gap-2">
            <Button @click="goToRegister" variant="link">Нет аккаунта?</Button>
            <div class="flex justify-center gap-4">
              <Button @click="resetForm"> Сброс </Button>
              <Button type="submit"> Авторизоваться </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
