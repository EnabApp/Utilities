<template>
  <div flex="~ col gap-6px">
    <div flex="~ gap-9px" items="center">
      <input cursor="pointer" type="checkbox" w="12px" v-model="todo.done" />
      <input
        font="bold"
        w="full"
        text="white"
        v-model="todo.title"
      />
    </div>
    <div flex="~ gap-9px" items="center">
      <div position="relative">
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
          type="date"
          position="absolute"
          top="0"
          right="0"
          h="full"
          w="full"
        />
      </div>
      <span font="thin" text="xs">{{ todo.date }}</span>
    </div>
  </div>
</template>

<script setup>
import moment from "moment/min/moment-with-locales";
import ar from "moment/locale/ar-sa";

moment.updateLocale("ar", ar);
// moment().format("MM/Do , h:mm a"),

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
