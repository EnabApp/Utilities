<template>
  <div flex="~ col gap-6px">
    <div flex="~ gap-9px" items="center">
      <input cursor="pointer" type="checkbox" w="12px" v-model="todo.done" />
      <input font="bold" w="full" text="white" v-model="todo.title" />
    </div>
    <div flex="~ gap-9px" items="center">
      <div relative="~">
        <div
          w="12px"
          h="12px"
          z="10"
          text="white"
          class="i-material-symbols-date-range"
        ></div>
        <input
          v-model="todo.date"
          opacity="0"
          z="20"
          type="datetime-local"
          absolute="~"
          top="0"
          right="0"
          h="full"
          w="full"
        />
      </div>
      <span font="thin" text="xs">{{ moment(todo.date).calendar() }}</span>
    </div>
  </div>
</template>

<script setup>
import moment from "moment/min/moment-with-locales";
import ar from "moment/locale/ar-sa";

moment.updateLocale("ar", ar);
// ,

const props = defineProps({
  todo: Object,
});
</script>

<style scoped>
input::-webkit-calendar-picker-indicator {
  cursor: pointer;
}
input:not([type="radio"]):not([type="checkbox"]) {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  cursor: initial;
}
</style>
