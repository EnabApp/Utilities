<template>
  <!-- Application -->
  <div flex="~ col grow gap-2" ref="windowRef">
    <UiTabGroup
      v-if="!(twoXl || xl || lg || md)"
      p="x-20px"
      text="21px "
      :col="false"
      :tabs="['جميع المهام', 'المؤرشفة']"
    >
      <template #tab-1
        ><div flex="~ col" overflow="y-scroll">
          <TodoAdd />
          <TodoAll :BreakpointWindow="BreakpointWindow" />
        </div>
      </template>
      <!-- =========>> End Template <<========= -->
      <template #tab-2>
        <div flex="~ col" overflow="y-scroll">
          <TodoArchived :BreakpointWindow="BreakpointWindow" />
        </div>
      </template>
    </UiTabGroup>

    <div v-if="twoXl || xl || md || lg" grid="~ cols-2 gap-30px" p="x-5">
      <div flex="~ col">
        <div text="2xl secondaryOp dark:secondary" font="semibold">
          جميع المهام
        </div>
        <TodoAdd />
        <TodoAll :BreakpointWindow="BreakpointWindow" />
      </div>
      <div flex="~ col">
        <div text="2xl secondaryOp dark:secondary" font="semibold">
          المهام المؤرشفة
        </div>
        <TodoArchived :BreakpointWindow="BreakpointWindow" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "../../composables/useTodoStore";
import { useBreakpointWindow, ref } from "#imports";

const windowRef = ref(null);
const BreakpointWindow = useBreakpointWindow(windowRef);
const { size, twoXs, xs, sm, md, lg, xl, twoXl } = BreakpointWindow;

const todoStore = useTodoStore();
todoStore.fetchTasks();
const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});
</script>
