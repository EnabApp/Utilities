<template>
  <div h="full">
    <!-- ===========>> All Tasks Content <<=========== -->
    <div
      flex="~ col gap-28px"
      w="full"
      snap="y"
      overflow="y-scroll"
      :class="{
        'h-25.5rem': twoXs,
        'h-26.6875rem': xs,
        'h-26.75rem': sm,
        'h-27.3125rem': md,
        'h-30.625rem': lg,
        'h-31.5626rem': xl,
        'h-45rem': twoXl,
      }"
    >
      <!--  these r the sizes for  xs:305px sm:380px md:405px lg:490px xl:505px 2xl:580px 3xl:605px-->
      <TransitionGroup>
        <TodoTask
          :BreakpointWindow="BreakpointWindow"
          :task="task"
          v-for="task in todoStore.getNotArchivedTasks"
          :key="task.id"
          snap="center"
        />
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
