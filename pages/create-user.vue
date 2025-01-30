<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-icons/vue";
import { Calendar2 } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
  type DateValue,
} from "@internationalized/date";
import { h } from "vue";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { toDate } from "radix-vue/date";

useSeoMeta({
  title: "Создание контакта",
});

const { toast } = useToast();
const df = new DateFormatter("ru-RU", {
  dateStyle: "long",
});
const placeholder = ref();
const notificationsFormSchema = toTypedSchema(
  z.object({
    dob: z
      .string()
      .refine((v) => v, { message: "Поле даты рождения обязательно." }),
  }),
);

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: notificationsFormSchema,
  initialValues: {},
});
const value = computed({
  get: () => (values.dob ? parseDate(values.dob) : undefined),
  set: (val) => val,
});

const onSubmit = handleSubmit((values) => {
  toast({
    class: cn("top-4 right-1/2 flex fixed w-30"),
    title: "Uh oh! Something went wrong.",
    description: "ldldls",
  });
  // toast({
  //   title: "You submitted the following values:",
  //   description: h(
  //     "pre",
  //     { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
  //     h("code", { class: "text-white" }, JSON.stringify(values, null, 2)),
  //   ),
  // });
});
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <Card class="w-[450px]">
      <CardHeader>
        <CardTitle>Форма создания контакта </CardTitle>
      </CardHeader>
      <CardContent>
        <form class="space-y-8" @submit="onSubmit">
          <FormField name="dob">
            <FormItem class="flex flex-col">
              <FormLabel>Дата рождения</FormLabel>
              <Popover>
                <PopoverTrigger as-child>
                  <FormControl>
                    <Button
                      variant="outline"
                      :class="
                        cn(
                          'w-[240px] ps-3 text-start font-normal',
                          !value && 'text-muted-foreground',
                        )
                      "
                    >
                      <span>{{
                        value ? df.format(toDate(value)) : "Выберите дату"
                      }}</span>
                      <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                    </Button>
                    <input hidden />
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar2
                    v-model:placeholder="placeholder"
                    v-model="value"
                    calendar-label="Дата рождения"
                    initial-focus
                    locale="ru"
                    :min-value="new CalendarDate(1900, 1, 1)"
                    :max-value="today(getLocalTimeZone())"
                    @update:model-value="
                      (v: DateValue | undefined) => {
                        if (v) {
                          setFieldValue('dob', v.toString());
                        } else {
                          setFieldValue('dob', undefined);
                        }
                      }
                    "
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit"> Submit </Button>
        </form>
      </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6">
        <Button variant="outline"> Cancel </Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  </div>
</template>
