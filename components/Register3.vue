<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { h } from "vue";
import * as z from "zod";

const isLogin = ref(true);

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

const loginSchema = toTypedSchema(
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

const registerSchema = toTypedSchema(
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

function onSubmit(values: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2)),
    ),
  });
}

function onLogin(values: { email: string; password: string }) {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2)),
    ),
  });
}
</script>

<template>
  <Form
    v-slot="{ handleSubmit, resetForm }"
    as=""
    keep-values
    :validation-schema="isLogin ? loginSchema : registerSchema"
  >
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline">
          {{ isLogin ? "Login" : "Register" }}
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ isLogin ? "Login" : "Register" }}</DialogTitle>
        </DialogHeader>

        <form
          id="dialogForm"
          @submit="handleSubmit($event, isLogin ? onLogin : onSubmit)"
        >
          <FormField
            v-if="!isLogin"
            v-slot="{ componentField }"
            name="username"
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

          <FormField v-slot="{ componentField }" name="email">
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

          <FormField v-slot="{ componentField }" name="password">
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
            v-if="!isLogin"
            v-slot="{ componentField }"
            name="confirmPassword"
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
        </form>

        <DialogFooter>
          <div class="flex flex-col items-center justify-center">
            <Button variant="link" @click="isLogin = !isLogin">
              {{
                isLogin ? "Don't have an account?" : "Do you have an account?"
              }}
            </Button>
            <div class="flex gap-4">
              <Button @click="resetForm"> Reset </Button>
              <Button type="submit" form="dialogForm">
                {{ isLogin ? "Login" : "Register" }}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>
