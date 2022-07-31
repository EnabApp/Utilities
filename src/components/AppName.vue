<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      Hello
      <UiButton title="Hello" @click="getApp.toggleRunning()" />
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const getApp = props.app.getSubApp(1);
</script>
