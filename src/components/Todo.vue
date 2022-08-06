<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      <div flex="~ col grow gap-2" w="full">
        <UiTabGroup p="x-20px" :col="false" :tabs="['جميع المهام', 'المؤرشفة']">
          <template #tab-1>
            <TodoAll />
          </template>

          <template #tab-2>
            <TodoArchive />
          </template>
        </UiTabGroup>
      </div>
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const getApp = props.app.getSubApp(1);
</script>
