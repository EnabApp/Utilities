<template>
  <div>
    <UiInput
      m="y-20px"
      placeholder="اضافه مهمة ..."
      v-model="task"
      @keydown.enter="addTodo()"
    />
  </div>
</template>
<script setup>
import { useUser, useNuxtApp, ref } from "#imports";
import { useTodoStore } from "../../composables/useTodoStore";

const todoStore = useTodoStore();
const user = useUser();
const { $toast } = useNuxtApp();
const task = ref("");

//Add Todo Function
const addTodo = async () => {
  const taskData = {
    user_id: user.value.id,
    task: task.value,
    is_complete: false,
    inserted_at: new Date(),
  };
  await todoStore.addTask(taskData);

  task.value = "";
};

const props = defineProps({
  todo: Object,
});
</script>
