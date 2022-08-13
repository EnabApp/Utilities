<template>
  <!-- ===========>> Remove Botton Content <<=========== -->
  <UiButton
    id="markHover"
    duration="250"
    w="70px"
    title="حذف"
    color="error"
    :loading="false"
    @click="removeTask(todo)"
  />
</template>

<script setup>
import { useTodoStore } from "../../composables/useTodoStore";

const todoStore = useTodoStore();

//Remove Todo Function
const removeTask = async () => {
  await todoStore.deleteTask(todo);
};
const props = defineProps({
  todo: Object,
});
</script>
