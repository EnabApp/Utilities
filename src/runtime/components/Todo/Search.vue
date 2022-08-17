<template>
  <div flex="~ col">
    <!-- ===========>> Search InPut Content <<=========== -->
    <UiInput m="y-20px" placeholder="ابحث هنا..." v-model="searchQuery" />
    <div
      v-if="searchQuery != ''"
      p="t-15px b-15px"
      flex="~ col gap-15px"
      w="full"
      bg="secondaryOp dark:Secondary opacity-10"
      rounded="5px"
      overflow="y-scroll"
      h="65px"
    >
      <div flex="~ col" w="full" justify="between" items="center">
        <TodoTask
          :task="task"
          v-for="task in searchedTodos"
          :key="task.id"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "#imports";
import { useTodoStore } from "../../composables/useTodoStore";

const todoStore = useTodoStore();
const searchQuery = ref("");

const props = defineProps({
  task: Object,
});

//========>> Search Todo Function <<========//
const searchedTodos = computed(() => {
  return todoStore.getArchivedTasks.filter((task) => {
    return task.task.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});
console.log(searchedTodos.value);
</script>
