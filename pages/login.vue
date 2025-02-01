<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";
import * as z from "zod";

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
  await loginWithEmail(values);

  // toast({
  //   title: "You submitted the following values:",
  //   description: h(
  //     "pre",
  //     { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
  //     h("code", { class: "text-white" }, JSON.stringify(values, null, 2)),
  //   ),
  // });
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
        <form class="items-center space-y-6" @submit="onSubmit">
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
