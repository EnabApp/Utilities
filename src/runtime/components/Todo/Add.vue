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
import { useUser, ref, useMoment } from "#imports";
import { useTodoStore } from "../../composables/useTodoStore";

const todoStore = useTodoStore();
const user = useUser();
const task = ref("");
const moment = useMoment();
let AddedDate = moment(new Date()).format("HH:mm:ss DD-MM-YYYY")
const props = defineProps({
  task: Object,
});
//=========>> Add Todo Function <<=========//
const addTodo = async () => {
  const taskData = {
    user_id: user.value.id,
    task: task.value,
    is_complete: false,
    inserted_at: AddedDate,
  };
  await todoStore.addTask(taskData);
  task.value = "";
};
</script>
