<template>
  <div flex="~ col">
    <!-- ========>> Search Input Content <<======== -->
    <UiInput m="y-20px" placeholder="ابحث هنا..." v-model="searchQuery" />

    <div
      m="t-5px"
      flex="~ col gap-28px"
      w="full"
      overflow="y-scroll"
      h="315px 3xl:350px"
      p="b-15px"
      snap="y"
    >
      <!-- ===========>> Todo Content <<=========== -->
      <TransitionGroup>
        <TodoTask
          :task="task"
          v-for="task in searchedTodos"
          :key="task.id"
          snap="center"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
<script setup>
import { useTodoStore } from "../../composables/useTodoStore";
import { ref, computed } from "#imports";

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
</script>

<style scoped>
/* CLOSE TRANSITION */
.v-enter-active {
  animation: translate 0.3s;
}
.v-leave-active {
  animation: translate 0.3s reverse;
}

@keyframes translate {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
