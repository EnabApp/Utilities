<template>
  <!-- Application -->
  <Transition>
    <UiDesktopWindow  v-if="app.running" v-show="!app.minimized" :app="app">
      <UiInput m="4" v-model="task"/>
      <h1 text="w-100">
        {{task}}
      </h1>
      <!-- <UiButton title="Hello" @click="getApp.toggleRunning()" /> -->
    </UiDesktopWindow>
  </Transition>
</template>

<script setup>
let task = ref(null)
// const show = () =>{
//   if(task.value != null){
//     console.log(task.value)
//     return true
// }
// }
const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});
watch(task, (val) => {
  localStorage.setItem('task', val)
})
onMounted(() => {
  task.value = localStorage.getItem('task') || ''
})
const getApp = props.app.getSubApp(1);
</script>
