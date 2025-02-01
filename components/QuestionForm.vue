<script setup lang="ts">
import type { IQuestion, IQuestionPost } from "~/types/IQuestion";

definePageMeta({
  middleware: "auth",
});

interface Props {
  data: IQuestionPost;
  endpoint?: String;
}

const props = defineProps<Props>();
const data = props.data;
const router = useRouter();

async function postQuestion() {
  const { data: question } = await useFetch<IQuestion>(
    () => `${props.endpoint}`,
    { method: "post", body: { data }, pick: ["id"] },
  );

  router.push(`/forum/question/${question.value?.id}`);
}
</script>
<template>
  <div></div>
</template>
