<template>
  <div flex="~ col">
    <!-- ========>> Search Input Content <<======== -->
    <UiInput m="y-20px" placeholder="ابحث.." v-model="searchQuery" />
    <!-- ===========>> All Tasks Content <<=========== -->
    <div m="t-5px" p="b-15px">
      <div
        flex="~ col gap-28px"
        w="full"
        h="100"
        overflow="y-scroll"
        snap="y" 
      >
        <!-- ===========>> Todo Content <<=========== -->
        <TransitionGroup>
          <TodoTask
            :BreakpointWindow="BreakpointWindow"
            :task="task"
            v-for="task in searchedTodos"
            :key="task.id"
            snap="center"
          />
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTodoStore } from "../../composables/useTodoStore";
import { ref, computed } from "#imports";

const todoStore = useTodoStore();
const searchQuery = ref("");

const props = defineProps({
  task: {
    type: Object,
  },
  BreakpointWindow: {
    type: Object,
  },
});

const { size, twoXs, xs, sm, md, lg, xl, twoXl } = props.BreakpointWindow;

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
