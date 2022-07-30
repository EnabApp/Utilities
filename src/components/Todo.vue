<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      <!-- I couldn't change the hight -->
      <UiInput m="4" p="2" v-model="task" placeholder="ابحث هنا..." />
      <!-- <TodoTodoList /> -->
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
let task = ref(null);
const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});
watch(task, (val) => {
  localStorage.setItem("task", val);
});
onMounted(() => {
  task.value = localStorage.getItem("task") || "";
});
const getApp = props.app.getSubApp(1);
</script>
