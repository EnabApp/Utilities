<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      <div flex="~ col grow gap-2" ref="windowRef">
        <UiTabGroup
          p="x-20px"
          text="21px "
          :col="false"
          :tabs="['جميع المهام', 'المؤرشفة']"
        >
          <template #tab-1>
            <div flex="~ col">
              <TodoAdd />
              <TodoAll />
            </div>
          </template>
          <!-- =========>> End Template <<========= -->
          <template #tab-2>
            <div flex="~ col">
              <TodoArchived />
            </div>
          </template>
        </UiTabGroup>
      </div>
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
import { useTodoStore } from "../composables/useTodoStore";
import { useBreakpointWindow } from "#imports";

const windowRef = ref(null);
const todoStore = useTodoStore();
const { size, towXs, xs, sm, md, lg, xl, twoXl } =
  useBreakpointWindow(windowRef);

todoStore.fetchTasks();

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});
</script>
