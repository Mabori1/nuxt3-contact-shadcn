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

const { loggedIn, user, fetch: refreshSession } = useUserSession();

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

const formSchema = toTypedSchema(
  z
    .object({
      username: z
        .string()
        .min(2, { message: "Must have at least 1 character" })
        .max(50, { message: "Must have at more 50 character" }),
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
      confirmPassword: z.string().min(8),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirmPassword"],
        });
      }
    }),
);

const { isFieldDirty, handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  // await registerWithEmail(values);
  $fetch("/api/auth/register", {
    method: "POST",
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
</script>

<template>
  <div class="mx-4 flex h-screen items-center justify-center">
    <Card class="w-[450px]">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl"> Регистрация </CardTitle>
      </CardHeader>
      <CardContent class="grid gap-2">
        <form class="items-center space-y-6" @submit="onSubmit">
          <FormField
            v-slot="{ componentField }"
            name="username"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Mabori"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

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

          <FormField
            v-slot="{ componentField }"
            name="confirmPassword"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="повторите пароль"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div class="flex flex-col items-center gap-2">
            <Button @click="useRouter().push('/login')" variant="link"
              >Есть аккаунт?</Button
            >
            <div class="flex justify-center gap-4">
              <Button @click="resetForm"> Сброс </Button>
              <Button type="submit"> Создать </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
