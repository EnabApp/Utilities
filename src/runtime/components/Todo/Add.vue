<template>
  <div>
    <UiInput
      m="y-20px"
      placeholder="اضافة مهمة"
      v-model="task"
      @keydown.enter="addTodo()"
    />
  </div>
</template>
<script setup>
import { useUser, ref } from "#imports";
import { useTodoStore } from "../../composables/useTodoStore";

const props = defineProps({
  task: Object,
});

const todoStore = useTodoStore();
const user = useUser();
const task = ref("");
const moment = useMoment();

//=========>> Add Todo Function <<=========//
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
</script>
