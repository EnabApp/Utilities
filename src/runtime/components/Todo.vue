<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      <div flex="~ col grow gap-2" ref="windowRef">
        <UiTabGroup
          v-if="!(twoXl || xl || lg || md)"
          p="x-20px"
          text="21px "
          :col="false"
          :tabs="['جميع المهام', 'المؤرشفة']"
        >
          <template #tab-1>
            <div flex="~ col">
              <TodoAdd />
              <TodoAll :BreakpointWindow="BreakpointWindow" />
            </div>
          </template>
          <!-- =========>> End Template <<========= -->
          <template #tab-2>
            <div flex="~ col">
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
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
import { useTodoStore } from "../composables/useTodoStore";
import { useBreakpointWindow } from "#imports";

const windowRef = ref(null);

const BreakpointWindow = useBreakpointWindow(windowRef);

const { size, twoXs, xs, sm, md, lg, xl, twoXl } = BreakpointWindow;
var n = 1530.345;
console.log(n.toLocaleString() , ".toLocaleString() find me in TODO");
const todoStore = useTodoStore();
todoStore.fetchTasks();

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});
</script>
