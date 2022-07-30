<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow v-if="app.running" v-show="!app.minimized" :app="app">
      Hello
      <UiInput v-model="s"/>
      <h1 text="w-100">
        {{s}}
      </h1>
      <!-- <UiButton title="Hello" @click="getApp.toggleRunning()" /> -->
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
let s = ref('')

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});
watch(s, (val) => {
  localStorage.setItem('s', val)
})
onMounted(() => {
  s.value = localStorage.getItem('s') || ''
})
const getApp = props.app.getSubApp(1);
</script>
