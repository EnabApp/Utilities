<template>
  <div flex="~ col gap-6px">
    <div flex="~ gap-9px" items="center">
      <input cursor="pointer" type="checkbox" text="primaryOp dark:secondary"  w="12px" v-model="todo.is_complete" />
      <input font="bold" w="full" text="primaryop dark:primary" v-model="todo.task" />
    </div>
    <div flex="~ gap-9px" items="center">
      <div relative="~">
        <div
          w="12px"
          h="12px"
          z="10"
          text="primaryOp dark:secondary"
          class="i-material-symbols-date-range"
        ></div>
        <input
          v-model="todo.inserted_at"
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
      <span font="thin" text="primaryOp dark:secondary xs">{{ moment(todo.inserted_at).calendar() }}</span>
    </div>
  </div>
</template>

<script setup>
import { useMoment } from '#imports' 

const props = defineProps({
  todo: Object,
});

const moment = useMoment()


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
