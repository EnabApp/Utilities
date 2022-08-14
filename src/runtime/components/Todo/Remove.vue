<template>
  <!-- ===========>> Remove Botton Content <<=========== -->
  <UiButton
    id="markHover"
    duration="250"
    w="70px"
    title="حذف"
    color="error"
    :loading="false"
    @click="removeTask()"
  />
</template>

<script setup>
import { useTodoStore } from "../../composables/useTodoStore";

const todoStore = useTodoStore();
const tasks = todoStore.tasks;

</script>
