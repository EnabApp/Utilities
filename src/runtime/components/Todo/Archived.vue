<template>
  <div m="t-5px" flex="~ col gap-30px" w="full" overflow="y-scroll" h="315px">
    <!-- ===========>> Todo Content <<=========== -->
    <TransitionGroup>
      <TodoTask :task="task" v-for="task in todoStore.getArchivedTasks" :key="task.id" />
    </TransitionGroup>
  </div>
</template>
<script setup>
import { useTodoStore } from "../../composables/useTodoStore";

const todoStore = useTodoStore();
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