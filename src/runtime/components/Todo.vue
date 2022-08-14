<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      <div flex="~ col grow gap-2" w="full">
        <UiTabGroup
          p="x-20px"
          text="21px"
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
              <TodoSearch />
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

const todoStore = useTodoStore();
todoStore.fetchTasks();

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});
</script>

<style>
#markHover {
  opacity: 0;
}
#todoDiv:hover #markHover {
  opacity: 1;
}
</style>
