<template>
  <div flex="~ col gap-6px">
    <div flex="~ gap-9px" items="center">
      <input @change="changeCheckBox(todo)" v-model="todoStore.is_complete" cursor="pointer" type="checkbox"
        text="primaryOp dark:secondary" w="12px" />
      <input @change="changeTask(todo)" v-model="todo.task" font="bold" w="full" text="primaryop dark:primary" />
    </div>
    <div flex="~ gap-9px" items="center">
      <div relative="~">
        <div w="12px" h="12px" z="10" text="primaryOp dark:secondary" class="i-material-symbols-date-range"></div>
        <input @change="changeDate(todo)" v-model="todo.inserted_at" opacity="0" z="20" type="datetime-local"
          absolute="~" top="0" right="0" h="full" w="full" />
      </div>
      <span font="thin" text="primaryOp dark:secondary xs">{{
          moment(todo.inserted_at).calendar()
      }}</span>
    </div>
    <!-- ===========>> Remove Button Content <<=========== -->
    <UiButton id="markHover" duration="250" w="70px" title="حذف" color="error" :loading="false" @click="todoStore.deleteTask()" />
  </div>
</template>

<script setup>
import { useSupabaseClient, useMoment } from "#imports";
import { useTodoStore } from "../../composables/useTodoStore";

const todoStore = useTodoStore();
const moment = useMoment();
const supabase = useSupabaseClient();

const props = defineProps({
  task: Object,
});

//=========>>Update Task Function<<=========

const changeTask = async () => {
  await todoStore.changeTask();
};

//=========>>Update complete Function<<=========

const changeCheckBox = async () => {
  await todoStore.changeCheckBox();
};

//=========>>Update inserted Function<<=========

const changeDate = async () => {
  await todoStore.changeDate();
};

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
