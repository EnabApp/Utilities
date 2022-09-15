<template>
  <!-- Application -->
  <div flex="~ col grow gap-2" ref="windowRef">
    <UiTabGroup
      v-if="!(twoXl || xl || lg || md)"
      p="x-20px"
      text="21px"
      :col="false"
      :tabs="['جميع المهام', 'المؤرشفة']"
      h="90%"
    >
      <template #tab-1 h="full"
        ><div flex="~ col" h="full">
          <TodoAdd />
          <TodoAll :BreakpointWindow="BreakpointWindow" />
        </div>
      </template>
      <!-- =========>> End Template <<========= -->
      <template #tab-2 h="full">
        <div flex="~ col" h="full">
          <TodoArchived :BreakpointWindow="BreakpointWindow" />
        </div>
      </template>
    </UiTabGroup>

    <div v-if="twoXl || xl || md || lg" grid="~ cols-2 gap-30px" p="x-5" h="full">
      <div flex="~ col" class=" h-full">
        <div text="2xl secondaryOp dark:secondary" font="semibold">
          جميع المهام
        </div>
        <TodoAdd />
        <TodoAll :BreakpointWindow="BreakpointWindow" />
      </div>
      <div flex="~ col" class=" h-full">
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
