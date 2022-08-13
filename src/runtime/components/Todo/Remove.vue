<template>
  <!-- ===========>> Remove Botton Content <<=========== -->
  <UiButton
    id="markHover"
    duration="250"
    w="70px"
    title="حذف"
    color="error"
    :loading="false"
    @click="removeTask(id)"
  />
</template>

<script setup>
import { useTodoStore } from "../../composables/useTodoStore";
import { useSupabaseClient } from "#imports";

const supabase = useSupabaseClient();
const todoStore = useTodoStore();

//Remove Todo Function
const removeTask = async (id) => {
  await todoStore.removeTask(id);
};
</script>
