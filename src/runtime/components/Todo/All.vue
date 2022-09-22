<template>
  <div class="relative h-full">
    <!-- ===========>> All Tasks Content <<=========== -->
    <div id="tasks-container " flex="~ col gap-5" w="full" snap="y"
      class="absolute top-0 bottom-0 right-0 left-0 h-98% px-2" overflow="auto">
      <!--  these r the sizes for  xs:305px sm:380px md:405px lg:490px xl:505px 2xl:580px 3xl:605px-->
      <h3 v-if="twoXs || xs || sm" flex="~" gap="2" text="xl secondaryOp dark:secondary" font="semibold">لديك {{ todoStore.getNotArchivedTasks.length }}
        <h3  v-if="todoStore.getNotArchivedTasks.length  > 1"> مهام </h3>
        <h3 v-else> مهمة </h3>
      </h3>

      <TransitionGroup>
        <TodoTask :BreakpointWindow="BreakpointWindow" :task="task" v-for="task in todoStore.getNotArchivedTasks"
          :key="task.id" snap="center" />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from "../../composables/useTodoStore";

const props = defineProps(["BreakpointWindow"]);

const { size, twoXs, xs, sm, md, lg, xl, twoXl } = props.BreakpointWindow;

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
